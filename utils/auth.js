const withAuth = (req, res, next) => {
    console.log("In the withAuth and here is sessionData", req.session);
    if (!req.session.loggedIn) {
      res.redirect("/login");
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
