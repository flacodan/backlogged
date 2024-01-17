import express from "express";
import ViteExpress from "vite-express";
import { authCtrl, userCtrl, goalCtrl, prefCtrl } from "./src/controller.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.REACT_APP_PORT ?? 3000;
const app = express();

app.use(express.json());
ViteExpress.config({ printViteDevServerHost: true });

const {
  getAllGoals,
  getGoal,
  getSelectedGoals,
  addGoal,
  updateGoalData,
  deleteGoal,
} = goalCtrl;

// GOAL ENDPOINTS
app.get("/api/goal", getAllGoals);
app.get("/api/goal/:id", getGoal);
app.get("/api/goalSelect", getSelectedGoals);
app.post("/api/goal", addGoal);
app.put("/api/goal/:id", updateGoalData);
app.delete("/api/goal/:id", deleteGoal);

const { getUser, addUser, updateUserData, deleteUser } = userCtrl;
// USER ENDPOINTS
app.get("/api/user/:id", getUser);
app.post("/api/user", addUser);
app.put("/api/user/:id", updateUserData);
app.delete("/api/user/:id", deleteUser);

const { getPrefs, updatePrefData } = prefCtrl;
// AUTH ENDPOINTS
app.get("/api/pref/:id", getPrefs);
app.put("/api/pref/:id", updatePrefData);

const { getAuthData, addAuthData, updateAuthData, deleteAuthData } = authCtrl;
// AUTH ENDPOINTS
app.get("/api/", getAuthData);
app.post("/api/user", addAuthData);
app.put("/api/user/:id", updateAuthData);
app.delete("/api/user/:id", deleteAuthData);

ViteExpress.listen(app, port, () => {
  console.log(`Server is listening http://localhost:${port}`);
});
