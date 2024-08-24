import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { districts } from "./../../config/data";

const SignUp = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "1",
  });

  const handleInputChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUpSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/v1/auth/signUp", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      });
      const data = await response.json()
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="given-name"
            autoFocus
            onChange={(e) => handleInputChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            onChange={(e) => handleInputChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={(e) => handleInputChange(e)}
          />
          {/* <TextField
            margin="normal"
            required
            fullWidth
            id="district"
            name="district"
            select
            label="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            {districts?.map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
          </TextField> */}
          {/* <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Telephone number"
            name="phoneNumber"
            autoComplete="tel"
          /> */}
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">User Role</FormLabel>
            <RadioGroup
              row
              value={userData.role}
              name="role"
              onChange={(e) => handleInputChange(e)}
            >
              <FormControlLabel value="1" control={<Radio />} label="Farmer" />
              <FormControlLabel value="2" control={<Radio />} label="Vendor" />
            </RadioGroup>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => handleInputChange(e)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "red" }}
            onClick={handleSignUpSubmit}
          >
            SIGN UP
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
