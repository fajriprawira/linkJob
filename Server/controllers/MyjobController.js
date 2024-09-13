const { MyJob} = require("../models/index");


class MyJobController {
  static async addMyjob(req, res, next) {
    try {
      const { userId: UserId } = req.loginInfo; // Mengambil userId dari loginInfo
      const { title: name, description } = req.body;
      // console.log(UserId, name, description)
      const myjob = await MyJob.create({
        name,
        description,
        UserId,
      });

      res.status(201).json({
        message: "Success create new Job",
        myjob,
      });
    } catch (error) {
      next(error);
    }
  }

  static async showAllMyJob(req, res, next) {
    try {
      const myjob = await MyJob.findAll();
      res.status(200).json({
        statusCode: 200,
        message: "Success Read MyJob",
        data: myjob,
      });
    } catch (error) {
      next(error);
    }
  }

  static async showMyJobByUserId(req, res, next) {
    try {
      const { userId: UserId } = req.loginInfo; 
      const myjob = await MyJob.findAll({ where: {UserId } }); // Menggunakan id dari params

      if (myjob.length === 0) {
        // Periksa apakah ada pekerjaan untuk userId
        return res
          .status(404)
          .json({ message: `No jobs found for user with id ${UserId}` });
      }

      res.status(200).json({
        statusCode: 200,
        message: `Success read jobs for user with id ${UserId}`,
        data: myjob,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteMyJobByUserId(req, res, next) {
    try {
      const { id } = req.params;

      const myjob = await MyJob.findByPk(id);

      if (!myjob) {
        return res.status(404).json({ message: `Job with id ${id} not found` });
      }

      await MyJob.destroy({ where: { id } });

      res.status(200).json({
        message: `Success delete job with id ${id}`,
      });
    } catch (error) {
      next(error);
    }
  }

}

module.exports = MyJobController;
