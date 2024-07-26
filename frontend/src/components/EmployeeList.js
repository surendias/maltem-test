/* eslint-disable no-restricted-globals */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteEmployeeObject,
  fetchEmployees,
} from "../features/employeeSlice";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button, ButtonGroup } from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const EmployeeList = ({ cafe }) => {
  console.log({ cafe });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employees.employees);
  console.log({ employees });
  const employeeStatus = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);

  const ActionButtonRenderer = ({ value }) => (
    <span
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
      }}
    >
      {value && (
        <>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button
              size="small"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/add-edit-employee?id=${value}&cafe=${cafe}`);
              }}
            >
              <ModeIcon />
            </Button>
            <Button
              size="small"
              onClick={(e) => {
                e.preventDefault();

                if (
                  confirm("Are you sure you want to delete this record?") ===
                  true
                ) {
                  dispatch(deleteEmployeeObject(value));
                } else {
                  return false;
                }
              }}
            >
              <DeleteIcon />
            </Button>
          </ButtonGroup>
        </>
      )}
    </span>
  );

  const columnDefs = [
    { headerName: "Employee Id", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "emailAddress" },
    { headerName: "Phone Number", field: "phoneNumber" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Days Worked", field: "daysWorked" },
    { headerName: "Cafe", field: "cafe" },
    {
      headerName: "Actions",
      field: "id",
      // Add component to column via cellRenderer
      cellRenderer: ActionButtonRenderer,
    },
  ];

  useEffect(() => {
    if (employeeStatus === "idle") {
      dispatch(fetchEmployees(cafe));
    }
  }, [employeeStatus, dispatch, cafe]);

  if (employeeStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (employeeStatus === "failed") {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Employees</h1>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact rowData={employees} columnDefs={columnDefs} />
      </div>
    </div>
  );
};

export default EmployeeList;
