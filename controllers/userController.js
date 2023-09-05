const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');
const { create } = require('../models/User');

module.exports = {
  // Get all students
  getAllUsers(req, res) {
    User.find()
      .then((users) => {
      return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single student
  getUser(req, res) {
    User.findOne({ _id: req.params.UserId })
      .then((users) => {
        return res.json(users);
       })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new student
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.UserId })
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  },

  // Add an assignment to a student
  addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a student
  removeFriend(req, res) {
    console.log('You are removing a friend');
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((user) => {
      res.json(user);
      console.log("testing");
      })
    .catch((err) => res.status(500).json(err));
  },
};
