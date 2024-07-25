import React from "react";
import Layout from "../components/Layout";
import CafeList from "../components/CafeList";
import { Button } from "@mui/material";

const Cafes = () => {
  return (
    <Layout>
      <Button>Add New Cafe</Button>
      <CafeList />
    </Layout>
  );
};

export default Cafes;
