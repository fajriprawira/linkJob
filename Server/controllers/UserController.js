const axios = require("axios");
const { User, Profile } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const user = await User.create({
        username,
        email,
        password,
      });

      res.status(201).json({
        message: "Success Create New User",
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      if (!email || !password) throw { name: "InvalidLogin" };

      // proses nyari user bedasarkan email
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) throw { name: "LoginError" };

      if (!comparePassword(password, user.password))
        throw { name: "LoginError" };

      const payload = {
        id: user.id,
        email: user.email,
      };

      const access_token = signToken(payload);

      res.status(200).json({
        access_token,
      });
    } catch (error) {
      // console.log(error)
      next(error);
      // let message = 'Internal server error'
      // let status = 500

      // if (error.name === 'InvalidLogin') {
      //     message = 'Please input email or password'
      //     status = 401
      // }

      // if (error.name === 'LoginError') {
      //     message = 'Invalid email or password'
      //     status = 401
      // }

      // res.status(status).json({
      //     message
      // })
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const [user] = await User.findOrCreate({
        where: { username: payload.email },
        defaults: {
          username: payload.email,
          password: "password_google", // Atur password default untuk user baru
        },
        hooks: false,
      });

      const access_token = signToken({ id: user.id, username: user.username });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error); // Menangani kesalahan melalui middleware error handler
    }
  }

  static async editProfilesById(req, res, next) {
    try {
      const { userId } = req.loginInfo;
      const { fullname, age, phoneNumber, address, skill } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        throw { name: "NotFound", message: `User with id ${id} not found` };
      }

      // Memperbarui profil
      await Profile.update(
        { fullname, age, phoneNumber, address, skill },
        { where: { userId } }
      );

      res.status(200).json({
        message: `Success edit user with id ${id}`,
        user,
      });
    } catch (error) {
      next(error); // Menangani kesalahan melalui middleware error handler
    }
  }
}

module.exports = UserController;
