import api from "./api";

const getEmployees = async (cafe = "") => {
  try {
    console.log({ cafe });
    const response = await api.get(`/employees?cafe=${cafe}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createEmployee = async (employeeData) => {
  try {
    const response = await api.post("/employees", employeeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateEmployee = async (id, employeeData) => {
  try {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteEmployee = async (id) => {
  try {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getEmployees, createEmployee, updateEmployee, deleteEmployee };
