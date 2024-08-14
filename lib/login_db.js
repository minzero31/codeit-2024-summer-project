var mysql = require("mysql2");
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "hyeonseo0457",
  database: "health_codeit",
});

// 데이터베이스 연결 시도
db.connect((err) => {
  if (err) {
    console.error("데이터베이스 연결 오류: ", err);
    return;
  }
  console.log("데이터베이스에 연결되었습니다.");
});

module.exports = db;
