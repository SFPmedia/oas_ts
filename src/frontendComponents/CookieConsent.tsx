import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../componentStyles/CookieConsentTheme";
import { Container, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../customTypes";
import { getCookieConsentStatus } from "../redux/reducer";

export default function CookieConsent(): JSX.Element {
  const cookieStatusWatcher = useSelector<RootState, boolean>(
    (state) => state.activitiesReducer.cookieConsentChoiceMade!
  );
  const dispatch: AppDispatch = useDispatch();

  const handleCookieConsent = (status: string) => {
    if (status === "true") {
      localStorage.setItem("CookieConsentStatus", "true");
    } else {
      localStorage.clear();
      sessionStorage.clear();
      window.history.go(-1);
    }
    dispatch(getCookieConsentStatus());
  };

  const handleCookieConsentDisplay = (): boolean | null => {
    const cookieConsentCurrentStatus: string = localStorage.getItem(
      "CookieConsentStatus"
    )!;
    if (cookieConsentCurrentStatus === "true") {
      return true;
    } else if (cookieStatusWatcher === true || cookieStatusWatcher === false) {
      return true;
    } else {
      return null;
    }
  };

  useEffect(() => {
    handleCookieConsentDisplay();
  }, [cookieStatusWatcher]);

  return (
    <ThemeProvider theme={theme}>
      {handleCookieConsentDisplay() ? (
        <Container sx={{ display: "none" }}></Container>
      ) : (
        <Container>
          <Typography variant="h5" textAlign="center">
            Cookie Consent
          </Typography>
          <Typography variant="body2" textAlign="center">
            Cookies are essential for the use of this website
            <br />
            They will not be used by any third parties
          </Typography>
          <Container className="consentButtons">
            <Button
              variant="contained"
              onClick={() => handleCookieConsent("false")}
            >
              I DO NOT CONSENT
              <br />
              TAKE ME BACK
            </Button>
            <Button
              variant="contained"
              onClick={() => handleCookieConsent("true")}
            >
              I CONSENT
              <br /> I WILL STAY
            </Button>
          </Container>
        </Container>
      )}
    </ThemeProvider>
  );
}
