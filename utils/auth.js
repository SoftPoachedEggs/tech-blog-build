const withAuth = (req, res, next) => {
    console.log("WithAuth sessionData", req.session);
    if (!req.session.loggedIn) {
      res.redirect("/login");
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
