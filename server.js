import express from "express";
import session from "express-session";
import ViteExpress from "vite-express";
import { authCtrl, userCtrl, goalCtrl, prefCtrl } from "./src/controller.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.REACT_APP_PORT ?? 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
ViteExpress.config({ printViteDevServerHost: true });
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    // rolling: true,
    cookie: {
      httpOnly: true,
      maxAge: +process.env.SESSION_MAX_AGE,
    },
  })
);

// !!!!!!! Delete this, just to test sessions !!!!!!!!!!!!!!!!!!!!!
// app.use((req, res, next) => {
//   console.log(req.session);
//   next();
// });

export const loginRequired = (req, res, next) => {
  console.log("server.loginRequired starting check...");
  const { user } = req.session;
  console.log("server.loginRequired Finished check.");
  if (!user) {
    res.status(401); //.send("Unauthorized");
  } else {
    next();
  }
};

const {
  getAllGoals,
  getGoal,
  getSelectedGoals,
  addGoal,
  updateGoalData,
  deleteGoal,
  countUserGoals,
} = goalCtrl;
// GOAL ENDPOINTS
app.get("/api/goals", loginRequired, getAllGoals);
app.get("/api/goal/:id", loginRequired, getGoal);
app.get("/api/goalSelect", loginRequired, getSelectedGoals);
app.post("/api/goal", loginRequired, addGoal);
app.put("/api/goal/:id", loginRequired, updateGoalData);
app.delete("/api/goal/:id", loginRequired, deleteGoal);
app.get("/api/countUserGoals", loginRequired, countUserGoals);

const { getUser, addUser, updateUserData, deleteUser, getOrCreateUser } =
  userCtrl;
// USER ENDPOINTS
app.get("/api/user/:id", getUser);
app.post("/api/user", addUser);
app.put("/api/user/:id", updateUserData);
app.delete("/api/user/:id", deleteUser);
app.post("/api/createUser", getOrCreateUser);

const { getPrefs, updatePrefData } = prefCtrl;
// PREFERENCE ENDPOINTS
app.get("/api/pref/:id", getPrefs);
app.put("/api/pref/:id", updatePrefData);

const {
  checkSessionUser,
  getAuthData,
  addAuthData,
  updateAuthData,
  deleteAuthData,
} = authCtrl;
// AUTHORIZATION ENDPOINTS
app.get("/api/checkSession", checkSessionUser);
app.post("/api/auth", getAuthData);
app.post("/api/createUser", addAuthData);
app.put("/api/user/:id", updateAuthData);
app.post("/api/logout", deleteAuthData);

ViteExpress.listen(app, port, () => {
  console.log(`Server is listening http://localhost:${port}`);
});
