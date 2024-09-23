"use client"

import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

interface RecommendationsState {
  job: string[];
  role: string[];
  apiCalled: boolean;
  fetchDataFromAPI: (skills: string[], education: string[]) => Promise<void>;
}

// Initialize context with undefined and then assert the correct type.
const RecommendationsContext = createContext<RecommendationsState | undefined>(undefined);

interface RecommendationsProviderProps {
  children: ReactNode;
}

export const RecommendationsProvider: FC<RecommendationsProviderProps> = ({ children }) => {
    const [job, setJob] = useState<string[]>([]);
    const [role, setRole] = useState<string[]>([]);
    const [apiCalled, setApiCalled] = useState<boolean>(false);

    const fetchDataFromAPI = async (skills: string[], education: string[]) => {
        try {
            const response = await fetch("http://127.0.0.1:5000/recommend_jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_skills: skills,
                    user_qualifications: education,
                }),
            });

            if (!response.ok) {
                throw new Error("API call failed");
            }

            const data = await response.json();

            setJob(data.job_recommended || []);
            setRole(data.role_recommended || []);
            setApiCalled(true); // Update the state to indicate the API was called successfully
        } catch (error) {
            console.error("Error:", error instanceof Error ? error.message : "An unknown error occurred");
        }
    };

    return (
        <RecommendationsContext.Provider value={{ job, role, apiCalled, fetchDataFromAPI }}>
            {children}
        </RecommendationsContext.Provider>
    );
};

export const useRecommendations = (): RecommendationsState => {
  const context = useContext(RecommendationsContext);
  if (context === undefined) {
    throw new Error('useRecommendations must be used within a RecommendationsProvider');
  }
  return context;
};