const router = require("express").Router();
const addPage = require("../views/addPage");
const { Page } = require("../models");
const { User } = require("../models");
const wikipage = require("../views/wikipage");
const main = require("../views/main");


router.get("/", async (req, res, next) => {
  try {
    const pages = await Page.findAll();

    res.send(main(pages));
  }
  catch (error) {next(error)};
});

router.post("/", async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const page = new Page({
    title,
    content
  });

  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    });


    await page.save();
    // I think you could have just used line below instead of doing const page
    // and then saving it
    // const page = await Page.create(req.body);

    page.setAuthor(user); // establishes link and makes foreign object

    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
});

// when you go to the add page, send you the html form
// submit then sents you to POST at /wiki/
// POST then grabs the title and content from the form
// adds them to a new instance of Page, then saves
// the page as a row (instance) in the table.
// Then get redirected to the slug page down below
router.get("/add", (req, res, next) => {
  res.send(addPage());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug //slug could be any name. Referencing the semicolon
      }
    });
    if (page === null) {
      res.sendStatus(404);
    }
    else {
      const author = await page.getAuthor(); // get the author of each page (with the foreign key relationship)
      res.send(wikipage(page, author));
    }
  }
  catch (error) { next(error) }
});

module.exports = router;
