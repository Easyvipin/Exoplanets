const request = require("supertest");
const app = require("../../app");

describe("Test Get/launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test Post /launch", () => {
  const completeLaunchData = {
    mission: "Uss Enterprise",
    rocket: "Ncc",
    target: "Kepler data",
    launchDate: "January 4, 2028",
  };

  const withInvalidDate = {
    ...completeLaunchData,
    launchDate: "invd",
  };

  const withoutLaunchData = {
    mission: "Uss Enterprise",
    rocket: "Ncc",
    target: "Kepler data",
  };

  test("it should respond with 200 Success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(withoutLaunchData);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(withInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid Date",
    });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(withoutLaunchData)
      .expect("Content-Type", /json/)
      .expect(400);
  });
});
