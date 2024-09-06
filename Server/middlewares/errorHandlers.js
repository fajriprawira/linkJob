const errorHandler = (error, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";

  console.log(error)

  // Penanganan error dari Sequelize
  if (error.name === "SequelizeValidationError") {
    status = 400;
    message = error.errors[0].message;
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = error.errors[0].message;
  }

  if (
    error.name === "SequelizeDatabaseError" ||
    error.name === "SequelizeForeignKeyConstraintError"
  ) {
    status = 400;
    message = "Invalid input";
  }

  // Penanganan error saat login
  if (error.name === "InvalidLogin") {
    message = "Please input email or password";
    status = 401;
  }

  if (error.name === "LoginError") {
    message = "Invalid email or password";
    status = 401;
  }

  // Penanganan error saat data tidak ditemukan
  if (error.name === "NotFound") {
    status = 404;
    message = `Data with id ${error.id} not found`;
  }

  // Penanganan error saat file tidak ditemukan
  if (error.name === "FileNotFound") {
    status = 400;
    message = error.message;
  }

  // Penanganan error untuk unauthorized access
  if (error.name === "Unauthorized") {
    status = 401;
    message = error.message || "Unauthorized access";
  }

  if (error.name === "Forbidden") {
    status = 403;
    message = "You dont have any access";
  }

  // Mengirim response dengan status dan pesan error
  res.status(status).json({
    message,
  });
};

module.exports = errorHandler;
