const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/Users
router.route('/').get(getAllUsers).post(createUser);

// /api/Users/:UserId
router.route('/:UserId').get(getUser).delete(deleteUser).put(updateUser);

// /api/Users/:UserId/assignments/:assignmentId
router.route('/:UserId/friends/:friendId').put(addFriend).delete(removeFriend);

module.exports = router;
