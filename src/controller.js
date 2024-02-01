import { User, Goal, Preferences } from "../models/model.js";
import { Op } from "sequelize";

// GOAL ENDPOINTS
export const goalCtrl = {
  getAllGoals: async (req, res) => {
    const { category, sort, complete } = req.query;
    const { user } = req.session;
    // console.log("api user " + user.username);
    const sortDirection =
      sort == "priority" || sort == "created_at" ? "DESC" : "ASC";
    const allGoals = await Goal.findAll({
      where: { complete: complete }, //, userId: user.user_id
      order: [[sort, sortDirection]],
    });
    res.status(200).send(allGoals);
  },
  getGoal: async (req, res) => {
    const { id } = req.params;
    const goal = await Goal.findByPk(id); // const { user } = req.session !!!!!!!!!!!!!!!!
    res.status(200).send(goal);
  },
  getSelectedGoals: async (req, res) => {
    const { category, sort, complete } = req.query;
    const sortDirection =
      sort == "priority" || sort == "created_at" ? "DESC" : "ASC";
    const selectedGoals = await Goal.findAll({
      where: { category: category, complete: complete }, // const { user } = req.session !!!!!!!!!!!!!!!!
      order: [[sort, sortDirection]],
    });
    res.status(200).send(selectedGoals);
  },
  addGoal: async (req, res) => {
    // const { user_id } = req.session;
    const uId = 1; // FIX THIS so the currently logged in user id is used!!!!!!!!!!!!!!!!!!!!!!!!!!
    const {
      title,
      description,
      category,
      percent,
      time_est,
      due_date,
      complete,
      complete_date,
      priority,
    } = req.body;
    const user = await User.findByPk(uId);
    const goal = await user.createGoal({
      title: title,
      description: description,
      category: category,
      percent: percent,
      time_est: time_est,
      due_date: due_date,
      complete: complete,
      complete_date: complete_date,
      priority: priority,
    });
    res.status(200).send(goal);
  },
  updateGoalData: async (req, res) => {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      percent,
      time_est,
      due_date,
      complete,
      complete_date,
      priority,
    } = req.body;
    Goal.update(
      {
        title: title,
        description: description,
        category: category,
        percent: percent,
        time_est: time_est,
        due_date: due_date,
        complete: complete,
        complete_date: complete_date,
        priority: priority,
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
  getOrCreateUser: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOrCreate({
      where: { username: username },
      defaults: { password: password },
    });
    res.status(200).send(user);
  },
};

// PREFERENCES ENDPOINTS
export const prefCtrl = {
  getPrefs: async (req, res) => {
    const { id } = req.params; // const { user } = req.session !!!!!!!!!!!!!!!!
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
  checkSessionUser: async (req, res) => {
    const { user } = req.session;
    console.log("in checkSession endpoint " + req.session);
    res.send(user ? user : false);
  },
  getAuthData: async (req, res) => {
    const { username, password } = req.body;
    console.log("Server side user: " + username + " pass: " + password);
    const user = await User.findOne({
      where: { username: username, password: password },
    });

    if (!user) {
      return res.status(403);
    }
    req.session.user = { username: username, user_id: user.user_id }; // !!!!!!! Probably add uId to session as well
    console.log("getAuthData " + req.session.user);
    res.status(200).send(user);
  },
  addAuthData: async (req, res) => {},
  updateAuthData: async (req, res) => {},
  deleteAuthData: async (req, res) => {
    if (!req.session.user) {
      res.status(401);
    } else {
      req.session.destroy;
      res.send(200);
    }
  },
};
