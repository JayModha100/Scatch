const express = require('express');
const connectDb = require('./config/mongoose-connection');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/index');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET || "mysupersecret",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use("/", indexRouter);
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.post('/api/test', (req, res) => {
  console.log("BODY:", req.body);

  res.json({
    success: true,
    message: "POST request worked",
    data: req.body
  });
});

connectDb()
.then(() => {

  console.log("Database connected successfully");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

})
.catch((err) => {
  console.log("DB Connection Error:", err);
});