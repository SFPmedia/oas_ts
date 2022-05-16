import { store } from "./index";

// Used in CookieConsent.tsx, AllActivities.tsx, AllActivitiesNU.tsx
export type RootState = ReturnType<typeof store.getState>;

// Used in CookieConsent.tsx, AllActivities.tsx, AllActivitiesNU.tsx
export type AppDispatch = typeof store.dispatch;

// Used in SingularActivity.jsx, actions.ts
export interface SATypes {
  id: number;
  name: string;
  type: string;
  description: string;
  distance: number;
  price: number;
  city: string;
  municipality: string;
  county: string;
  open_hours: string;
  closing_hours: string;
  website_link: string;
  phone: number;
  country: string;
  subregion: string;
  region: string;
  geolocation: string;
  latitude?: number;
  longitude?: number;
}

export interface PositionType {
  coords: GeolocationCoordinates;
}

export interface initialStateTypes {
  activities: SATypes[];
  activitiesNU: SATypes[];
  userSearch: string;
  searchInput: string;
  searchSelectVisibleStatus: boolean;
  positionAccuracy: number | null;
  cookieConsentChoiceMade: null;
}
