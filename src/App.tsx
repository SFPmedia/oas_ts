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
import { accuracySuccess, accuracySuccessResult } from "./redux/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./customTypes";
import { getActivitiesData, getPositionAccuracy } from "./redux/reducer";

function App(): React.ReactElement {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(accuracySuccess);
    dispatch(getActivitiesData());
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

    setTimeout(accuracyUpdater, 1000);
  }, []);

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
