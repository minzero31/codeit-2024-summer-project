import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
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
    <>
      <div>
        <h1 id="homeh1">{userInfo.userName}님, 어서오세요.</h1>
      </div>
      <main className="homemain">
        <div className="para0">
          <p> </p>
        </div>
        <div className="para1">
          <section className="block1">
            <p>
              <img id="usrImg" src="images/home2_icon.png" alt="Home" />
              {userInfo.userName}회원님
            </p>
            <p>회원정보</p>
          </section>
        </div>
        <div className="para2">
          <section className="block2">
            <h3 id="block2h">
              Health
              <br />
              Care
              <br />
              News +
            </h3>
          </section>
          <section className="block3">
            <p id="b3txt">
              병원 찾기
              <img
                id="hosPic"
                src="images/hospital_icon.png"
                alt="pic of hospital icon"
              />
            </p>
          </section>
        </div>
        <div className="para3">
          <section className="block4">
            <h2 id="homeh2">
              오늘 어떤 약💊을
              <br />
              복용하셨습니까?
            </h2>
            <fieldset className="homefs">
              <div id="option">
                <input
                  type="checkbox"
                  id="med1"
                  name="복용약 종류"
                  value="1번 약(입력되는 값?)"
                />
                <label for="med1">약1</label>
              </div>
              <div id="option">
                <input
                  type="checkbox"
                  id="med2"
                  name="복용약 종류"
                  value="2번 약(입력되는 값?)"
                />
                <label for="med2">약2</label>
              </div>
              <div id="option">
                <input
                  type="checkbox"
                  id="med3"
                  name="복용약 종류"
                  value="3번 약(입력되는 값?)"
                />
                <label for="med3">약3</label>
              </div>
              <div id="option">
                <input
                  type="checkbox"
                  id="med4"
                  name="복용약 종류"
                  value="4번 약(입력되는 값?)"
                />
                <label for="med4">약4</label>
              </div>
              <div id="option">
                <input
                  type="checkbox"
                  id="med5"
                  name="복용약 종류"
                  value="5번 약(입력되는 값?)"
                />
                <label for="med5">약5</label>
              </div>
              <div id="option">
                <input
                  type="checkbox"
                  id="med6"
                  name="복용약 종류"
                  value="6번 약(입력되는 값?)"
                />
                <label for="med6">약6</label>
              </div>
            </fieldset>
            <button id="addMed">+ 복용 루틴 추가하기</button>
            <br />
            <button id="saveMed">저장하기</button>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
