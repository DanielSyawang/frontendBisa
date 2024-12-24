import axios from 'axios'

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

const enrollInClass = async (classId: number) => {
    const response = await apiClient.post(`/class/${classId}/enroll`);
    return response.data;
};
