// routes for users
const router = require("express").Router();
const { getUser } = require("../controllers/UserControllers");
const { updateProfile } = require("../controllers/UpdateProfileController");
const auth = require("../middlewares/auth");

//GET user
router.get("/me", auth, getUser);
router.patch("/me", auth, updateProfile);

module.exports = router;
