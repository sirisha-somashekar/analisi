const router = require("express").Router();
const {addTask,viewTasks, graphit} = require('../controllers/tasks');

router.post('/task',addTask);
router.get('/task',viewTasks);
router.get('/task-graph',graphit)

module.exports = router;