const API_BASE_URL = "http://localhost:9876";

const apiRequest = async (endpoint, method = "GET", body = null, token = null, isMultipart = false) => {
    const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {};

    if (!isMultipart) {
        headers["Content-Type"] = "application/json";
    }

    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = isMultipart ? body : JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
    }

    return response.json();
};

const createClass = async (token, classData) => {
    return apiRequest("/classes", "POST", classData, token);
};

// Usage:
const newClass = {
    name: "Introduction to Programming",
    description: "A beginner-level programming class",
};

// TODO: INSERT TOKEN
createClass("your-auth-token", newClass)
    .then(data => console.log("Class Created:", data))
    .catch(err => console.error("Error:", err.message));

const addMaterial = async (token, classID, metadata, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("metadata", JSON.stringify(metadata));
    
    return apiRequest(`/classes/${classID}/materials`, "POST", formData, token, true);
};
    
    // Usage:
const materialMetadata = {
    title: "Introduction to Go",
    description: "A comprehensive guide to Go programming",
};
    
const file = document.querySelector("#fileInput").files[0]; // Replace with your file input element
    
addMaterial("your-auth-token", 123, materialMetadata, file)
    .then(data => console.log("Material Added:", data))
    .catch(err => console.error("Error:", err.message));