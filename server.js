const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const port = 3001;

const db = require("./lib/login_db");
const sessionOption = require("./lib/sessionOption");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

app.use(express.static(path.join(__dirname, "/build")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var MySQLStore = require("express-mysql-session")(session);
var sessionStore = new MySQLStore(sessionOption);
app.use(
  session({
    key: "session_cookie_name",
    secret: "~",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.get("/authcheck", (req, res) => {
  const sendData = { isLogin: "" };
  if (req.session.is_logined) {
    sendData.isLogin = "True";
  } else {
    sendData.isLogin = "False";
  }
  res.send(sendData);
});

app.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

app.post("/login", (req, res) => {
  // 데이터 받아서 결과 전송
  const userID = req.body.userID;
  const userPassword = req.body.userPassword;
  const sendData = { isLogin: "" };

  if (userID && userPassword) {
    // id와 pw가 입력되었는지 확인
    db.query(
      "SELECT * FROM userInfo WHERE userID = ?",
      [userID],
      (error, results, fields) => {
        if (error) {
          console.error("DB Query Error: ", error);
          return res.status(500).send({ isLogin: "Server error" });
        }
        if (results.length > 0) {
          // db에서의 반환값이 있다 = 일치하는 아이디가 있다.

          bcrypt.compare(
            userPassword,
            results[0].userPassword,
            (err, result) => {
              // 입력된 비밀번호가 해시된 저장값과 같은 값인지 비교

              if (err) {
                console.error("Bcrypt Error:", err);
                return res.status(500).send({ isLogin: "Server error" });
              }

              if (result === true) {
                // 비밀번호가 일치하면
                req.session.is_logined = true; // 세션 정보 갱신
                req.session.userID = userID; //세션에 userID 저장
                req.session.save(() => {
                  sendData.isLogin = "True";
                  res.send(sendData);
                });
              } else {
                // 비밀번호가 다른 경우
                sendData.isLogin = "로그인 정보가 일치하지 않습니다.";
                res.send(sendData);
              }
            }
          );
        } else {
          // db에 해당 아이디가 없는 경우
          sendData.isLogin = "아이디 정보가 일치하지 않습니다.";
          res.send(sendData);
        }
      }
    );
  } else {
    // 아이디, 비밀번호 중 입력되지 않은 값이 있는 경우
    sendData.isLogin = "아이디와 비밀번호를 입력하세요!";
    res.send(sendData);
  }
});

app.get("/userinfo", (req, res) => {
  if (req.session.is_logined) {
    db.query(
      "SELECT * FROM userInfo WHERE userID = ?",
      [req.session.userID],
      (error, result) => {
        if (error) throw error;

        const user = result[0];

        const sendData = {
          isLogin: "True",
          userName: user.userName,
          userEmail: user.userEmail,
          userBirth: user.userBirth,
        };
        res.send(sendData);
      }
    );
  } else {
    res.send({ isLogin: "False" });
  }
});

app.post("/signin", (req, res) => {
  console.log(req.body);
  // 데이터 받아서 결과 전송
  const userName = req.body.userName;
  const userID = req.body.userID;
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  const userBirth = req.body.userBirth;

  const sendData = { isSuccess: "" };

  if (userName && userID && userEmail && userPassword && userBirth) {
    db.query(
      "SELECT * FROM userInfo WHERE userID = ?",
      [userID],
      function (error, results, fields) {
        if (error) {
          console.error("쿼리 오류: ", error);
          sendData.isSuccess = "회원가입 실패: 오류 발생!";
          return res.send(sendData);
        }
        if (results.length <= 0) {
          // 비밀번호 해시화
          const hashedPassword = bcrypt.hashSync(userPassword, 10);
          db.query(
            "INSERT INTO userInfo (userName, userID, userEmail, userPassword, userBirth) VALUES(?,?,?,?,?)",
            [userName, userID, userEmail, hashedPassword, userBirth],
            function (error, data) {
              if (error) {
                console.error("INSERT 쿼리 오류: ", error);
                sendData.isSuccess = "회원가입 실패: 오류 발생!";
                return res.send(sendData);
              }
              sendData.isSuccess = "True";
              res.send(sendData);
            }
          );
        } else {
          // DB에 같은 이름의 회원아이디가 있는 경우
          sendData.isSuccess = "이미 존재하는 아이디입니다!";
          res.send(sendData);
        }
      }
    );
  } else {
    sendData.isSuccess = "아이디와 비밀번호를 입력하세요!";
    res.send(sendData);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
