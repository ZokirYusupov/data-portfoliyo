const User = require('../models/user.model')
const validateUser = require('../validate/user-create.validate')

//! @route    Get  /users
//! @desc     Get  Get all users
//! @access   private
const getAllUsersPage = async (req, res) => {
  try {
    const users = await User.find().lean()
    
    return res.render('user/allUsers', {
      url: process.env.URL_HOST,
      title: 'All users',
      users: users.reverse(),
      activ: req.session.isLogged,
      user: req.session.user,
      admin: req.session.user
    })
  } catch (error) {
    console.log(error);
  }
}

//! @route    Get  /
//! @desc     Get  Create User Page
//! @access   private
const getUserCreatePage = (req, res) => {
  try {
    return res.render('user/createUser', {
      url: process.env.URL_HOST,
      title: 'Create User',
      activ: req.session.isLogged,
      user: req.session.user,
      admin: req.session.user
    })
  } catch (error) {
    console.log(error)
  }
}


//! @route    POST  users/add
//! @desc    create new user
//! @access   private
const createUser = async (req, res) => {
  try {
    const findUser = await User.findOne({email: req.body.email.trim()})
    
    if(findUser) {
      return res.render('user/createUser',{
        url: process.env.URL_HOST,
        title: 'Create User',
        error: 'Bunday foydalanuvchi royxatdan otkazilgan',
        activ: req.session.isLogged,
        user: req.session.user,
        admin: req.session.user
      })
    }
    const { error } = await validateUser(req.body)
    if(error) {
      // console.log(error.details[0].message)
      return res.render('user/createUser',{
        url: process.env.URL_HOST,
        title: 'Create User',
        error,
        activ: req.session.isLogged,
        user: req.session.user,
        admin: req.session.user
      })
    }
    const newUser = await new User({
      first_name: req.body.firstName,
      last_name: req.body.surName,
      email: req.body.email,
      image: 'uploads/' + req.file.filename,
      password: req.body.password,
      group_number: req.body.groupNumber,
      category: req.body.category
    })

    await newUser.save((err, savedUser) => {
      if(err) throw err;
     return res.redirect('/users')
    })

  } catch (error) {
    console.log(error);
  }
}




module.exports = {
  getUserCreatePage,
  createUser,
  getAllUsersPage
}