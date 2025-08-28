// test/bookings.test.js
const expect = require("chai").expect;
const request = require("request");

const baseUrl = "http://localhost:3000";

describe("Bookings API Tests", function () {
  this.timeout(7000);

  //  Test 1: Root health check
  it("should return status ok on root endpoint", function (done) {
    request.get(
      { url: `${baseUrl}/`, json: true },
      function (error, response, body) {
        expect(error).to.equal(null);
        expect(response && response.statusCode).to.equal(200);
        expect(body).to.be.an("object");
        expect(body).to.have.property("status");
        done();
      }
    );
  });

  // We'll store the created booking id for optional extra checks
  let createdId;

  //  Test 2: Create a new booking (use required fields)
  it("should create a new booking", function (done) {
    const uniq = Date.now();
    const bookingData = {
      studentId: `student-${uniq}`,
      tutorId: `tutor-${uniq}`,
      subject: "Mathematics",
      date: "2025-09-01", // ISO or your accepted format
      // optional fields supported by your service could be added here
    };

    request.post(
      {
        url: `${baseUrl}/api/bookings`,
        json: true, // send JSON since server uses express.json()
        headers: { "Content-Type": "application/json" },
        body: bookingData
      },
      function (error, response, body) {
        expect(error).to.equal(null);
        expect(response.statusCode).to.equal(201);

        expect(body).to.be.an("object");
        // Your controller echoes created item from service
        expect(body).to.have.property("studentId", bookingData.studentId);
        expect(body).to.have.property("tutorId", bookingData.tutorId);
        expect(body).to.have.property("subject", bookingData.subject);
        expect(body).to.have.property("date", bookingData.date);
        // You set default status: 'pending'
        expect(body).to.have.property("status").that.matches(/pending/i);

        // If your service assigns an id, capture it
        if (body.id) createdId = body.id;

        done();
      }
    );
  });

  //  Test 3: Get all bookings (your controller returns { data: [...] })
  it("should return list of bookings", function (done) {
    request.get(
      { url: `${baseUrl}/api/bookings`, json: true },
      function (error, response, body) {
        expect(error).to.equal(null);
        expect(response && response.statusCode).to.equal(200);
        expect(body).to.be.an("object");
        expect(body).to.have.property("data").that.is.an("array");
        done();
      }
    );
  });

  //  Test 4: Handle invalid POST request (empty body → 400)
  it("should return error for invalid booking data", function (done) {
    request.post(
      {
        url: `${baseUrl}/api/bookings`,
        json: true,
        headers: { "Content-Type": "application/json" },
        body: {}
      },
      function (error, response, body) {
        expect(error).to.equal(null);
        expect(response && response.statusCode).to.equal(400);
        expect(body).to.have.property("error");
        done();
      }
    );
  });

  //  invalid route returns 404
  it("should return 404 for an invalid endpoint", function (done) {
    request.get(`${baseUrl}/wrong-endpoint`, function (error, response) {
      expect(error).to.equal(null);
      expect(response && response.statusCode).to.equal(404);
      done();
    });
  });

  //fetch by id after creation (only if service returns id)
  it("should get booking by id after creation (if id present)", function (done) {
    if (!createdId) return done(); // skip if no id is returned by service

    request.get(
      { url: `${baseUrl}/api/bookings/${createdId}`, json: true },
      function (error, response, body) {
        expect(error).to.equal(null);
        expect(response && response.statusCode).to.equal(200);
        expect(body).to.be.an("object");
        expect(body).to.have.property("id", createdId);
        done();
      }
    );
  });
});
