import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./frontendComponents/Navigation";
import AboutPage from "./frontendComponents/AboutPage";
import AllActivities from "./frontendComponents/AllActivities";
import AllActivitiesNU from "./frontendComponents/AllActivitiesNU";
import FourOhFour from "./frontendComponents/FourOhFour";
import CookieConsent from "./frontendComponents/CookieConsent";
import { CssBaseline, Grid, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./componentStyles/ActivityListTheme";
import {
  accuracySuccess,
  accuracySuccessResult,
  fetchActivities,
} from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, SATypes } from "./customTypes";
import { getActivitiesData, getPositionAccuracy } from "./redux/actionTypes";

function App(): React.ReactElement {
  const dispatch: AppDispatch = useDispatch();
  const activities = useSelector<RootState, SATypes[]>(
    (state) => state.activitiesReducer.activities
  );
  const positionAccuracy = useSelector<RootState, number | null>(
    (state) => state.activitiesReducer.positionAccuracy
  );

  useEffect(() => {
    fetchActivities();

    if (!positionAccuracy) {
      navigator.geolocation.getCurrentPosition(accuracySuccess);

      function accuracyUpdater(): any {
        if (!accuracySuccessResult) {
          console.log("Trying to catch the position accuracy again");
        } else {
          yieldAccuracy();
        }
      }

      function yieldAccuracy(): any {
        dispatch(getPositionAccuracy());
      }

      setTimeout(accuracyUpdater, 500);
    } else {
      console.log("Position accuracy is ready");
    }

    if (activities.length < 1) {
      dispatch(getActivitiesData());
    } else {
      console.log("The activities are ready");
    }
  });

  return (
    <div className="App">
      <CssBaseline />
      <Navigation />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ThemeProvider theme={theme}>
                <Typography variant="h1" textAlign="center">
                  Outdoor Activities
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} md={10} lg={6} xl={5}>
                    <AllActivities />
                  </Grid>
                  <Grid item xs={12} md={10} lg={6} xl={5}>
                    <AllActivitiesNU />
                  </Grid>
                  <CookieConsent />
                </Grid>
              </ThemeProvider>
            }
          />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="*" element={<FourOhFour />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
