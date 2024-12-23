// api.ts
const BASE_URL = "http://localhost:9876";

interface CreateClassRequest {
  className: string;
  classDescription: string;
}

interface UpdateClassRequest {
  className: string;
  classDescription: string;
}

interface EnrollRequest {
  studentID: number;
}

interface RemoveRequest {
  studentID: number;
}

// Create Class
export const createClass = async (request: CreateClassRequest) => {
  const response = await fetch(`${BASE_URL}/class`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_ACCESS_TOKEN", // Replace with actual token
    },
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    throw new Error("Failed to create class");
  }
  
  return response.json();
};

// Get Class By ID
export const getClassById = async (classID: number) => {
  const response = await fetch(`${BASE_URL}/class/${classID}`, {
    method: "GET",
    headers: {
      "Authorization": "Bearer YOUR_ACCESS_TOKEN", // Replace with actual token
    },
  });

  if (!response.ok) {
    throw new Error("Class not found");
  }

  return response.json();
};

// Get Classes User Enrolled
export const getClassesUserEnrolled = async () => {
  const response = await fetch(`${BASE_URL}/class/enrolled`, {
    method: "GET",
    headers: {
      "Authorization": "Bearer YOUR_ACCESS_TOKEN", // Replace with actual token
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch classes");
  }

  return response.json();
};

// Update Class
export const updateClass = async (classID: number, request: UpdateClassRequest) => {
  const response = await fetch(`${BASE_URL}/class/${classID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_ACCESS_TOKEN", // Replace with actual token
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to update class");
  }

  return response.json();
};

// Delete Class
export const deleteClass = async (classID: number) => {
  const response = await fetch(`${BASE_URL}/class/${classID}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer YOUR_ACCESS_TOKEN", // Replace with actual token
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete class");
  }

  return response.json();
};

// Enroll Student to Class
export const enrollStudent = async (classID: number, request: EnrollRequest) => {
  const response = await fetch(`${BASE_URL}/class/${classID}/enroll`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_ACCESS_TOKEN", // Replace with actual token
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to enroll student");
  }

  return response.json();
};

// Remove Student from Class
export const removeStudent = async (classID: number, request: RemoveRequest) => {
  const response = await fetch(`${BASE_URL}/class/${classID}/remove`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_ACCESS_TOKEN", // Replace with actual token
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to remove student");
  }

  return response.json();
};
