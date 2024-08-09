const { User, MyJob, Profile } = require("../models/index");
const cloudinary = require("../utils/cloudinary");
class MyJobController {
  static async addMyjob(req, res, next) {
    try {
      const { userId } = req.loginInfo;

      const { name, description } = req.body;

      const myjob = await MyJob.create({
        name,
        description,
        userId,
      });

      res.status(201).json({
        message: "Success create new article",
        myjob,
      });
    } catch (error) {
      next(error);
      // console.log(error);
      // let status = 500;
      // let message = "Internal Server Error";

      // if (error.name === "SequelizeValidationError") {
      //   status = 400;
      //   message = error.errors[0].message;
      // }

      // if (error.name === "SequelizeDatabaseError") {
      //   status = 400;
      //   message = "Invalid input";
      // }

      // if (error.name === "SequelizeForeignKeyConstraintError") {
      //   status = 400;
      //   message = "Invalid input";
      // }

      // res.status(status).json({
      //   message,
      // });
    }
  }

  static async showAllMyJob(req, res, next) {
    try {
      const myjob = await MyJob.findAll();
      res.status(200).json({
        statusCode: 200,
        message: "Success Read Article",
        data: myjob,
      });
    } catch (error) {
      console.log(error);
      
      next(error);
      // console.log(error);
      // res.status(500).json({
      //   message: "Internal Server Error",
      // });
    }
  }

  static async showMyJobById(req, res, next) {
    const { id } = req.params;
    try {
      const myjob = await MyJob.findOne({
        where: {
          id,
        },
      });

      if (!myjob) {
        throw { name: "NotFound", id };
      }

      res.status(200).json({
        statusCode: 200,
        message: `Success read article with id ${article.id}`,
        data: myjob,
      });
    } catch (error) {
      next(error);
      // console.log(error);
      // let status = 500;
      // let message = "Internal Server Error";

      // if (error.name == "NotFound") {
      //   status = 404;
      //   message = `Data with id ${error.id} not found`;
      // }

      // res.status(status).json({
      //   message,
      // });
    }
  }

  static async deleteMyJobById(req, res, next) {
    try {
      const { id } = req.params;

      const myjob = await MyJob.findByPk(id);

      if (!myjob) {
        throw { name: "NotFound", id };
      }

      await MyJob.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: `Success delete article with id ${id}`,
      });
    } catch (error) {
      next(error);
      // console.log(error);
      // let status = 500;
      // let message = "Internal Server Error";

      // if (error.name == "NotFound") {
      //   status = 404;
      //   message = `Data with id ${error.id} not found`;
      // }

      // res.status(status).json({
      //   message,
      // });
    }
  }

  static async uploadImg(req, res, next) {
    const id = req.params.id;
    try {
      // Pastikan file diunggah
      if (!req.file) {
        throw { name: "FileNotFound", message: "No file uploaded" };
      }

      // Konversi file buffer ke base64
      const file = req.file.buffer.toString("base64");

      // Mengupload file ke Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${file}`,
        {
          folder: "profile_images", // Menyimpan gambar di folder 'profile_images' di Cloudinary
        }
      );

      // Memperbarui URL gambar di database
      await Profile.update({ imgUrl: result.secure_url }, { where: { id } });

      res
        .status(200)
        .json({
          msg: `Image updated successfully for profile with id ${id}`,
          url: result.secure_url,
        });
    } catch (error) {
      // Menangani berbagai jenis kesalahan
      
      next(error);
    }
  }
}

module.exports = MyJobController;
