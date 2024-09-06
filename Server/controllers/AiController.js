const { Profile } = require("../models/index");
const { GoogleGenerativeAI } = require("@google/generative-ai");

class AiController {
  static async nameMyJob(req, res, next) {
    try {
      // Membuat instance dari GoogleGenerativeAI dengan API key
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

      const { userId } = req.loginInfo;
      console.log(userId)

      const profile = await Profile.findOne({
        where: {
          UserId: userId,
        },
      });
      // console.log(profile,"ini profile broo")

      // Membuat prompt secara dinamis berdasarkan input pengguna
      const prompt = `Please give me 10 job recommendations based on age ${profile.age}, skill ${profile.skill}. Please give me only the data in an array of objects without any further explanation and without JSON code blocks and without any backticks.`;

      // Mendapatkan model yang digunakan
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Menghasilkan konten berdasarkan prompt
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parsing response ke dalam format JSON
      const parsed = JSON.parse(text);
      // console.log(parsed);

      // Mengirim hasil ke client
      res.status(200).json({
        message: "Success",
        data: parsed,
      });
    } catch (error) {
      console.log(error);
      next(error);

      // Menangani kesalahan dan mengirim response dengan status 500
      // res.status(500).json({
      //   message: "Internal server error",
      //   error: error.message,
      // });
    }
  }
}

module.exports = AiController;
