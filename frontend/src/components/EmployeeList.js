import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from "../features/employeeSlice";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button, ButtonGroup } from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const EmployeeList = ({ cafeid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employees = useSelector((state) => state.employees.employees);
  const employeeStatus = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);

  const CompanyLogoRenderer = ({ value }) => (
    <span
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
      }}
    >
      {value && (
        <img
          alt={`${value} Flag`}
          src={`${value}`}
          style={{
            display: "block",
            width: "25px",
            height: "auto",
            maxHeight: "50%",
            marginRight: "12px",
            filter: "brightness(1.1)",
          }}
        />
      )}
    </span>
  );

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
                navigate(`/add-edit-employee?id=${value}`);
              }}
            >
              <ModeIcon />
            </Button>
            <Button
              size="small"
              onClick={(e) => {
                e.preventDefault();
                alert(value);
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
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    { headerName: "Employees", field: "employees" },
    { headerName: "Location", field: "location" },
    {
      field: "logo",
      // Add component to column via cellRenderer
      cellRenderer: CompanyLogoRenderer,
    },
    {
      headerName: "Actions",
      field: "id",
      // Add component to column via cellRenderer
      cellRenderer: ActionButtonRenderer,
    },
  ];

  useEffect(() => {
    if (employeeStatus === "idle") {
      dispatch(fetchEmployees(cafeid));
    }
  }, [employeeStatus, dispatch, cafeid]);

  if (employeeStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (employeeStatus === "failed") {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Cafes</h1>
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
