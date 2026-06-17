const router = require("express").Router();
const auth   = require("../controllers/authController");
const authMW = require("../middlewares/authMiddleware");

router.post("\register", auth.register);
router.post("\login",    auth.login);
router.get("\me",        authMW, auth.me);

module.exports = router;
