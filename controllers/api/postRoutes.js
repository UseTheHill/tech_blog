const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const posts = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
        },
      ],
    });

    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/user", withAuth, async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    res.status(200).json(userPosts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData[0]) {
      res.status(404).json({ message: "No post with this id for this user!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    console.log("delete post");
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ["id"],
        },
      ],
    });

    console.log(post.comments);
    for (let i = 0; i < post.comments.length; i++) {
      console.log(post.comments[i].id);
      const commentData = await Comment.destroy({
        where: {
          id: post.comments[i].id,
        },
      });
    }
    const postData = post.destroy();

    console.log("after destroy");

    if (!postData) {
      res
        .status(404)
        .json({ message: "No post found with this id for this user!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
