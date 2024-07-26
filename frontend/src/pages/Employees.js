import React from "react";
import Layout from "../components/Layout";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import EmployeeList from "../components/EmployeeList";

const Employees = () => {
  return (
    <Layout>
      <Link to="/add-edit-employee">
        <Button>Add New Employee</Button>
      </Link>
      <EmployeeList />
    </Layout>
  );
};

export default Employees;
