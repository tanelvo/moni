const jwt = require("jsonwebtoken")

const jwtAuth = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) throw Error("Access denied");

    const accesToken = req.headers.authorization.split(" ")[1]

    const decoded = jwt.verify(accesToken, process.env.JWT_SECRET)
    req.user = decoded

    next()

  } catch (e) {
    res.redirect('/login')
    return res.status(401).send({ error: e.message })
  }
}

module.exports = jwtAuth