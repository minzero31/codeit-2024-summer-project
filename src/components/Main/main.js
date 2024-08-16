import React, { useEffect, useState } from "react";
import "./main.css";

const Main = () => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    userEmail: "",
    userBirth: "",
  });

  useEffect(() => {
    fetch("http://localhost:3001/userinfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      Credential: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLogin === "True") {
          const birthDate = new Date(data.userBirth);
          const year = birthDate.getFullYear();
          const month = String(birthDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
          const day = String(birthDate.getDate()).padStart(2, "0");

          const formattedDate = `${year}년 ${month}월 ${day}일`;

          setUserInfo({
            userName: data.userName,
            userEmail: data.userEmail,
            userBirth: formattedDate,
          });
        } else {
          alert("로그인 상태가 아닙니다");
          window.location.href = "/";
        }
      });
  }, []);

  return (
    <div className="main-container">
      <div className="info-wrapper">
        <h1>Welcome, {userInfo.userName}</h1>
        <div className="user-info">
          <div className="info-item">Email: {userInfo.userEmail}</div>
          <div className="info-item">Birth: {userInfo.userBirth}</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
