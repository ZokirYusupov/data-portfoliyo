const User = require('../models/user.model')

//! @route    Get  /auth/login
//! @desc     Get  Get login page
//! @access   private

const getLoginPage = (req, res) => {
  try {
    if(!req.session.isLogged) {
      return res.render('user/login.hbs', {
        url: process.env.URL_HOST,
        title: 'Login',
      })
    }
  } catch (error) {
    console.log(error)
  }
}


const loginUser = async (req, res) => {
  try {
    const userExist = await User.findOne({email: req.body.email});
    if(userExist) {
      const matchPassword = userExist.password == req.body.password
      if(matchPassword) {
        req.session.user = userExist,
        req.session.isLogged = true
        req.session.save(err => {
          if(err) throw err
          return  res.redirect('/')
        })
      } else {
        // console.log('error')
        return res.redirect('/auth/login')
      }
    }
  } catch (error) {
    console.log(error)
  }
}

//! @route    Get  /auth/logout
//! @desc     logout user
//! @access   private
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
}

module.exports = {
  getLoginPage,
  loginUser,
  logout
}