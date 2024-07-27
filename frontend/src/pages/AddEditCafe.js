import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCafe, fetchCafes, updateCafeValues } from "../features/cafeSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import AddEditCafeForm from "../components/AddEditCafeForm";

const AddEditCafe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const cafe = useSelector((state) =>
    id ? state.cafes.cafes.find((c) => c.id === id) : null
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCafes());
    }
  }, [dispatch, id]);

  const handleSubmit = (formValues) => {
    if (id) {
      dispatch(updateCafeValues({ id, ...formValues })).then(() =>
        navigate("/cafes")
      );
    } else {
      dispatch(addCafe(formValues)).then(() => navigate("/cafes"));
    }
  };

  const handleCancel = () => {
    navigate("/cafes");
  };

  return (
    <Layout>
      <AddEditCafeForm
        cafe={cafe}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Layout>
  );
};

export default AddEditCafe;
