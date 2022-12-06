const User = require('../models/user.model')
const Project = require('../models/project.model')

//! @route    Get  /project
//! @desc     Get  Get all projects
//! @access   public

const getAllProjects = async (req, res) => {
  try {

    if(req.query.search) {
      const { search } = req.query
      const author = await User.find({
        first_name: new RegExp(search, "gi")
      })
     const projects = await Project.find()
    .or([{ project_name: new RegExp(search, "gi") }, 
    {author: author }
  ])
    .populate('author')
    .lean()
      // console.log(projects)
    if(!projects) {
      return res.redirect('/users/project/projects')
    }

    return res.render('project/projects', {
      url: process.env.URL_HOST,
      title: 'Projects',
      projects: projects.reverse(),
      activ: req.session.isLogged,
      user: req.session.user,
      admin: req.session.user,
      querySearch: req.query.search
    })
    //  $or: [
    //   {'title': new RegExp(q, "gi")},
    //   {'description': new RegExp(q, "gi") }
    // ]
    }
    
    const projects = await Project.find({

    }).populate('author').lean()
    
    return res.render('project/projects', {
      url: process.env.URL_HOST,
      title: 'Projects',
      projects,
      activ: req.session.isLogged,
      user: req.session.user,
      admin: req.session.user
    })

  } catch (error) {
    console.log(error)
  }
}



//! @route    Get  /project/add
//! @desc     Get  Get project add Page
//! @access   private

const getProjectAddUserPage = async (req, res) => {
  try {
    const findUser = await User.findById(req.params.id).lean();
    // console.log(findUser)
    return res.render('user/addProjectUser', {
      url: process.env.URL_HOST,
      title: 'Add Project',
      findUser,
      activ: req.session.isLogged,
      user: req.session.user,
      admin: req.session.user
    })
  } catch (error) {
    console.log(error)
  }
}

const createProjectUser = async (req, res) => {
  try {
    // console.log(req.file)
    const newProject = new Project({
      project_name: req.body.projectName,
      description:req.body.desc,
      image: 'uploads/' + req.file.filename,
      git_link: req.body.linkGit,
      demo_link: req.body.demoLink,
      author: req.params.id
    })
    await User.findByIdAndUpdate(req.params.id, {
      $push: {projects: newProject._id}
    },
    {new: true, upsert: true}
    );
    await newProject.save((err, projectSaved) => {
      if(err) throw err;
      // const posterId = projectSaved._id
     return res.redirect('/')
    })
  } catch (error) {
    console.log(error);
  }
}

//! @route    Get  /user/project/:id
//! @desc     Get  Get one project page
//! @access   public
const getOneProjectPage = async (req, res) => {
  try {

    const pro = await Project.findById(req.params.id);
    let checkLike = pro.likes.includes(req.session.user._id)

    const findProject = await Project
    .findByIdAndUpdate(req.params.id, 
      {$inc: {visits: 1}},
      {new: true})
    .populate('author')
    .lean();
    
      // console.log(findProject.author.projects.length);
    // const user = await User
    res.render('project/oneProject', {
      url: process.env.URL_HOST,
      title: findProject.project_name,
      findProject,
      lengthPro: findProject.author.projects.length,
      activ: req.session.isLogged,
      user: req.session.user,
      admin: req.session.user,
      checkLike
    })
  } catch (error) {
    console.log(error);
  }
}

//! @route    Get  /user/project/another/:id
//! @desc     Get  Get user another projects
//! @access   public
const getUserAnotherProjectPage = async (req, res) => {
  try {
    
    return res.render('project/userAnother', {
      url: process.env.URL_HOST,
      title: 'salom',
      activ: req.session.isLogged,
      user: req.session.user,
      admin: req.session.user
    })

  } catch (error) { 
    console.log(error)
  }
}

//! @route    Get  /user/project/like/:id
//! @desc     like
//! @access   private
const projectLike = async (req, res) => {
  try {
    
    const id =  (req.session?.user?._id);
    // console.log(id);

    let project = await Project.findById(req.params.id)

    // console.log(project.likes.push('salom'))
    // project.save()

    if(project.likes.includes(id)) {
      const indexNum = project.likes.indexOf(id);

      project.likes.splice(indexNum, 1)
      project.save()
    } else {
      project.likes.push(id)
      project.save()
    }

    return res.redirect('/users/project/' + req.params.id)

  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getProjectAddUserPage,
  createProjectUser,
  getOneProjectPage,
  getAllProjects,
  getUserAnotherProjectPage,
  projectLike
}