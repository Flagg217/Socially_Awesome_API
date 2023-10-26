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

router.route('/').get(getAllUsers).post(createUser);

router.route('/:UserId').get(getUser).delete(deleteUser).put(updateUser);

router.route('/:UserId/friends/:friendId').put(addFriend).delete(removeFriend);

module.exports = router;
