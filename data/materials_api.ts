import axios = require('axios');
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import FormData = require('form-data');

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


interface MaterialResponse {
    id: number;
    title: string;
    description: string;
    fileUrl: string;
    createdAt: string;
    updatedAt: string;
    classId: number;
}

interface DeleteResponse {
    message: string;
    status: number;
}

async function testMaterialApi() {
    try {
        console.log('Starting Material API test flow...\n');

        const testClassId = 1; // Replace with a valid class ID
        let materialId: number;

        // 1. Test Upload Material
        console.log('1. Testing Material Upload...');
        const audioPath = "../asset/audio/Armed and Ready (feat. Casey Lee Williams).mp3";
        const fullPath = path.resolve(__dirname, audioPath);
        const fileBuffer = fs.readFileSync(fullPath);
        const fileName = path.basename(audioPath);
        
        // Create File object
        const file = new File(
            [fileBuffer], 
            fileName,
            { type: 'audio/mpeg', lastModified: Date.now() }
        );
        
        const uploadRequest = {
            title: `Armed and Ready Audio ${Date.now()}`,
            description: 'RWBY soundtrack audio material'
        };

        const uploadResponse = await uploadMaterial(
            testClassId, 
            file, 
            uploadRequest
        ) as MaterialResponse;
        
        materialId = uploadResponse.id;
        console.log('✓ Material upload successful:', uploadResponse);
        await sleep(1000);

        // 2. Test Get Materials by Class
        console.log('\n2. Testing Get Materials by Class...');
        const classMaterials = await getMaterialsByClassId(testClassId) as MaterialResponse[];
        console.log('✓ Get materials successful:', classMaterials);
        await sleep(1000);

        // 3. Test Get Material by ID
        console.log('\n3. Testing Get Material by ID...');
        const material = await getMaterialById(materialId) as MaterialResponse;
        console.log('✓ Get material successful:', material);
        await sleep(1000);

        // 4. Test Update Material
        console.log('\n4. Testing Update Material...');
        const updateData = {
            title: `Updated Armed and Ready Audio ${Date.now()}`,
            description: 'Updated RWBY soundtrack audio material'
        };
        
        const updatedMaterial = await updateMaterial(materialId, updateData) as MaterialResponse;
        console.log('✓ Update material successful:', updatedMaterial);
        await sleep(1000);

        // 5. Test Delete Material
        console.log('\n5. Testing Delete Material...');
        const deleteResponse = await deleteMaterial(materialId) as DeleteResponse;
        console.log('✓ Delete material successful:', deleteResponse);

        console.log('\nAll material API tests completed successfully! ✨');

    } catch (error: any) {
        console.error('\n❌ Error during Material API testing:', {
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

// Helper function for adding delays between requests
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Run the tests
testMaterialApi();