const request = require("supertest");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");
const { sequelize } = require("../models");


let access_token;
beforeAll(async() =>{
  const users = require("../data/user.json");
    users.forEach((el) => {
      el.password = hashPassword(el.password)

      el.createdAt = new Date();
      el.updatedAt = new Date();
      
    });

    await sequelize.queryInterface.bulkInsert("Users", users, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    const payload = {
      id:3,
      email:"backtic123@gmail.com"
    }

    access_token = signToken(payload);

})

afterAll(async() =>{
  await sequelizequeryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  })
})

describe("POST/login", () => {
  describe("POST/ login - succeed", () => {
    test("should be return an object with message", async () => {
      const body = { email: "backtic123@gmail.com", password: "54321" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Succeed login");
      expect(response.body).toHaveProperty("user", expect.any(Object));
    });
  });

  describe("POST/ login - fail", () => {
    // error kalo email kosong
    test("should be return an object with error message", async () => {
      const body = { email: "", password: "54321" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // error kalo password kosong
    test("should be return an object with error message", async () => {
      const body = { email: "backtic123@gmail.com", password: "" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // error kalo email salah
    test("should be return an object with error message", async () => {
      const body = { email: "bacctic223@gmail.com", password: "54321" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // error kalo password salah
    test("should be return an object with error message", async () => {
      const body = { email: "backtic123@gmail.com", password: "2314abcd" };
      const response = await request(app).post("/login").send(body);

      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
  });
});
