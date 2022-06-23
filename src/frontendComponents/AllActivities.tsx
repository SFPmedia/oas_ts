// Abbreviation explanations:
// "ls" = local storage, "SL" = Search List

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../componentStyles/ActivityListTheme";
import {
  Container,
  Button,
  Typography,
  TextField,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import SingularActivity from "./SingularActivity";
import { useDispatch, useSelector } from "react-redux";
import { filterActivityList, getCurrentLocation } from "../redux/actions";
import { RootState, AppDispatch, SATypes, PositionType } from "../customTypes";
import {
  getFilterActivityList,
  getForceUpdateActivitiesData,
  getSearchInput,
  getSearchVisibilityStatus,
  getUserSearch,
} from "../redux/actionTypes";

export let userSearchFilter: string = "Name";

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
  const searchSelectVisibleStatus = useSelector<RootState, Boolean>(
    (state) => state.activitiesReducer.searchSelectVisibleStatus
  );
  const positionAccuracy = useSelector<RootState, number | null>(
    (state) => state.activitiesReducer.positionAccuracy
  );

  const dispatch: AppDispatch = useDispatch();

  const handleGetCurrentLocation = (position: PositionType) => {
    getCurrentLocation(position);
    //return dispatch(getFilterActivityList());
  };

  // Run the action to get an intial value on the variable "filteredActivityListNU", with which the function
  // filterActivityList can work with.
  navigator.geolocation.getCurrentPosition(handleGetCurrentLocation);

  const handleSearchSelectVisible = (): void => {
    dispatch(getSearchVisibilityStatus());
  };

  const handleSearchSelect = (Search: string) => {
    userSearchFilter = Search;
    dispatch(getUserSearch());
    dispatch(getSearchInput());
    dispatch(getSearchVisibilityStatus());
  };
  const handleForceUpdate = () => {
    dispatch(getForceUpdateActivitiesData());
  };

  const handleFilterActivityList = () => {
    filterActivityList(searchInput);
  };

  const handleFilterActivityListClick = () => {
    filterActivityList(searchInput);
    dispatch(getFilterActivityList());
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
        <div className="activityListTop">
          <Button variant="contained" onClick={handleForceUpdate}>
            Force Latest Update
          </Button>

          <Tooltip title={"User accuracy: " + positionAccuracy + "km"}>
            <InfoIcon />
          </Tooltip>
        </div>
        <Typography variant="h2" textAlign="center">
          Outdoor Activities
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
          <div className="filterAreaNU">
            <TextField
              id="filterInputNU"
              label={"Search near you"}
              type="number"
              variant="standard"
              defaultValue={50}
              required
              onChange={() =>
                navigator.geolocation.getCurrentPosition(
                  handleGetCurrentLocation
                )
              }
            />
            <Typography variant="body2" color="initial">
              km
            </Typography>
          </div>
          <Button
            className="filterListButton"
            variant="contained"
            onClick={() => handleFilterActivityListClick()}
          >
            Filter List
          </Button>
        </div>

        {activities.length > 0 ? (
          activities.map((activity: SATypes) => [
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
