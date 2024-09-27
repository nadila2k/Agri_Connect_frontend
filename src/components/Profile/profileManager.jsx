import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import apiHelper from "./../../features/apiHelper.js";
import { useSelector } from "react-redux";
import { selectUser } from "./../../features/slices/authSlice.js";

// Modal styles
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// Districts list
export const districts = [
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Colombo",
  "Galle",
  "Gampaha",
  "Hambantota",
  "Jaffna",
  "Kalutara",
  "Kandy",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matale",
  "Matara",
  "Monaragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya",
];

const ProfileManager = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    district: "",
    phoneNumber: "",
  });
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const [errors, setErrors] = useState({});

  const user = useSelector(selectUser);
  const id = user.id;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await apiHelper("get", { url: `/auth/${id}` });
        setProfileData(response.data || {});
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setAlert({
          open: true,
          message: "Failed to fetch profile data.",
          severity: "error",
        });
      }
    };
    fetchProfileData();
  }, [id]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profileData.firstName) newErrors.firstName = "First name is required.";
    if (!profileData.lastName) newErrors.lastName = "Last name is required.";
    if (!profileData.email) newErrors.email = "Email is required.";
    if (!profileData.district) newErrors.district = "District is required.";
    if (!profileData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d+$/.test(profileData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be digits only.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Prevent submission if validation fails

    try {
      const response = await apiHelper("put", {
        url: `/auth/${id}`,
        data: profileData,
      });

      if (response.success) {
        setAlert({
          open: true,
          message: "Profile updated successfully!",
          severity: "success",
        });
        handleClose();
      } else {
        setAlert({
          open: true,
          message: response.message || "Failed to update profile.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setAlert({ open: true, message: "Error updating profile.", severity: "error" });
    }
  };

  const handleClose = () => setOpen(false);
  const handleCloseAlert = () => setAlert({ ...alert, open: false });

  return (
    <div>
      <h1>Profile Manager</h1>
      {/* Display Profile Information */}
      <div>
        <h2>Profile Information</h2>
        <p>First Name: {profileData.firstName}</p>
        <p>Last Name: {profileData.lastName}</p>
        <p>Email: {profileData.email}</p>
        <p>District: {profileData.district}</p>
        <p>Phone Number: {profileData.phoneNumber}</p>

        {/* Button to open profile edit modal */}
        <Button variant="contained" onClick={() => setOpen(true)}>
          Edit Profile
        </Button>
      </div>

      {/* Snackbar for notifications */}
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>

      {/* Modal for editing profile */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={profileData.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={Boolean(errors.firstName)}
              helperText={errors.firstName}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={profileData.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
            <TextField
              label="Email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <FormControl fullWidth margin="normal" error={Boolean(errors.district)}>
              <InputLabel>District</InputLabel>
              <Select
                name="district"
                value={profileData.district || ""}
                onChange={handleChange}
                required
              >
                {districts.map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </Select>
              {errors.district && <span style={{ color: 'red' }}>{errors.district}</span>}
            </FormControl>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={profileData.phoneNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save Changes
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileManager;

