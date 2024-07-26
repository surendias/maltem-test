import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, updateEmployeeValues } from "../features/employeeSlice";
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

  const employee = useSelector((state) =>
    id ? state.employees.employees.find((c) => c.id === id) : null
  );

  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [startDate, setStartDate] = useState("");
  const [cafeId, setCafeId] = useState(cafe ? cafe : "");

  console.log({ cafeId });
  console.log({ startDate });

  useEffect(() => {
    if (employee) {
      console.log("Employee is presetnt");
      setName(employee.name);
      setEmailAddress(employee.email_address);
      setPhoneNumber(employee.phone_number);
      setGender(employee.gender);
      setStartDate(employee.start_date);
      setCafeId(employee.cafeId);
    }
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      ).then(() => navigate(`/employees?cafe=${cafeId}`));
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
      ).then(() => navigate(`/employees?cafe=${cafeId}`));
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
        />
        <TextField
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        {/* <TextField
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        /> */}
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

        {/* <DatePicker
          label="Days Worked"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        /> */}
        <DatePicker
          defaultValue={dayjs(startDate ? startDate : Date.now())}
          onChange={setStartDate}
        />
        <Button type="submit" variant="contained" color="primary">
          {id ? "Update Employee" : "Add Employee"}
        </Button>
      </Box>
    </Layout>
  );
};

export default AddEditEmployee;
