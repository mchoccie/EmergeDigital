import LeaderHomePage from "LeaderHomePage";
import LeaderMyCoachPage from "LeaderMyCoachPage";
import LoginPage from "LoginPage";
import ForgotPage from "ForgotPage";
import SignupPage from "SignupPage";
import SettingsPage from "SettingsPage";
import NotFound from "404Page";
import CoachHomePage from "CoachHomePage";
import CoachSignup from "CoachSignUp";
import LeaderSchedulePage from "LeaderSchedulePage";
import CoachMyLeadersPage from "CoachMyLeadersPage";
import CoachFeedbackPage from "CoachFeedbackPage";
import Admin from "Admin";
import Home from "Home";

const userTypes = {
  COACH: "coach",
  LEADER: "leader",
  ADMIN: "admin",
  NONE: undefined,
};

const redirects = {
  coach: "/coach",
  leader: "/leader",
  admin: "/admin",
  undefined: "/login",
};

const routes = [
  {
    path: "/leader",
    component: LeaderHomePage,
    auth: [userTypes.LEADER],
  },
  {
    path: "/leader/mycoach",
    component: LeaderMyCoachPage,
    auth: [userTypes.LEADER],
  },
  {
    path: "/leader/schedule-sessions",
    component: LeaderSchedulePage,
    auth: [userTypes.LEADER],
  },
  {
    path: "/leader/methodology",
    component: NotFound,
    auth: [userTypes.LEADER],
  },
  {
    path: "/coach",
    component: CoachHomePage,
    auth: [userTypes.COACH],
  },
  {
    path: "/coach/myleaders",
    component: CoachMyLeadersPage,
    auth: [userTypes.COACH],
  },
  {
    path: "/coach/feedback",
    component: CoachFeedbackPage,
    auth: [userTypes.COACH],
  },
  {
    path: "/coach/resources",
    component: NotFound,
    auth: [userTypes.COACH],
  },
  {
    path: "/coach/community",
    component: NotFound,
    auth: [userTypes.COACH],
  },
  {
    path: "/admin",
    component: Admin,
    auth: [userTypes.ADMIN],
  },
  {
    path: "/settings",
    component: SettingsPage,
    auth: [userTypes.LEADER, userTypes.COACH],
  },
  {
    path: "/help",
    component: NotFound,
    auth: [userTypes.LEADER, userTypes.COACH, userTypes.ADMIN],
  },
  {
    path: "/login",
    component: LoginPage,
    auth: [userTypes.NONE],
  },
  {
    path: "/signup",
    component: SignupPage,
    auth: [userTypes.NONE],
  },
  {
    path: "/forgot",
    component: ForgotPage,
    auth: [userTypes.NONE],
  },
  {
    path: "/coachSignup",
    component: CoachSignup,
    auth: [userTypes.NONE],
  },
  {
    path: "/",
    component: Home,
    auth: [userTypes.NONE],
  },
  {
    path: "*",
    component: NotFound,
    auth: [userTypes.LEADER, userTypes.COACH, userTypes.ADMIN, userTypes.NONE],
  },
];

export { routes, redirects };
