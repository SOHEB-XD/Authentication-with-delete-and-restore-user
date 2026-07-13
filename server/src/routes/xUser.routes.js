const router = require("express").Router()

const { registerUser, loginUser, logoutUser, deleteUser, restoreUser } = require("../controllers/xUser.controller");

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.post("/delete", deleteUser)
router.patch("/restore", restoreUser)

module.exports = router