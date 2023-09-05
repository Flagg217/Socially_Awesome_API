const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFirend,
} = require('../../controllers/studentController');

// /api/Users
router.route('/').get(getAllUsers).post(createUser);

// /api/Users/:UserId
router.route('/:UserId').get(getUser).delete(deleteUser).put(updateUser);

// /api/Users/:UserId/assignments/:assignmentId
router.route('/:UserId/friends/:friendId').post(addFriend).delete(removeFirend);

module.exports = router;
