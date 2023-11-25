/**
 *
 * @param {} accountType must be one of the following: "admin", "user"
 */
function Authorization(accountType) {
  return function (req, res, next) {
    if (req.user.isAdmin == undefined || req.user.isAdmin == null)
      throw new Error("req.user.isAdmin is undefined");

    const isAdmin = req.user.isAdmin;

    console.log(req.user);

    if (isAdmin == true && accountType == "admin") {
      next();
    }

    if (isAdmin == false && accountType == "user") {
      next();
    }

    res.status(403).send("Only " + accountType + " is allow");
  };
}

module.exports = { Authorization };
