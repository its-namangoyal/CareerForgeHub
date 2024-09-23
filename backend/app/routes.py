import jwt
import datetime
from flask import jsonify, request, current_app
from app import app, users_collection

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

CSV_FILE_PATH = '/Users/dhruvi/Desktop/ADT/CareerForgeHub/backend/job_descriptions.csv'

def generate_token(emailId):
    try:
        # Expiration time for the token (for example, 24 hours)
        exp_time = datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        # Generate the token
        token = jwt.encode({'emailId': emailId, 'exp': exp_time}, current_app.config['SECRET_KEY'], algorithm="HS256")
        return token
    except Exception as e:
        return e

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('emailId')
    password = data.get('password')

    print("here found")

    if users_collection.find_one({'emailId': username}):
        return jsonify({'error': 'Username already exists'}), 400

    new_user = {'emailId': username, 'password': password}
    users_collection.insert_one(new_user)

    token = generate_token(username)
    return jsonify({'message': 'User created successfully', 'token': token}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('emailId')
    password = data.get('password')

    user = users_collection.find_one({'emailId': username, 'password': password})
    if user:
        token = generate_token(username)
        return jsonify({'message': 'Login successful', 'token': token}), 200

    return jsonify({'error': 'Invalid emailId or password'}), 401

# Function to categorize qualifications
def map_to_category(qualification_text, qualification_hierarchy):
    for level, keywords in qualification_hierarchy.items():
        if any(keyword in qualification_text.lower() for keyword in keywords):
            return level
    return 'other'

# Preprocessing function for text data
def preprocess_text(text):
    return text.str.lower().str.replace('[^a-zA-Z0-9 ]', '', regex=True)

@app.route('/recommend_jobs', methods=['POST'])
def recommend_jobs():
    data = request.json
    user_skills = data['user_skills']
    user_qualifications = data['user_qualifications']

    # Load job descriptions
    df = pd.read_csv(CSV_FILE_PATH, nrows=10000)

    # Define a simple qualification hierarchy
    qualification_hierarchy = {
        'phd': ['phd'],
        'master': ['master', 'mtech', 'mba', 'ms'],
        'bachelor': ['bachelor', 'btech', 'bba', 'bsc', 'ba', 'undergraduate'],
    }

    # Clean and preprocess your data
    df['skills'] = preprocess_text(df['skills'])
    df['Qualifications'] = preprocess_text(df['Qualifications'])
    df['Job Description'] = preprocess_text(df['Job Description'])

    # Map job qualifications to their categories
    df['Qualification Level'] = df['Qualifications'].apply(lambda x: map_to_category(x, qualification_hierarchy))

    # Determine the user's qualification level
    user_qualification_level = map_to_category(user_qualifications, qualification_hierarchy)

    # Decide which qualification levels to include based on the user's level
    levels_to_include = ['bachelor']
    if user_qualification_level == 'master':
        levels_to_include.append('master')
    elif user_qualification_level == 'phd':
        levels_to_include.extend(['master', 'phd'])

    # Filter the DataFrame based on the decided qualification levels
    qualified_jobs = df[df['Qualification Level'].isin(levels_to_include)]

    # Combine user skills and qualifications for matching
    user_profile = user_skills.lower().replace('[^a-zA-Z0-9 ]', '') + " " + user_qualification_level

    # Convert 'skills' Series to DataFrame and append 'user_profile'
    skills_df = qualified_jobs['skills'].to_frame()
    user_profile_df = pd.DataFrame([user_profile], columns=['skills'])
    skills_df = pd.concat([skills_df, user_profile_df], ignore_index=True)

    # Vectorize the skills data including the user profile
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(skills_df['skills'])

    # Calculate cosine similarity
    cosine_sim = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])

    # Get top 5 job indices with highest similarity scores
    top_5_job_indices = cosine_sim.argsort()[0][-5:][::-1]

    # Fetch top 5 matching jobs
    job_recommended = qualified_jobs.iloc[top_5_job_indices]

    # Convert job_recommended to include company details
    job_recommended_json = job_recommended[['Job Title', 'Company', 'skills', 'Qualifications', 'Job Description', 'Role', 'Work Type', 'location', 'Country']].to_dict('records')

    # Extract the job titles for role_recommended and ensure they are unique
    role_recommended = job_recommended['Job Title'].unique().tolist()

    # Prepare the final response
    response = {
        'job_recommended': job_recommended_json,
        'role_recommended': role_recommended
    }

    # Return the response as a JSON
    return jsonify(response), 201

@app.route('/unique_skills', methods=['GET'])
def unique_skills():
    # Load job descriptions, specifically the 'skills' column
    df = pd.read_csv(CSV_FILE_PATH, usecols=['skills'])

    # Preprocess the skills data to ensure consistency
    # Assuming skills are separated by commas, split and strip each skill
    all_skills = df['skills'].dropna().str.lower().str.split(',').explode()

    # Remove any leading/trailing whitespace
    all_skills = all_skills.str.strip()

    # Get unique skills and sort them
    unique_skills = all_skills.unique()
    unique_skills.sort()

    # Return the unique skills as a JSON response
    return jsonify(unique_skills.tolist()), 201