const express=require("express");

const { getCont,updCont,creCont,delCont }=require("../controllers/contactController")
const router=express.Router();

const validateToken=require("../middleware/validateTokenHandler")
router.use(validateToken)

router.route("/").get(getCont);
router.route("/").post(creCont);
router.route("/:id").put(updCont);
router.route("/:id").delete(delCont);
module.exports=router;

//here we need to protect all routes we using validate token for all
//all routes