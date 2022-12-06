module.exports = function(req, res, next) {
  if(!req.session?.user?.isAdmin) {
    return res.redirect('/')
  } 
  next()
}