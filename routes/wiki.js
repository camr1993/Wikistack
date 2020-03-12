const router = require("express").Router();
const addPage = require("../views/addPage");
const { Page } = require("../models")
// const client = require("../models");

router.get("/", (req, res, next) => {
  res.send('got to GET /wiki/')
})//maybe error handling

router.post("/", async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const page = new Page({
    title,
    content
  })

  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
})

router.get("/add", (req, res, next) => {
  res.send(addPage())
})

module.exports = router;
