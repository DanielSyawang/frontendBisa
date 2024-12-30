import axios = require('axios');
import * as dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL
const API_KEY = process.env.ACCESS_TOKEN 

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  }
});

export const createClass = async (request: { className: string; classDescription: string }) => {
  try {
    const response = await apiClient.post('/class', request);
    console.log('Class created:', response.data);
  } catch (error) {
    console.error('Error creating class:', error);
  }
};

export const getClassById = async (classID: number) => {
  try {
    const response = await apiClient.get(`/class/${classID}`);
    console.log('Class details:', response.data);
  } catch (error) {
    console.error(`Error fetching class with ID ${classID}:`, error);
  }
};

export const getClassesUserEnrolled = async () => {
  try {
    const response = await apiClient.get('/class/enrolled');
    console.log('Enrolled classes:', response.data);
  } catch (error) {
    console.error('Error fetching enrolled classes:', error);
  }
};

export const updateClass = async (classID: number, request: { className: string; classDescription: string }) => {
  try {
    const response = await apiClient.put(`/class/${classID}`, request);
    console.log('Class updated:', response.data);
  } catch (error) {
    console.error(`Error updating class with ID ${classID}:`, error);
  }
};

export const deleteClass = async (classID: number) => {
  try {
    const response = await apiClient.delete(`/class/${classID}`);
    console.log('Class deleted:', response.data);
  } catch (error) {
    console.error(`Error deleting class with ID ${classID}:`, error);
  }
};

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

const runApiTests = async () => {
  try {
    // Step 1: Create a new class
    const newClass = { className: 'Physics 101', classDescription: 'Basic physics concepts' };
    console.log('Creating class...');
    await createClass(newClass);

    // Step 2: Fetch the details of the newly created class (replace with valid classID)
    const classID = 1; // Update with the actual ID of the created class
    console.log(`Fetching details for class ID: ${classID}`);
    await getClassById(classID);

    // Step 3: Fetch all classes the user is enrolled in
    console.log('Fetching enrolled classes...');
    await getClassesUserEnrolled();

    // Step 4: Update the class details
    const updatedClass = { className: 'Advanced Physics', classDescription: 'In-depth physics concepts' };
    console.log(`Updating class ID: ${classID}`);
    await updateClass(classID, updatedClass);

    // Step 5: Enroll a student in the class (replace with valid studentID)
    const studentID = 123; // Update with actual student ID
    console.log(`Enrolling student ID: ${studentID} in class ID: ${classID}`);
    await enrollStudent(classID, { studentID });

    // Step 6: Remove the student from the class
    console.log(`Removing student ID: ${studentID} from class ID: ${classID}`);
    await removeStudent(classID, { studentID });

    // Step 7: Delete the class
    console.log(`Deleting class ID: ${classID}`);
    await deleteClass(classID);

    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Error during API testing:', error);
  }
};

// Run the tests
runApiTests();