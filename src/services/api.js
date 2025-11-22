import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function generateStory(images, genre, characters) {
  const formData = new FormData();

  // Append all images to form data
  images.forEach((image) => {
    formData.append("files", image.file);
  });

  formData.append("genre", genre);
  formData.append("characters", characters);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/generate-story`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.story;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(error.response?.data?.detail || "Failed to generate story");
  }
}
