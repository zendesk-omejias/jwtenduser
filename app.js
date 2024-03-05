const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();

// Adding CORS headers to response
app.use(cors());

// Parsing request body
app.use(express.json());

app.post("/login", (req, res) => {
  // Secure credentials
  const SECRET = process.env.SHARED_SECRET;
  const KEY_ID = process.env.KEY_ID;

  // Get the username and password from the request body
  const { username, password } = req.body;

  // Perform your authentication here
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return res.status(401).send({ error: "Invalid login credentials" });
  }

  // Generates an expiry time of 300 seconds for the JWT
  const expiry = Math.floor((new Date().getTime() + 300 * 1000) / 1000);

  const headers = {
    alg: "HS256",
    typ: "JWT",
    kid: KEY_ID,
  };

  const payload = {
    name: username,
    email: "example123453454545@zendesk.com",
    email_verified: true,
    external_id: username,
    exp: expiry,
    scope: "user",
  };

  // Checks if origin matches the pattern http://127.0.0.1:[any port] or null
const origin = req.headers.origin;
const originIsValid = /^http:\/\/127\.0\.0\.1:\d+$/.test(origin) || origin === 'null';
if (!originIsValid) {
  return res.status(403).send({ error: "Request origin does not match an approved domain" });
}

  // Generate the JWT
  const token = jwt.sign(payload, SECRET, { header: headers });

  res.send({ token });
});

app.listen(3000, () => console.log("Listening on port 3000"));