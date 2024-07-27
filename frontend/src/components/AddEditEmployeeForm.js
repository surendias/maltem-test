import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const AddEditEmployeeForm = ({ employee, handleSubmit, handleCancel }) => {
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [startDate, setStartDate] = useState("");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmailAddress(employee.emailAddress);
      setPhoneNumber(employee.phoneNumber);
      setGender(employee.gender);
      setStartDate(employee.startDate);
    }
  }, [employee]);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phonePattern = /^8\d{7}$/;
    return phonePattern.test(phone);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!validateEmail(emailAddress)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneError("Phone number must start with 8 and be 8 digits long");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (!isValid) return;

    handleSubmit({ name, emailAddress, phoneNumber, gender, startDate });
    setName("");
    setEmailAddress("");
    setPhoneNumber("");
    setGender("");
    setStartDate("");
  };

  const handleGenderSelection = (event) => {
    setGender(event.target.value);
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 5 }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {employee ? "Edit Employee" : "Add New Employee"}
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Email Address"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
        required
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        error={!!phoneError}
        helperText={phoneError}
      />
      <FormControl>
        <FormLabel id="gender-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="gender-radio-buttons-group-label"
          name="gender-radio-buttons-group"
          value={gender}
          onChange={handleGenderSelection}
        >
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>

      <DatePicker
        defaultValue={dayjs(startDate ? startDate : Date.now())}
        onChange={setStartDate}
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          {employee ? "Update Employee" : "Add Employee"}
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddEditEmployeeForm;
