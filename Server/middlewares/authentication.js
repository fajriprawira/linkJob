const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    // Mengambil header Authorization
    const { authorization } = req.headers;

    // Memastikan header Authorization ada
    if (!authorization) {
      throw {
        name: "Unauthorized",
        message: "No authorization header provided",
      };
    }

    // Memisahkan bearer token dari header
    const access_token = authorization.split(" ")[1];

    // Memastikan token tidak kosong
    if (!access_token) {
      throw { name: "Unauthorized", message: "Token not found" };
    }

    // Memverifikasi token JWT
    const payload = verifyToken(access_token);

    // Mencari user berdasarkan payload dari token
    const user = await User.findOne({
      where: {
        email: payload.email,
      },
    });

    // Jika user tidak ditemukan
    if (!user) {
      throw {
        name: "Unauthorized",
        message: "Invalid token or user not found",
      };
    }

    // Menyimpan informasi user ke dalam request object
    req.loginInfo = {
      userId: user.id,
      email: user.email,
      username: user.username,
    };

    // Melanjutkan ke middleware berikutnya
    next();
  } catch (error) {
    // Menangani error dan melanjutkannya ke middleware error handler
    next(error);
  }
};

module.exports = { authentication };
