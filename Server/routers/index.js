const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const myjobController = require("../controllers/MyjobController");
const aiController = require("../controllers/AiController");
const profileController = require("../controllers/ProfileController");
const { authentication } = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandlers");
const upload = require("../utils/multer");

// User routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/google-login", userController.googleLogin);

// Job routes
router.get("/linkjob", myjobController.showAllMyJob);

// Apply authentication middleware for protected routes
router.use(authentication);

// Job Recommendation
router.get("/job", aiController.nameMyJob);

// Profile routes
router.get("/profile", profileController.getProfilebyUserId)
router.post("/profiles", profileController.createProfilebyUserid); //
router.put("/editProfiles", profileController.editProfilesByUserId); // 

// Upload profile photo
router.patch(
  "/editProfiles/image/:id", 
  upload.single("image"), // Middleware untuk menangani file upload
  profileController.uploadImg //
);

// MyJob routes
router.post("/myjob", myjobController.addMyjob);
router.get("/myjob", myjobController.showMyJobByUserId);
router.delete("/myjob/:id", myjobController.deleteMyJobByUserId);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
