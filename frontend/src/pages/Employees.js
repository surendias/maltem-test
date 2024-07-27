import React from "react";
import Layout from "../components/Layout";
import { Button } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import EmployeeList from "../components/EmployeeList";

const Employees = () => {
  const [searchParams] = useSearchParams();
  const cafe = searchParams.get("cafe");
  // console.log({ cafe });
  return (
    <Layout>
      <Link to={`/add-edit-employee?cafe=${cafe}`}>
        <Button variant="outlined">Add New Employee</Button>
      </Link>
      <EmployeeList cafe={cafe} />
    </Layout>
  );
};

export default Employees;
