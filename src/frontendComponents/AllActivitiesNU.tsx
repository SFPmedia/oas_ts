// Abbreviation explanations:
// "NU" = Near User, "ls" = local storage, "AL" = Activity List, "GM" = Google Maps

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../componentStyles/ActivityListTheme";
import { Typography, TextField, Tooltip } from "@mui/material";
import Container from "@mui/material/Container";
import SingularActivity from "./SingularActivity";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, SATypes } from "../customTypes";
import { getFilterActivityListNU } from "../redux/actionTypes";

export default function AllActivities(): React.ReactElement {
  const activitiesNU = useSelector<RootState, SATypes[]>(
    (state) => state.activitiesReducer.activitiesNU
  );
  const positionAccuracy = useSelector<RootState, number | null>(
    (state) => state.activitiesReducer.positionAccuracy
  );

  const dispatch: AppDispatch = useDispatch();

  const handleGetCurrentLocation = () => {
    return dispatch(getFilterActivityListNU());
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div className="activityListTop">
          <Tooltip title={"User accuracy: " + positionAccuracy + "km"}>
            <InfoIcon />
          </Tooltip>
        </div>
        <Typography variant="h2" color="initial" textAlign="center">
          Activities Near You
        </Typography>
        <div id="filterArea">
          <TextField
            id="filterInputNU"
            label={"Search near you"}
            type="number"
            variant="standard"
            onChange={() =>
              navigator.geolocation.getCurrentPosition(handleGetCurrentLocation)
            }
          />
          <Typography variant="body2" color="initial">
            km
          </Typography>
        </div>
        {activitiesNU.length > 0 ? (
          activitiesNU.map((activityNU: SATypes) => [
            <SingularActivity
              key={"SinActNU" + activityNU.id}
              id={activityNU.id}
              name={activityNU.name}
              type={activityNU.type}
              description={activityNU.description}
              distance={activityNU.distance}
              price={activityNU.price}
              city={activityNU.city}
              municipality={activityNU.municipality}
              county={activityNU.county}
              open_hours={activityNU.open_hours}
              closing_hours={activityNU.closing_hours}
              website_link={activityNU.website_link}
              phone={activityNU.phone}
              country={activityNU.country}
              subregion={activityNU.subregion}
              region={activityNU.region}
              geolocation={activityNU.geolocation}
            />,
          ])
        ) : (
          <Typography variant="body2" color="GrayText">
            Loading...
          </Typography>
        )}
      </Container>
    </ThemeProvider>
  );
}
