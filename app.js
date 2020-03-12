const express = require("express");
// const routes = require('')
const morgan = require("morgan");
const bodyParser = require("body-parser");
const layout = require("./views/layout")
const wikiRouter = require("./routes/wiki")
const userRouter = require("./routes/user")
const { db } = require('./models');

db.authenticate().
then(() => {
    console.log('\x1b[33m%s\x1b[0m', 'connected to the database');
});


const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use('/wiki', wikiRouter);


app.get("/", (req, res) => {
    res.redirect('/wiki');
});

// DO NOT CHANGE, VERY IMPORTANT:
const PORT = 6969;

const connections = async () => {
    await db.sync();
    app.listen(PORT, () => {
        console.log(`Listening in port ${PORT}`);
        console.log(`http://localhost:${PORT}`)
    });
};

connections();
