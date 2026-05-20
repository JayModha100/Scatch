const express = require('express');
const connectDb = require('./config/mongoose-connection');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use('/', require('./routes/ownersRouter'));
app.use('/', require('./routes/usersRouter'));
app.use('/', require('./routes/productsRouter'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/api/test', (req, res) => {
  console.log("BODY:", req.body);
  res.json({
    success: true,
    message: "POST request worked",
    data: req.body
  })});

connectDb()
.then(() => {
  console.log("Database connected successfully");
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

}) 
}); 
