const { User } = require("../models/index");
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
        password, // Tidak perlu hash di sini, sudah dilakukan di model
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
      if (!email || !password) throw { name: "InvalidLogin", message: "Email and password are required" };

      const user = await User.findOne({
        where: { email },
      });

      if (!user || !comparePassword(password, user.password)) {
        throw { name: "LoginError", message: "Invalid email or password" };
      }

      const payload = {
        id: user.id,
        email: user.email,
      };

      const access_token = signToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
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

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.email,
          email: payload.email,
          password: "password_google", // Tidak perlu hash di sini, karena model akan melakukannya
        },
        hooks: true, // Pastikan hooks tetap berjalan untuk hashing password default
      });

      const access_token = signToken({ id: user.id, username: user.username });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
