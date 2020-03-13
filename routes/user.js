const router = require("express").Router();
const { Page } = require("../models");
const { User } = require("../models");
const { userList, userPages } = require("../views");


// /users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) { next(error) }
});

// /users/(dynamicvalue)

router.get("/:userId", async (req, res, next) => {
  try {
    // first getting all users that match the ID in the url bar
    const user = await User.findById(req.params.userId);
    // then get all pages from that author's ID
    const pages = await Page.findAll({
      where: {
        authorId: req.params.userId
      }
    });

    res.send(userPages(user, pages));
  } catch (error) { next(error) }
});


module.exports = router;
