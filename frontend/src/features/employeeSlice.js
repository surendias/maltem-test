import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";
// Async thunk to fetch employees
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async (cafe) => {
    // console.log({ cafe });
    const response = await getEmployees(cafe);
    return response;
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employeeData) => {
    const response = await createEmployee(employeeData);
    return response;
  }
);

export const updateEmployeeValues = createAsyncThunk(
  "employees/updateEmployee",
  async (employeeData) => {
    const response = await updateEmployee(employeeData);
    console.log("Update Reponse", response);
    return response;
  }
);

export const deleteEmployeeObject = createAsyncThunk(
  "employees/deleteEmployee",
  async (id) => {
    await deleteEmployee(id);
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployeeValues.fulfilled, (state, action) => {
        const index = state.employees.findIndex(
          (employee) => employee.id === action.payload.id
        );
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(deleteEmployeeObject.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload
        );
      });
  },
});

export default employeeSlice.reducer;
