import api from "./api";

const getCafes = async (location = "") => {
  try {
    const response = await api.get(`/cafes?location=${location}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createCafe = async (cafeData) => {
  try {
    const response = await api.post("/cafes", cafeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateCafe = async (id, cafeData) => {
  try {
    console.log({ cafeData });
    const response = await api.put(`/cafes/${id}`, cafeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteCafe = async (id) => {
  try {
    const response = await api.delete(`/cafes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getCafes, createCafe, updateCafe, deleteCafe };
