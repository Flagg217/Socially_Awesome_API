const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      if (newThought) {
        await User.findOneAndUpdate({_id: req.body.userId}, {$addToSet: {thoughts: newThought._id}}, { new: true });
      }
      return res.json("Thought created!")
    } catch (err) {
      res.status(500).json(err);
   }
  },
  // Delete a thought
  async deleteThought(req, res) { 
    try {
      const removeThought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (removeThought) {
        await User.findOneAndUpdate(
          { username: removeThought.username },
          { $pull: { thoughts: removeThought } },
          { new: true }
        );
      }
      res.json("Thought removed!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  async createReaction(req, res) {
    try {
      const addReaction = await Thought.findOneAndUpdate({
        _id: req.params.thoughtId,
      });
      if (addReaction) {
        await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { new: true }
        );
      }
      res.json("Reaction added!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought
  deleteReaction(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : Student.deleteMany({ _id: { $in: thought.students } })
      )
      .then(() => res.json({ message: 'Thought and students deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
};

