import { DataTypes, Model } from "sequelize";
import connectToDB from "../db.js";
import dotenv from "dotenv";
import util from "util";

dotenv.config();
const dbURI = process.env.REACT_APP_DATABASE_URL ?? "postgresql:///backlogged";
console.log("db is: " + dbURI);

export const db = await connectToDB(dbURI);

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(60),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  {
    modelName: "user",
    sequelize: db,
    timestamps: false,
  }
);

export class Goal extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Goal.init(
  {
    // user_id as foreign key from User

    goal_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    category: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    percent: {
      type: DataTypes.INTEGER,
    },
    time_est: {
      type: DataTypes.INTEGER,
    },
    due_date: {
      type: DataTypes.DATE,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    complete_date: {
      type: DataTypes.DATE,
    },
    priority: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "goal",
    sequelize: db,
    updatedAt: false,
  }
);

export class Preferences extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Preferences.init(
  {
    // user_id as foreign key from User

    language: {
      type: DataTypes.STRING(30),
    },
    theme: {
      type: DataTypes.STRING(30),
    },
    default_sort: {
      type: DataTypes.STRING(30),
    },
  },
  {
    modelName: "preferences",
    sequelize: db,
    timestamps: false,
  }
);

//TABLE RELATIONSHIPS
User.hasMany(Goal, { foreignKey: "user_id" });
Goal.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(Preferences, { foreignKey: "user_id" });
Preferences.belongsTo(User, { foreignKey: "user_id" });
