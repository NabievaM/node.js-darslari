const {Router} = require("express");
const { userPost, getALL, Money } = require("../controllers/user");
const router = Router();


router.post("/user", userPost);
router.get("/user", getALL);
router.post("/transit", Money);

module.exports = router;