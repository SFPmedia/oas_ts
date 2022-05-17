import store from "./redux/store";

// Used in CookieConsent.tsx, AllActivities.tsx, AllActivitiesNU.tsx
export type RootState = ReturnType<typeof store.getState>;

// Used in CookieConsent.tsx, AllActivities.tsx, AllActivitiesNU.tsx
export type AppDispatch = typeof store.dispatch;

// Used in SingularActivity.tsx, actions.ts, AllActivities.tsx,  AllActivitiesNU.tsx, reducer.ts
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

// Used in AllActivitiesNU.tsx, actions.ts, App.tsx
export interface PositionType {
  coords: GeolocationCoordinates;
}

// Used in reducer.ts
export interface initialActivitiesStateTypes {
  activities: SATypes[];
  activitiesNU: SATypes[];
  userSearch: string;
  searchInput: string;
  searchSelectVisibleStatus: boolean;
  positionAccuracy: number | null;
  cookieConsentChoiceMade: null;
}
