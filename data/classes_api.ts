import axios from 'axios';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get environment variables
const BASE_URL = process.env.BASE_URL
const API_KEY = process.env.ACCESS_TOKEN 

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  }
});

// Create a new class
export const createClass = async (request: { className: string; classDescription: string }) => {
  try {
    const response = await apiClient.post('/class', request);
    console.log('Class created:', response.data);
  } catch (error) {
    console.error('Error creating class:', error);
  }
};

// Get class by ID
export const getClassById = async (classID: number) => {
  try {
    const response = await apiClient.get(`/class/${classID}`);
    console.log('Class details:', response.data);
  } catch (error) {
    console.error(`Error fetching class with ID ${classID}:`, error);
  }
};

// Get classes user is enrolled in
export const getClassesUserEnrolled = async () => {
  try {
    const response = await apiClient.get('/class/enrolled');
    console.log('Enrolled classes:', response.data);
  } catch (error) {
    console.error('Error fetching enrolled classes:', error);
  }
};

// Update class by ID
export const updateClass = async (classID: number, request: { className: string; classDescription: string }) => {
  try {
    const response = await apiClient.put(`/class/${classID}`, request);
    console.log('Class updated:', response.data);
  } catch (error) {
    console.error(`Error updating class with ID ${classID}:`, error);
  }
};

// Delete class by ID
export const deleteClass = async (classID: number) => {
  try {
    const response = await apiClient.delete(`/class/${classID}`);
    console.log('Class deleted:', response.data);
  } catch (error) {
    console.error(`Error deleting class with ID ${classID}:`, error);
  }
};

// Enroll student in class
export const enrollStudent = async (classID: number, request: { studentID: number }) => {
  try {
    const response = await apiClient.post(`/class/${classID}/enroll`, request);
    console.log('Student enrolled:', response.data);
  } catch (error) {
    console.error(`Error enrolling student in class ${classID}:`, error);
  }
};

export const removeStudent = async (classID: number, request: { studentID: number }) => {
    try {
      const response = await apiClient.request({
        method: 'DELETE',
        url: `/class/${classID}/remove`,
        data: request,  
      });
      console.log('Student removed:', response.data);
    } catch (error) {
      console.error(`Error removing student from class ${classID}:`, error);
    }
}