import { BarChart } from "@mui/x-charts/BarChart";
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import apiHelper from "./../../features/apiHelper";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useSelector } from "react-redux";
import { selectUser } from "./../../features/slices/authSlice.js";

const FarmerChart = () => {
  const [barNames, setBarNames] = useState([]);
  const [barValues, setBarValues] = useState([]);
  const [years, setYears] = useState([]); // Holds the list of years from the API
  const [selectedYear, setSelectedYear] = useState(null); // Store full year object (year.id and year.year)

  const user = useSelector(selectUser);
  const userId = user.id; // Get the user ID

  // Fetch years data on component mount
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await apiHelper("get", {
          url: "/years", // Fetch available years
        });
        console.log("Year response:", response); // Log to verify the structure
        setYears(response.data.years || response.data || []);
      } catch (error) {
        console.error("Error fetching years:", error);
      }
    };

    fetchYears();
  }, []);

  // Fetch chart data based on the selected year (using year.year) and userId
  useEffect(() => {
    const fetchData = async () => {
      let data = [];
      if (selectedYear?.year) {
        try {
          const farmerAnalyst = await apiHelper("get", {
            url: `/analyst/farmerChart?year=${selectedYear.year}&userId=${userId}`, // Use year.year and userId to fetch chart data
          });
          console.log("Analyst data:", farmerAnalyst); // Log the data for debugging
          data = farmerAnalyst?.data?.data;
          if (data) {
            const labelsArr = [];
            const valuesArr = [];
            data?.forEach((element) => {
              labelsArr.push(String(element.month));
              valuesArr.push(
                parseFloat(element.farmer_monthly_production / 12).toFixed(2)
              );
            });
            setBarNames(labelsArr);
            setBarValues(valuesArr);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [selectedYear, userId]); // Trigger when selectedYear changes

  const chartSetting = {
    yAxis: [
      {
        label: "Metric ton (T)",
      },
    ],
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-30px, 0)",
      },
    },
  };

  return (
    <Box m={2}>
      <Grid container spacing={2}>
        {/* Dropdown for selecting year */}
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Year</InputLabel>
            <Select
              value={selectedYear ? selectedYear.year : ""}
              onChange={(e) =>
                setSelectedYear(years.find((year) => year.year === e.target.value))
              } // Store the full year object
              label="Year"
            >
              {years.map((year) => (
                <MenuItem key={year.id} value={year.year}> {/* Use year.year as the value */}
                  {year.year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Bar chart display */}
        <Grid item xs={12}>
          <Typography variant="h3">Farmer</Typography>
          <BarChart
            xAxis={[{ scaleType: "band", data: barNames }]}
            series={[{ data: barValues }]}
            width={1000}
            height={300}
            margin={{ left: 100 }}
            {...chartSetting}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FarmerChart;
