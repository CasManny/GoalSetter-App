const router = require("express").Router();
const authenticateUser = require("../middlewares/authMiddleware");
const { getAllGoals, createGoal, getSingleGoal, deleteGoal, updateGoal } = require("../controllers/goalControllers");

router.route("/").get(authenticateUser, getAllGoals).post(authenticateUser, createGoal)

router.route('/:id').get(authenticateUser, getSingleGoal).delete(authenticateUser, deleteGoal).patch(authenticateUser, updateGoal)


module.exports = router
// /api/goals/ - get all goals
// /api/goals/:id - get single goals
// /api/goals - post create single goal
// /api/goals/:id  - delete single goal
// /api/goals/:id - updates single goals
