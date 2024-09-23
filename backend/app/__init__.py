from flask import Flask
from pymongo import MongoClient
import urllib.parse

from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

# Load configuration settings
app.config.from_pyfile('../config.py')

# Initialize MongoDB client and database
uri = app.config['MONGODB_URI']
parsed_uri = urllib.parse.urlparse(uri)
username = None
password = None
if parsed_uri.username and parsed_uri.password:
    username = urllib.parse.quote_plus(parsed_uri.username)
    password = urllib.parse.quote_plus(parsed_uri.password)
    uri = uri.replace(f"{parsed_uri.username}:{parsed_uri.password}@",
                      f"{username}:{password}@")
client = MongoClient(uri)

db = client[app.config['MONGODB_DB']]
users_collection = db['users']

# Import routes after initializing app
from app import routes
