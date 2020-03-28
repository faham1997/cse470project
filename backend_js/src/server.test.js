const request = require("supertest");
const app = require("./app").app;
const pg = require("./app").pg

describe("Test the root path", () => {
  test("It should respond to  the GET method with 200", async(done) => {
    const response = await request(app).get("/")
    expect(response.statusCode).toBe(200);
    done();
    });
});

describe("Test the doctor path with name, special and gender parameter", () => {
    test("It should respond to the GET method with 200", async(done) => {
        const response  = await request(app).get("/d/name=null/special=null/gender=null")
        expect(response.statusCode).toBe(200);
        done();
    });
});

describe("Test the doctor path with no parameters", () => {
    test("It should respond to the GET method with 200", async(done) => {
        const response  = await request(app).get("/d")
        expect(response.statusCode).toBe(200);
        done();
    });
});


describe("Test the doctor path with name parameter", () => {
    test("It should respond to the GET method with 200", async(done) => {
        const response  = await request(app).get("/d/name=null")
        expect(response.statusCode).toBe(200);
        done();
    });
});

describe("Test the doctor path with special parameter", () => {
    test("It should respond to the GET method with 200", async(done) => {
        const response  = await request(app).get("/d/special=null")
        expect(response.statusCode).toBe(200);
        done();
    });
});

describe("Test the doctor path with gender parameter", () => {
    test("It should respond to the GET method with 200", async(done) => {
        const response  = await request(app).get("/d/gender=null")
        expect(response.statusCode).toBe(200);
        done();
    });
});

describe("Test the hospital path", () => {
    test("It should respond to the GET method with 200", async(done) => {
        const response = await request(app).get("/h/name=null/type=null")
        expect(response.statusCode).toBe(200);
        done();
    });
});

describe("Test the hospital path with name parameter", () => {
    test("It should respond to the GET method with 200", async(done) => {
        const response = await request(app).get("/h/name=null")
        expect(response.statusCode).toBe(200);
        done();
    });
});

describe("Test the hospital path with type parameter", () => {
    test("It should respond to the GET method with 200", async(done) => {
        const response = await request(app).get("/h/type=null")
        expect(response.statusCode).toBe(200);
        done();
    });
});

describe("Test the user registration function ", () => {
    test("It should respond to the POST method with 200", async(done) => {
        const testBody = {
            "email" : "a@a",
            "name": "a",
            "password" : "a"
        }
        const response = await request(app).get("/register").send(testBody)
        expect(response.statusCode).toBe(200);
        done();
    });
});

afterAll(async(done) => {
    await pg.destroy()
    done()
 })