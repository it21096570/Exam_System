/* const express = require("express");
const app = express();
app.use(express.json());

const db = require("./models");

//Routes
const userRoute = require('./routes/User')
app.use("/user", userRoute);

db.sequelize.sync().then(() => {
  app.listen(5001, () => {
    console.log("Server running on port 5001");
  });
}); */

const express = require("express");
const app = express();
app.use(express.json());

const db = require("./models");

//Routes

const userRoute = require('./routes/User');
const teacherRoute = require('./routes/Teacher');
const studentRoute = require('./routes/Student');
const paperRoute = require('./routes/Paper');
const questionRoute = require('./routes/Questions');
const answerRoute = require('./routes/Answers');
const stdPaperRoute = require('./routes/StdPaper');
const studentAnswerRoute = require('./routes/StudentAnswer');

app.use("/user", userRoute);
app.use("/teacher", teacherRoute);
app.use("/student", studentRoute);
app.use("/paper", paperRoute);
app.use("/questions", questionRoute);
app.use("/answers", answerRoute);
app.use("/stdpaper", stdPaperRoute);
app.use("/studentanswer", studentAnswerRoute);


db.sequelize.sync().then(() => {
  app.listen(5001, () => {
    console.log("Server running on port 5001");
  });
});
