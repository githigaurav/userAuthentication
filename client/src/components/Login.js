import { Button, Stack, TextField, Typography, Alert } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { loginValidation } from "./inputValidation/validation";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { userIP } from "./userAPI";

function Login() {
  // redirect user to desire routes
  const navigate = useNavigate();
  // render component
  const [status, setStatus] = useState("Login");
  // received response
  const [response, setResponse] = useState(null);
  // toast status
  const [open, setOpen] = useState(false);
  // toast color
  const [toast, setToast] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: async function (values, { resetForm }) {
      const userCurrentIP = await userIP();
      setStatus("Load");
      axios.post("http://localhost:3001/user/login", values, {
          withCredentials: true,
          headers: { userCurrentIP: userCurrentIP },
        })
        .then((data) => {
          setToast("success");
          const response = data.data.message;
            if (response === "Login Successfully") {
              setTimeout(() => {
                setResponse(response);
                setOpen(true);
                setTimeout(() => {
                  setOpen(false);
                  setResponse("");
                  navigate("/dashboard");
                }, 1500);
              }, 1500);
              
            } else {
              console.log(data);
            }
            resetForm();
        })
        .catch((error) => {

          setToast("error");

          const response = error.response.data.message;

            if (response !== "" && response !== null && response !== undefined) {
              setResponse(response);
                setTimeout(() => {
                  setStatus("Login");
                  setOpen(true);
                    setTimeout(() => {
                      setOpen(false);
                      setResponse("");
                    }, 1500);
                }, 1500);
            }
          resetForm();
        });
    },
  });
  return (
    <>
      <Navbar />
      {status === "Login" ? (
        <Stack
          maxWidth={"md"}
          sx={{
            padding: 1,
            gap: 1,
            height: "100svh",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <TextField
            type="text"
            name="email"
            label="Email"
            placeholder="john@gmail.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <Alert severity="error" variant="text" sx={{ color: "#cc3300" }}>
              {formik.errors.email}
            </Alert>
          ) : null}

          <TextField
            type="password"
            name="password"
            label="password"
            placeholder="*******"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <Alert severity="error" variant="text" sx={{ color: "#cc3300" }}>
              {formik.errors.password}
            </Alert>
          ) : null}

          <Button variant="contained" onClick={formik.handleSubmit}>
            Login
          </Button>
          <Typography textAlign={"center"}>
            Don't have an account ? <Link to="/register">SignUp</Link>
          </Typography>
        </Stack>
      ) : status === "Load" ? (
        <Stack
          maxWidth={"md"}
          sx={{
            padding: 1,
            gap: 1,
            height: "100svh",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <CircularProgress />
        </Stack>
      ) : null}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={toast}>
          {response}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Login;
