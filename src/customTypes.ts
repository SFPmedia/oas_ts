import { store } from "./index";

// Used in CookieConsent.tsx, AllActivities.tsx, AllActivitiesNU.tsx
export type RootState = ReturnType<typeof store.getState>;

// Used in CookieConsent.tsx, AllActivities.tsx, AllActivitiesNU.tsx
export type AppDispatch = typeof store.dispatch;

// Used in SingularActivity.jsx
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
}
