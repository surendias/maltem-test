import React from "react";
import Layout from "../components/Layout";
import CafeList from "../components/CafeList";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Cafes = () => {
  return (
    <Layout>
      <Link to="/add-edit-cafe">
        <Button>Add New Cafe</Button>
      </Link>
      <CafeList />
    </Layout>
  );
};

export default Cafes;
