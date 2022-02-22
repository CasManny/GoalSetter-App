const router = require("express").Router();
const authenticateUser = require("../middlewares/authMiddleware");
const { getAllGoals, createGoal, getSingleGoal, deleteGoal, updateGoal } = require("../controllers/goalControllers");

router.route("/").get(authenticateUser, getAllGoals).post(authenticateUser, createGoal)

router.route('/:id').get(authenticateUser, getSingleGoal)
router.route('/:id').delete(authenticateUser, deleteGoal)
router.route('/:id').patch(authenticateUser, updateGoal)


module.exports = router

