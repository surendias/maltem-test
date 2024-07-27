import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

const AddEditCafeForm = ({ cafe, handleSubmit, handleCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [logo, setLogo] = useState("");

  useEffect(() => {
    if (cafe) {
      setName(cafe.name);
      setDescription(cafe.description);
      setLocation(cafe.location);
      setLogo(cafe.logo);
    }
  }, [cafe]);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ name, description, location, logo });
    setName("");
    setDescription("");
    setLocation("");
    setLogo("");
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 5 }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {cafe ? "Edit Cafe" : "Add New Cafe"}
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
          {cafe ? "Update Cafe" : "Add Cafe"}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddEditCafeForm;
