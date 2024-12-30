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

const enrollInClass = async (classId: number) => {
    const response = await apiClient.post(`/class/${classId}/enroll`);
    return response.data;
};

async function runApiTest() {
  try {
    const enroll = await enrollInClass(1)
  } catch (error: any) {
    {
      console.error('\n❌ Error during API testing:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
    }
  }
}

console.log("RUN API TEST")
console.log("==============")
runApiTest();