import { User, Goal, Preferences } from "../models/model.js";
import { Op } from "sequelize";

// GOAL ENDPOINTS
export const goalCtrl = {
  getAllGoals: async (req, res) => {
    const allGoals = await Goal.findAll();
    res.status(200).json(allGoals);
  },
  getGoal: async (req, res) => {
    const { id } = req.params;
    const goal = await Goal.findByPk(id);
    res.status(200).json(goal);
  },
  getSelectedGoals: async (req, res) => {
    const { category, sort, complete } = req.body;
    const selectedGoals = await Goal.findAll({
      where: { [Op.and]: [{ category: category }, { completed: complete }] },
      order: ["title", "DESC"],
    });
    res.status(200).json(selectedGoals);
  },
  addGoal: async (req, res) => {
    // const { id } = req.session;
    const id = 1; // FIX THIS!!!
    const { title, description, category, completed } = req.body;
    const user = await User.findByPk(id);
    const goal = await user.createGoal({
      title: title,
      description: description,
      category: category,
      completed: completed,
    });
    res.status(200).json(goal);
  },
  updateGoalData: async (req, res) => {
    const { id } = req.params;
    const { title, description, category, completed } = req.body;
    const goal = await Goal.findByPk(id);
    goal.set({
      title: title,
      description: description,
      category: category,
      completed: completed,
    });
    await goal.save();
    res.sendStatus(200);
  },
  deleteGoal: async (req, res) => {
    const { id } = req.params;
    const goal = await Goal.findByPk(id);
    await goal.destroy();
    res.sendStatus(200);
  },
};

// USER ENDPOINTS
export const userCtrl = {
  getUser: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.status(200).json(user);
  },
  //getUserByUsername: async (req, res) => {},
  addUser: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.create({
      username: username,
      password: password,
    });
    await user.createPreference();
    res.status(200).json(user);
  },
  updateUserData: async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    const user = await User.findByPk(id);
    user.set({
      username: username,
      password: password,
    });
    await user.save();
    res.sendStatus(200);
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    await user.destroy();
    res.sendStatus(200);
  },
};

// PREFERENCES ENDPOINTS
export const prefCtrl = {
  getPrefs: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const prefs = await user.getPreference();
    res.status(200).json(prefs);
  },
  updatePrefData: async (req, res) => {
    const { id } = req.params;
    const { language, theme, defaultSort } = req.body;
    const user = await User.findByPk(id);
    // user.addPreferences({
    //   language: language,
    //   theme: theme,
    //    defaultSort: defaultSort,
    // });
    // await user.save();
    res.sendStatus(200);
  },
};

// AUTH ENDPOINTS
export const authCtrl = {
  getAuthData: async (req, res) => {},
  addAuthData: async (req, res) => {},
  updateAuthData: async (req, res) => {},
  deleteAuthData: async (req, res) => {},
};
