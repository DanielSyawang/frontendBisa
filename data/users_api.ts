import axios = require('axios');
import * as dotenv from 'dotenv';

dotenv.config();
interface UserSignUpRequest {
    email: string;
    username: string;
    password: string;
    role: 'teacher';
}

interface AccessToken {
    accessToken: string;
}

interface UserLoginRequest {
    email: string;
    password: string;
    role: string;
}

interface UserUpdateRequest {
    id: number;
    data: {
        email: string;
        password: string;
        role: string;
    };
    accessToken: string;
}

// API Client Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:9876';
const API_KEY = process.env.ACCESS_TOKEN;

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add auth token when needed
apiClient.interceptors.request.use((config) => {
    const newConfig = { ...config };
    newConfig.headers = newConfig.headers || {};
    
    // Only add Authorization header if API_KEY exists or if it's provided in the request
    const token = newConfig.headers.Authorization || API_KEY;
    if (token) {
        newConfig.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }
    return newConfig;
});

// API Functions
export const signUp = async (data: UserSignUpRequest) => {
    try {
        const response = await apiClient.post<LoginResponse>('/users/signup', data);
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
};

export const login = async (data: UserLoginRequest): Promise<LoginResponse> => {
    try {
        const response = await apiClient.post<LoginResponse>('/users/login', data);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const refreshToken = async (data: { token: string }): Promise<LoginResponse> => {
    try {
        const response = await apiClient.post<LoginResponse>('/users/refresh', data, {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during token refresh:', error);
        throw error;
    }
};

export const getUserById = async (id: number, tokens: LoginResponse) => {
    try {
        const response = await apiClient.get(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

export const updateUser = async (req: UserUpdateRequest) => {
    try {
        const response = await apiClient.put(`/users/${req.id}`, req.data, {
            headers: {
                Authorization: `Bearer ${req.accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (id: number, tokens: LoginResponse) => {
    try {
        const response = await apiClient.delete(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`
            }
        });
        return response.status;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runApiTests() {
  try {
    console.log('Starting API test flow...\n');

    console.log('1. Testing Sign Up...');
    const signUpData = {
      email: `test${Date.now()}@example.com`,
      username: `testuser${Date.now()}`,
      password: 'Password123!',
      role: 'teacher' as const
    };
    
    const newUser = await signUp(signUpData);
    console.log('✓ Sign Up successful:', newUser);
    await sleep(1000);

    console.log('\n2. Testing Login...');
    const loginData = {
      email: signUpData.email,
      password: signUpData.password,
      role: signUpData.role
    };
    
    const loginResponse = await login(loginData);
    console.log('✓ Login successful:', loginResponse);
    await sleep(1000);

    // 3. Refresh Token
    // console.log('\n3. Testing Token Refresh...');
    // const refreshResponse = await refreshToken({ token: loginResponse.refreshToken });
    // console.log('✓ Token refresh successful:', refreshResponse);
    // await sleep(1000);

    // TODO: fix get user
    console.log('\n4. Testing Get User...');
    const userDetails = await getUserById(1, loginResponse);
    console.log('✓ Get user successful:', userDetails);
    await sleep(1000);

    console.log('\n5. Testing Update User...');
    const updateData = {
      id: 1,
      data: {
        email: `updated${Date.now()}@example.com`,
        password: 'NewPassword123!',
        role: 'teacher'
      },
      accessToken: loginResponse.accessToken
    };
    
    const updatedUser = await updateUser(updateData);
    console.log('✓ Update user successful:', updatedUser);
    await sleep(1000);

    console.log('\n6. Testing Delete User...');
    const deleteResponse = await deleteUser(1, loginResponse);
    console.log('✓ Delete user successful, status:', deleteResponse);

    console.log('\nAll tests completed successfully! ✨');

  } catch (error: any) {
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

console.log('API Test Runner');
console.log('==============');
runApiTests();