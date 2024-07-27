import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCafe, fetchCafes, updateCafeValues } from "../features/cafeSlice";
import { TextField, Button, Typography, Box } from "@mui/material";
import Layout from "../components/Layout";
import { useNavigate, useSearchParams } from "react-router-dom";

const AddEditCafe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log({ id });

  const cafe = useSelector((state) =>
    id ? state.cafes.cafes.find((c) => c.id === id) : null
  );

  console.log({ cafe });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [logo, setLogo] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchCafes());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (cafe) {
      setName(cafe.name);
      setDescription(cafe.description);
      setLocation(cafe.location);
      setLogo(cafe.logo);
    }
  }, [cafe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ location });
    if (id) {
      dispatch(
        updateCafeValues({ id, name, description, location, logo })
      ).then(() => navigate("/cafes"));
    } else {
      dispatch(addCafe({ name, description, location, logo })).then(() =>
        navigate("/cafes")
      );
    }
    setName("");
    setDescription("");
    setLocation("");
    setLogo("");
  };

  const handleCancel = () => {
    navigate(`/cafes`);
  };

  return (
    <Layout>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 5 }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          {id ? "Edit Cafe" : "Add New Cafe"}
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <TextField
          label="Logo URL"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            {id ? "Update Cafe" : "Add Cafe"}
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default AddEditCafe;
