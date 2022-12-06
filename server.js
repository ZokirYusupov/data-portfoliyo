const express = require('express');
const app = express();
const path = require('path')
const { engine } = require('express-handlebars')
const connectDB = require('./config/db')
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session)
// config dotenv
const dotenv = require('dotenv');
dotenv.config();

//!mongodb connect
connectDB() 

// session
const store = new MongoStore({
  collection: 'sessions',
  uri: process.env.MONGO_URI
  // expires: 126099090
})

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// body parser middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
}))

// initilaze template engine //!handlebars
app.engine('hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs')


//! routes initial
app.use('/', require('./routes/home.routes'))
app.use('/users', require('./routes/user.routes'))
app.use('/users/project', require('./routes/project.routes'))
app.use('/auth', require('./routes/auth.routes'))

const PORT = process.env.PORT || 8000
// server build
app.listen(PORT, console.log(`Server running on http://localhost:${PORT}`))
