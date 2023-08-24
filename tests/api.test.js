const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

describe("This testing is for API:", () => {
  it("Positive case: /login API testing, it should return 200 OK when valid credentials are provided", async () => {
    const credentials = {
      email: "user1@example.com",
      password: "password1",
    };

    const response = await request.post("/login").send(credentials);
    expect(response.status).toBe(200);
    expect(Object.keys(response._body)).toContain({ message, email, token });
  });

  it("Negative case: /login API testing, it should return 401 Unauthorized when invalid credentials are provided", async () => {
    const credentials = {
      email: "wrong@example.com",
      password: "wrong",
    };

    const response = await request.post("/login").send(credentials);
    expect(response.status).toBe(400);
    expect(Object.keys(response._body)).toContain({ message });
  });

  it("Positive case: /usergame/insert API testing, it should return 200", async () => {
    const registerData = {
      username: "testplayer",
      email: "testplayer@example.com",
      password: "testplayer123",
      confirmPassword: "testplayer123",
    };

    const response = await request.post("/usergame/insert").send(registerData);
    expect(response.status).toBe(200);
    expect(Object.keys(response._body)).toContain({ message });
  });

  it("Negative case: /usergame/insert API testing, it should return 400", async () => {
    const registerData = {
      username: "testplayer",
      email: "testplayer@example.com",
      password: "testplayer123",
      confirmPassword: "testplayer",
    };

    const response = await request.post("/usergame/insert").send(registerData);
    expect(response.status).toBe(400);
    expect(Object.keys(response._body)).toContain({ message });
  });

  it("Positive case: /gamehistory/get/all API testing, it should return 200", async () => {
    const searchData = {
      gamename: "gamerps",
      email: "user1@example.com",
    };

    const response = await request
      .post("/gamehistory/get/all")
      .send(searchData);
    expect(response.status).toBe(200);
    expect(Object.keys(response._body)).toContain({ data });
  });

  it("Negative case: /gamehistory/get/all API testing, it should return 400", async () => {
    const searchData = {
      gamename: "gamex",
      email: "userx@example.com",
    };

    const response = await request
      .post("/gamehistory/get/all")
      .send(searchData);
    expect(response.status).toBe(400);
    expect(Object.keys(response._body)).toContain({ data });
  });

  it("Positive case: /gamehistory/get/rank API testing, it should return 200", async () => {
    const searchData = {
      gamename: "gamerps",
    };

    const response = await request
      .post("/gamehistory/get/rank")
      .send(searchData);
    expect(response.status).toBe(200);
    expect(Object.keys(response._body)).toContain({ data });
  });

  it("Negative case: /gamehistory/get/all API testing, it should return 400", async () => {
    const searchData = {
      gamename: "gamex",
    };

    const response = await request
      .post("/gamehistory/get/rank")
      .send(searchData);
    expect(response.status).toBe(400);
    expect(Object.keys(response._body)).toContain({ data });
  });
});
