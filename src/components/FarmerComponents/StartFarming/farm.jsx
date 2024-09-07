import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import apiHelper from '../../../features/apiHelper.js';

// Material UI modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const FarmManager = () => {
  const [open, setOpen] = useState(false);
  const [years, setYears] = useState([]);  // Initialize as an empty array
  const [crops, setCrops] = useState([]);  // Initialize as an empty array
  const [months, setMonths] = useState([]);  // Initialize as an empty array
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [landSize, setLandSize] = useState('');
  const [harvestMonth, setHarvestMonth] = useState('');
  const [errors, setErrors] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const yearsData = await apiHelper('get', { url: '/years' });
        const monthsData = await apiHelper('get', { url: '/month' });

        setYears(yearsData || []);  // Ensure default empty array if undefined
        setMonths(monthsData || []);  // Ensure default empty array if undefined
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch crops data based on selected year
    const fetchCrops = async () => {
      if (selectedYear) {
        try {
          const cropsData = await apiHelper('get', { url: `/cropsStatistic/cropsByYear/${selectedYear}` });
          setCrops(cropsData || []);
        } catch (error) {
          console.error('Error fetching crops:', error);
        }
      } else {
        setCrops([]);
      }
    };

    fetchCrops();
  }, [selectedYear]);

  const validateForm = () => {
    let tempErrors = {};

    if (!selectedYear) tempErrors.selectedYear = "Year is required";
    if (!selectedCrop) tempErrors.selectedCrop = "Crop is required";
    if (!landSize || isNaN(landSize)) tempErrors.landSize = "Valid land size is required";
    if (!harvestMonth) tempErrors.harvestMonth = "Harvest month is required";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Submit form data to the API
        const response = await apiHelper('post', {
          url: '/startFarming',
          body: { year: selectedYear, crop: selectedCrop, landSize, harvestMonth },
        });

        console.log('Form submitted successfully:', response);
        handleClose();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div>
      <h1>Farm Manager</h1>
      <p>Here you can manage your Farming process</p>
      <Button variant="contained" onClick={handleOpen}>Start Farming</Button>

      {/* Modal for the form */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <h2>Start Farming</h2>

          <form onSubmit={handleSubmit}>
            {/* Select Year */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Year</InputLabel>
              <Select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                error={!!errors.selectedYear}
              >
                {years.length > 0 ? (
                  years.map((year) => (
                    <MenuItem key={year.id} value={year.id}>
                      {year.year}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No years available</MenuItem>
                )}
              </Select>
              {errors.selectedYear && <p className="error">{errors.selectedYear}</p>}
            </FormControl>

            {/* Select Crop */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Crop</InputLabel>
              <Select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                error={!!errors.selectedCrop}
              >
                {crops.length > 0 ? (
                  crops.map((crop) => (
                    <MenuItem key={crop.id} value={crop.id}>
                      {crop.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No crops available</MenuItem>
                )}
              </Select>
              {errors.selectedCrop && <p className="error">{errors.selectedCrop}</p>}
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Select Harvest Month</InputLabel>
              <Select
                value={harvestMonth}
                onChange={(e) => setHarvestMonth(e.target.value)}
                error={!!errors.harvestMonth}
              >
                {months.length > 0 ? (
                  months.map((month) => (
                    <MenuItem key={month.id} value={month.id}>
                      {month.month}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No months available</MenuItem>
                )}
              </Select>
              {errors.harvestMonth && <p className="error">{errors.harvestMonth}</p>}
            </FormControl>

            {/* Land Size */}
            <TextField
  label="Land Size (in acres)"
  fullWidth
  margin="normal"
  type="text"  // Normal text input
  value={landSize}
  onChange={(e) => setLandSize(e.target.value)}
  error={!!errors.landSize}
  helperText={errors.landSize}
  // No additional InputProps needed
/>


            {/* Select Harvest Month */}
            

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Start Farming
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default FarmManager;


