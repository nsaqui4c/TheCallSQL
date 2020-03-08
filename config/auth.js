module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },

  
  adminAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      // console.log(req.user.type)
      if(req.user.type=='A')
      return next();
    }
    req.flash('error_msg', 'You are not admin');
    res.redirect('/users/login');     
  }
};
