// import models
const Post = require("./Post");
const Comment = require("./Comment");
const User = require("./User");

// Post belongs to User
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// User have many posts
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Comment belongs to User
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// User have many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Comment belongs to Post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

// Post have many comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

module.exports = {
  Post,
  Comment,
  User,
};
