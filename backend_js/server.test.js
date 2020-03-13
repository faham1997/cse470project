const request = require("supertest");
const app = require("./app").app;
const pg = require("./app").pg

describe("Test the root path", () => {
  test("It should response the GET method", async(done) => {
    const response = await request(app).get("/")
    expect(response.statusCode).toBe(200);
    done();
    });
});

describe("Test the root path", () => {
    test("It should response the GET method", async(done) => {
        const response  = await request(app).get("/d/name=null/special=null/gender=null")
        expect(response.statusCode).toBe(200);
        done();
    });
});

describe("Test the root path", () => {
    test("It should response the GET method", async(done) => {
        const response = await request(app).get("/h/name=null/type=null")
        expect(response.statusCode).toBe(200);
        done();
    });
});

afterAll(async(done) => {
    await pg.destroy()
    done()
 })