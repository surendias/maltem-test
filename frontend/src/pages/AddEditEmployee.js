/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  fetchEmployees,
  updateEmployeeValues,
} from "../features/employeeSlice";
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
import Layout from "../components/Layout";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

const AddEditEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const cafe = searchParams.get("cafe");
  console.log("cafe on update screen", cafe);

  const employee = useSelector((state) =>
    id ? state.employees.employees.find((c) => c.id === id) : null
  );

  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [startDate, setStartDate] = useState("");
  const [cafeId, setCafeId] = useState(cafe ? cafe : "");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    if (employee) {
      console.log("Employee is presetnt");
      setName(employee.name);
      setEmailAddress(employee.emailAddress);
      setPhoneNumber(employee.phoneNumber);
      setGender(employee.gender);
      setStartDate(employee.startDate);
      setCafeId(employee.cafeId);
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

  const handleSubmit = (e) => {
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

    if (id) {
      dispatch(
        updateEmployeeValues({
          id,
          name,
          emailAddress,
          phoneNumber,
          gender,
          startDate,
        })
      )
        .then(() => dispatch(fetchEmployees(cafe)))
        .then(() => {
          console.log({ test111: cafe });
          navigate(`/employees?cafe=${cafe}`);
        });
    } else {
      dispatch(
        addEmployee({
          name,
          emailAddress,
          phoneNumber,
          gender,
          startDate,
          cafeId,
        })
      )
        .then(() => dispatch(fetchEmployees(cafe)))
        .then(() => navigate(`/employees?cafe=${cafe}`));
    }

    setName("");
    setEmailAddress("");
    setPhoneNumber("");
    setGender("");
    setStartDate("");
  };

  const handleGenderSelection = (event) => {
    setGender(event.target.value);
  };

  const handleCancel = () => {
    navigate(`/employees?cafe=${cafe}`);
  };

  return (
    <Layout>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 5 }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          {id ? "Edit Employee" : "Add New Employee"}
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
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={gender}
            onChange={handleGenderSelection}
          >
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>

        <DatePicker
          defaultValue={dayjs(startDate ? startDate : Date.now())}
          onChange={setStartDate}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            {id ? "Update Employee" : "Add Employee"}
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default AddEditEmployee;
