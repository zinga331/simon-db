const express = require("express");
const app = express();
const DB = require("./database.js");

// The service name and port. We use these to partition it from other running services when running in the production environment.
const serviceName = "simon-db";
const port = 3001;

// JSON body parsing using built-in middleware
app.use(express.json());

// Server up the applications static content
app.use(`/${serviceName}`, express.static("application"));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/${serviceName}/api`, apiRouter);

// GetScores
apiRouter.get("/scores", async (_req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

// SubmitScore
apiRouter.post("/score", async (req, res) => {
  DB.addScore(req.body);
  const scores = await DB.getHighScores();
  res.send(scores);
});

// Redirect back to the home page if the path is unknown
app.use((_req, res) => {
  res.redirect(`/${serviceName}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
