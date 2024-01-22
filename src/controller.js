import { User, Goal, Preferences } from "../models/model.js";
import { Op } from "sequelize";

// GOAL ENDPOINTS
export const goalCtrl = {
  getAllGoals: async (req, res) => {
    const { category, sort, complete } = req.query;
    const allGoals = await Goal.findAll({
      where: { completed: complete }, //complete needs to be T/F!!!!!!!!!!!!!!!!!!!!!
      // order: [],
    });
    res.status(200).send(allGoals);
  },
  getGoal: async (req, res) => {
    const { id } = req.params;
    const goal = await Goal.findByPk(id);
    res.status(200).send(goal);
  },
  getSelectedGoals: async (req, res) => {
    const { category, sort, complete } = req.query;
    console.log("getSelGoals sort: " + sort);
    const selectedGoals = await Goal.findAll({
      where: { category: category, completed: complete }, //complete needs to be T/F!!!!!!!!!!!!!!!!!!!!!
      order: [["title", "ASC"]], //order: sequelize.literal(`? DESC`),
      // { sort: sort }
      // createdAt:
    });
    res.status(200).send(selectedGoals);
  },
  // getSelectedGoals: async (req, res) => {
  //   const { category, sort, complete } = req.query;
  //   console.log("getSelGoals sort: " + sort);
  //   const selectedGoals = await Goal.findAll({
  //     where: { [Op.and]: [{ category: category }, { completed: complete }] }, //complete needs to be T/F!!!!!!!!!!!!!!!!!!!!!
  //     order: [["title", "ASC"]], //order: sequelize.literal(`? DESC`),
  //     // { sort: sort }
  //     // attributes: ["", ""],
  //   });
  //   res.status(200).send(selectedGoals);
  // },
  addGoal: async (req, res) => {
    // const { uId } = req.session;
    const uId = 1; // FIX THIS so the currently logged in user id is used!!!
    const { title, description, category, completed } = req.body;
    const user = await User.findByPk(uId);
    const goal = await user.createGoal({
      title: title,
      description: description,
      category: category,
      completed: completed,
    });
    res.status(200).send(goal);
  },
  updateGoalData: async (req, res) => {
    const { id } = req.params;
    const { title, description, category, completed } = req.body;
    Goal.update(
      {
        title: title,
        description: description,
        category: category,
        completed: completed,
      },
      { where: { goal_id: id } }
    );
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
    res.status(200).send(user);
  },
  addUser: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.create({
      username: username,
      password: password,
    });
    await user.createPreference();
    res.status(200).send(user);
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
  //getUserByUsername: async (req, res) => {},
};

// PREFERENCES ENDPOINTS
export const prefCtrl = {
  getPrefs: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const prefs = await user.getPreference();
    res.status(200).send(prefs);
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
