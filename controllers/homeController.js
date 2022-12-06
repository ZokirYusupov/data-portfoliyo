const User = require('../models/user.model');
const Project = require('../models/project.model')

//! @route    Get  /
//! @desc     Get Home Page
//! @access   public
const getHomePage = async (req, res) => {

  try {
    // console.log(req.session.user);
 
    const projects = await Project.find().populate('author').lean();
    
    // console.log(req.session.isLogged)
    // console.log(projects.author)
    return res.render('home', {
      url: process.env.URL_HOST,
      title: 'Home',
      projects: projects.reverse().slice(0, 6),
      activ: req.session.isLogged,
      user: req.session.user,
      admin: req.session.user,

    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getHomePage
}