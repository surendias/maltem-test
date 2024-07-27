/* eslint-disable no-restricted-globals */
import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCafeObject, fetchCafes } from "../features/cafeSlice";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Button, ButtonGroup, TextField } from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";
import DeleteIcon from "@mui/icons-material/Delete";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const CafeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cafes = useSelector((state) => state.cafes.cafes);
  const cafeStatus = useSelector((state) => state.cafes.status);
  const error = useSelector((state) => state.cafes.error);
  const [location, setLocation] = useState("");

  // Debounced fetch function
  const debouncedFetchCafes = useCallback(
    debounce((loc) => dispatch(fetchCafes(loc)), 300),
    []
  );

  useEffect(() => {
    debouncedFetchCafes(location);
  }, [location, debouncedFetchCafes]);

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
                navigate(`/add-edit-cafe?id=${value}`);
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
                  dispatch(deleteCafeObject(value));
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

  const viewEmployeesButtonRenderer = ({ value }) => (
    <span
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
      }}
    >
      {value && (
        <Button
          size="small"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/employees?cafe=${value}`);
          }}
        >
          <PeopleIcon />
        </Button>
      )}
    </span>
  );

  const columnDefs = [
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    {
      headerName: "Employees",
      field: "id",
      cellRenderer: viewEmployeesButtonRenderer,
    },
    { headerName: "Location", field: "location" },
    {
      field: "logo",
      cellRenderer: CompanyLogoRenderer,
    },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: ActionButtonRenderer,
    },
  ];

  useEffect(() => {
    if (cafeStatus === "idle") {
      dispatch(fetchCafes(location));
    }
  }, [cafeStatus, dispatch, location]);

  if (cafeStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (cafeStatus === "failed") {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Cafes</h1>

      <TextField
        id="standard-basic"
        label="Filter By Location"
        variant="standard"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        sx={{ mb: 5 }}
      />

      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact rowData={cafes} columnDefs={columnDefs} />
      </div>
    </div>
  );
};

export default CafeList;
