const axios = require("axios");
const { Profile, User } = require("../models/index");
const { where } = require("sequelize");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class ProfileController {
  // Membuat profil berdasarkan userId
  static async createProfilebyUserid(req, res, next) {
    try {
      const { userId: UserId } = req.loginInfo; // Mengambil userId dari loginInfo
      const { fullname, age, phoneNumber, address, skill } = req.body;
      // console.log(userId, fullname, age, phoneNumber, address,skill)

      const profile = await Profile.create({
        fullname,
        age,
        phoneNumber,
        address,
        skill,
        UserId,
      });

      res.status(201).json({
        message: "Success Create New Profile",
        profile,
      });
    } catch (error) {
      next(error);
    }
  }

  //mendapatkan profile berdasarkan userId
  static async getProfilebyUserId(req, res, next) {
    try {
      const { userId: UserId } = req.loginInfo; // Mengambil userId dari loginInfo
     
      console.log(UserId)

      const profile = await Profile.findOne({
        where: {
          UserId,
        },
      });

      if (!profile) {
        throw { name: `profile ${UserId} not Found ` };
      }

      res.status(200).json({
        statusCode: 200,
        message:`Profile with ${UserId} found`,
        profile
      })
    } catch (error) {
      next(error)
    }
  }

  // Mengedit profil berdasarkan userId
  static async editProfilesByUserId(req, res, next) {
    try {
      const { userId: UserId } = req.loginInfo;
      const { fullname, age, phoneNumber, address, skill } = req.body;
      // console.log(UserId,fullname, age, phoneNumber, address, skill)
      const user = await User.findByPk(UserId); // Menggunakan userId dari loginInfo
      // console.log(user)

      if (!user) {
        throw { name: "NotFound", message: `User with id ${UserId} not found` };
      }

      // Memperbarui profil
      await Profile.update(
        { fullname, age, phoneNumber, address, skill },
        { where: { UserId } }
      );

      res.status(200).json({
        message: `Success edit profile for user with id ${UserId}`,
        user,
      });
    } catch (error) {
      next(error); // Menangani kesalahan melalui middleware error handler
    }
  }

  // Mengunggah gambar profil
  static async uploadImg(req, res, next) {
    try {
      const { userId } = req.loginInfo; // Mengambil userId dari loginInfo
      const file = req.file; // Mengambil file yang diunggah dari request

      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Mengonversi file menjadi base64
      const base64 = file.buffer.toString("base64");

      // Mengunggah file ke Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${base64}`
      );

      // Memperbarui profil dengan URL gambar
      await Profile.update(
        { imgUrl: result.secure_url },
        { where: { userId } }
      );

      res.status(200).json({
        message: `Image updated successfully for user with id ${userId}`,
        url: result.secure_url,
      });
    } catch (error) {
      next(error); // Menangani kesalahan melalui middleware error handler
    }
  }
}

module.exports = ProfileController;
