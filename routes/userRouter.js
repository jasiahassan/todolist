const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const uploadUsingMulter = require("../utils/uploadUsingMulter");

router.post(
  "/signup",
  uploadUsingMulter.uploadUserPhotos,
  userController.createUser
);
router.get("/getAllUsers", userController.getAllUsers);

router.get("/getuser", authController.protect, userController.getUser);

router.patch("/updateUser", authController.protect, userController.updateUser);
router.patch(
  "/updateUser/:id",
  authController.protect,
  authController.restrictTo("admin"),
  userController.updateUser
);

router.delete("/deleteUser", authController.protect, userController.deleteUser);
router.delete(
  "/deleteUser/:id",
  authController.protect,
  authController.restrictTo("admin"),
  userController.deleteUser
);

router.post("/login", userController.loginUser);

router.get("/logout", userController.logout);

router.post("/forgetPassword", userController.forgetPassword);

router.patch("/resetPassword/:token", userController.resetPassword);

router.patch(
  "/updatePassword",
  authController.protect,
  userController.updatePassword
);

module.exports = router;
