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

const uploadMaterial = async (classId: number, file: File, request: { title: string; description: string }) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('request', JSON.stringify(request));

    const response = await apiClient.post(`/class/${classId}/material/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

const getMaterialsByClassId = async (classId: number) => {
    const response = await apiClient.get(`/materials/class/${classId}`);
    return response.data;
};

const getMaterialById = async (materialId: number) => {
    const response = await apiClient.get(`/materials/${materialId}`);
    return response.data;
};

const deleteMaterial = async (materialId: number) => {
    const response = await apiClient.delete(`/materials/${materialId}`);
    return response.data;
};

const updateMaterial = async (materialId: number, updatedData: { title: string; description: string }) => {
    const response = await apiClient.put(`/materials/${materialId}`, updatedData);
    return response.data;
};