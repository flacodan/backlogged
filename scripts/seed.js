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
    const dueDate = new Date(Date.parse(goal.releaseDate));
    const { title, description, category, completed } = goal;

    const newGoal = Goal.create({
      userID: 0, //usersInDB[0].userID,
      title,
      description,
      category,
      completed,
      dueDate,
    });

    return newGoal;
  })
);

await db.close();
console.log("Finished seeding database!");
