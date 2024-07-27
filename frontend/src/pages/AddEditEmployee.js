/* eslint-disable no-restricted-globals */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  fetchEmployees,
  updateEmployeeValues,
} from "../features/employeeSlice";
import Layout from "../components/Layout";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddEditEmployeeForm from "../components/AddEditEmployeeForm";

const AddEditEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const cafe = searchParams.get("cafe");

  const employee = useSelector((state) =>
    id ? state.employees.employees.find((e) => e.id === id) : null
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployees(cafe));
    }
  }, [dispatch, id, cafe]);

  const handleSubmit = (formValues) => {
    if (id) {
      dispatch(updateEmployeeValues({ id, ...formValues }))
        .then(() => dispatch(fetchEmployees(cafe)))
        .then(() => navigate(`/employees?cafe=${cafe}`));
    } else {
      dispatch(addEmployee({ ...formValues, cafeId: cafe }))
        .then(() => dispatch(fetchEmployees(cafe)))
        .then(() => navigate(`/employees?cafe=${cafe}`));
    }
  };

  const handleCancel = () => {
    navigate(`/employees?cafe=${cafe}`);
  };

  return (
    <Layout>
      <AddEditEmployeeForm
        employee={employee}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Layout>
  );
};

export default AddEditEmployee;
