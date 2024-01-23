import { User, Goal, Preferences, db } from "../models/model.js";
import sampleData from "../data/sampleData.json" assert { type: "json" };

console.log("Syncing database...");
await db.sync({ force: true });

console.log("Seeding database...");

const usersToCreate = [];
for (let i = 0; i < 10; i++) {
  const username = `user${i}@test.com`;
  usersToCreate.push(User.create({ username: username, password: "test" }));
}

const usersInDB = await Promise.all(usersToCreate);

const goalsInDB = await Promise.all(
  sampleData.map((goal) => {
    const dueDate = new Date(Date.parse(goal.dueDate));

    const {
      title,
      description,
      category,
      completed,
      user_id,
      percent,
      priority,
    } = goal;

    const newGoal = Goal.create({
      title,
      description,
      category,
      completed,
      dueDate,
      user_id, //usersInDB[0].userID,
      percent,
      priority,
    });

    return newGoal;
  })
);

await db.close();
console.log("Finished seeding database!");
