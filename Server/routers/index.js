const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const myjobController = require("../controllers/MyjobController");
const AiController = require("../controllers/AiController");
const { authentication } = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandlers");
const upload = require("../utils/multer");

// User routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/google-login", userController.googleLogin);

// Apply authentication middleware for protected routes
router.get("/myjob", myjobController.showAllMyJob);
router.use(authentication);

// Job Recommendation
router.get("/job", AiController.nameMyJob);

// Profile routes
router.put("/editProfiles/:id", userController.editProfilesById);

// MyJob routes
router.post("/myjob", myjobController.addMyjob);
router.get("/myjob/:id", myjobController.showMyJobById);
router.delete("/myjob/:id", myjobController.deleteMyJobById);

// Upload profile photo
router.patch(
  "/editProfiles/:id/image",
  upload.single("image"), // Middleware untuk menangani file upload
  myjobController.uploadImg
);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
