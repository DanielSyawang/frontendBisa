import axios from 'axios'

const API_BASE_URL = 'http://localhost:9876';

interface UserSignUpRequest {
    email: string;
    username: string;
    password: string;
    role: 'teacher';
}

interface AccessToken {
    accessToken: string
}

interface UserLoginRequest {
    email: string;
    password: string;
    role: string;
}

interface UserUpdateRequest {
    id: number,
    data: {
        email: string;
        password: string;
        role: string;
    },
    accessToken: string
}

export const signUp = async (data: UserSignUpRequest) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/signup`, data);
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

// Login API
export const login = async (data: UserLoginRequest) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, data);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Refresh Token API
export const refreshToken = async (data: {token: string;}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/refresh`, data, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during token refresh:', error);
    throw error;
  }
};

// Get User by ID API
export const getUserById = async (id: number, accessToken: AccessToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Update User API
export const updateUser = async (req: UserUpdateRequest) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${req.id}`, req.data, {
      headers: {
        Authorization: `Bearer ${req.accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete User API
export const deleteUser = async (id: number, accessToken: AccessToken) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken.accessToken}`,
      },
    });
    return response.status;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
