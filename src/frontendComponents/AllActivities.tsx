// Abbreviation explanations:
// "ls" = local storage, "SL" = Search List

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../componentStyles/ActivityListTheme";
import { Container, Button, Typography, TextField } from "@mui/material";
import SingularActivity from "./SingularActivity";
import { useDispatch, useSelector } from "react-redux";
import {
  forceUpdateActivities,
  filterActivityList,
  searchSelect,
  searchSelectVisible,
} from "../redux/actions";
import { RootState, AppDispatch, SATypes } from "../customTypes";

export default function AllActivities(): React.ReactElement {
  const activities = useSelector<RootState, SATypes[]>(
    (state) => state.activitiesReducer.activities
  );
  const userSearch = useSelector<RootState, string>(
    (state) => state.activitiesReducer.userSearch
  );
  const searchInput = useSelector<RootState, string>(
    (state) => state.activitiesReducer.searchInput
  );
  const searchSelectVisibleStatus = useSelector<RootState, boolean>(
    (state) => state.activitiesReducer.searchSelectVisibleStatus
  );

  const dispatch: AppDispatch = useDispatch();

  const handleSearchSelectVisible = () => {
    dispatch(searchSelectVisible(searchSelectVisibleStatus));
  };

  const handleSearchSelect = (Search: string) => {
    dispatch(searchSelect(Search));
  };
  const handleForceUpdate = () => {
    dispatch(forceUpdateActivities());
  };

  const handleFilterActivityList = () => {
    dispatch(filterActivityList(searchInput));
  };

  // searchSelectColor() highlights the color of the selected search criteria.
  const searchSelectColor = (searchColor: string) => {
    if (searchInput === searchColor) {
      return "rgba(255, 222, 113, 1)";
    } else {
      return "rgba(203, 224, 199, 1)";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Button variant="contained" onClick={handleForceUpdate}>
          Force Latest Update
        </Button>
        <Typography variant="h2" textAlign="center">
          All Activities
        </Typography>

        <div id="filterArea">
          <div className="dropdownSL">
            <Button
              variant="contained"
              sx={{ marginTop: "0" }}
              onClick={handleSearchSelectVisible}
            >
              Search by
            </Button>
            <Container
              className="dropdownContentSL"
              sx={
                searchSelectVisibleStatus
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <Button
                variant="contained"
                onClick={() => handleSearchSelect("Name")}
                style={{
                  backgroundColor: searchSelectColor("name"),
                }}
              >
                Name
              </Button>

              <Button
                variant="contained"
                onClick={() => handleSearchSelect("Type")}
                style={{
                  backgroundColor: searchSelectColor("type"),
                }}
              >
                Type
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSearchSelect("Description")}
                style={{
                  backgroundColor: searchSelectColor("description"),
                }}
              >
                Description
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSearchSelect("City")}
                style={{
                  backgroundColor: searchSelectColor("city"),
                }}
              >
                City
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSearchSelect("Municipality")}
                style={{
                  backgroundColor: searchSelectColor("municipality"),
                }}
              >
                Municipality
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSearchSelect("County")}
                style={{
                  backgroundColor: searchSelectColor("county"),
                }}
              >
                County
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSearchSelect("Opening-Hours")}
                style={{
                  backgroundColor: searchSelectColor("opening-hours"),
                }}
              >
                Opening-Hours
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSearchSelect("Closing-Hours")}
                style={{
                  backgroundColor: searchSelectColor("closing-hours"),
                }}
              >
                Closing-Hours
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSearchSelect("Country")}
                style={{
                  backgroundColor: searchSelectColor("country"),
                }}
              >
                Country
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSearchSelect("Subregion")}
                style={{
                  backgroundColor: searchSelectColor("subregion"),
                }}
              >
                Subregion
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSearchSelect("Region")}
                style={{
                  backgroundColor: searchSelectColor("region"),
                }}
              >
                Region
              </Button>
            </Container>
          </div>

          <TextField
            id="filterInput"
            label={userSearch}
            type="search"
            variant="standard"
            onChange={handleFilterActivityList}
          />
        </div>

        {activities.map((activity: SATypes) => [
          <SingularActivity
            key={"SinAct" + activity.id}
            id={activity.id}
            name={activity.name}
            type={activity.type}
            description={activity.description}
            distance={activity.distance}
            price={activity.price}
            city={activity.city}
            municipality={activity.municipality}
            county={activity.county}
            open_hours={activity.open_hours}
            closing_hours={activity.closing_hours}
            website_link={activity.website_link}
            phone={activity.phone}
            country={activity.country}
            subregion={activity.subregion}
            region={activity.region}
            geolocation={activity.geolocation}
          />,
        ])}
      </Container>
    </ThemeProvider>
  );
}
