import React, { useState, useEffect } from "react";
import "./LoginRegister.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";

const LoginRegister = () => {
  const [action, setAction] = useState("");

  //상태관리
  const [userName, setUserName] = useState(""); //이름 상태 추가
  const [userID, setUserID] = useState(""); //아이디 상태 추가
  const [userEmail, setUserEmail] = useState(""); //메일 상태 추가
  const [userPassword, setUserPassword] = useState(""); //비밀번호 상태 추가

  const registerLink = () => {
    setAction(" active");
  };

  const loginLink = () => {
    setAction("");
  };

  //생년 데이터 : 년, 월, 일
  const BIRTH_YEAR_LIST = Array.from({ length: 90 }, (_, i) => `${i + 1938}년`);
  const BIRTH_MONTH_LIST = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
  const BIRTH_DAY_LIST = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);

  const handleLogin = () => {
    const userData = {
      userId: userId,
      userPassword: userPassword,
    };
    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.isLogin === "True") {
          alert("로그인 성공!");
        } else {
          alert("로그인 실패: " + json.isLogin);
        }
      });
  };

  //회원가입 함수
  const handleRegister = () => {
    const userData = {
      userName: userName,
      userID: userID,
      userEmail: userEmail,
      userPassword: userPassword,
      userBirth: `${document
        .getElementById("birth-year")
        .value.slice(0, -1)}-${String(
        document
          .getElementById("birth-month")
          .value.slice(0, -1)
          .padStart(2, "0") // '월' 단위 제거
      )}-${String(
        document.getElementById("birth-day").value.slice(0, -1).padStart(2, "0") // '일' 단위 제거
      )}`,
    };

    console.log(userData);

    fetch("http://localhost:3001/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.isSuccess === "True") {
          alert("회원가입이 완료되었습니다!");
          loginLink();
        } else {
          alert("회원가입 실패: " + json.isSuccess);
        }
      });
  };

  return (
    <div className={`wrapper${action}`}>
      {/*로그인*/}
      <div className="form-box login">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <h1>Login</h1>

          {/*아이디*/}
          <div className="input-box">
            <input
              type="text"
              placeholder="ID"
              required
              onChange={(event) => setUserID(event.target.value)}
            />
            <FaUser className="icon" />
          </div>

          {/*비밀번호*/}
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(event) => setUserPassword(event.target.value)}
            />
            <FaLock className="icon" />
          </div>

          {/*아이디 저장*/}
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          {/*로그인 버튼*/}
          <button type="submit">Login</button>

          {/*회원가입 하러 가기*/}
          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={registerLink}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>

      {/*회원가입*/}

      <div className="form-box register">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister(); //회원가입 함수 호출
          }}
        >
          <h1>Registration</h1>
          <div className="id_field">
            {/*이름*/}
            <div className="input-box">
              <input
                type="text"
                placeholder="Name"
                required
                onChange={(event) => setUserName(event.target.value)} //이름 상태 업데이트
              />
              <MdDriveFileRenameOutline className="icon" />
            </div>

            {/*아이디*/}
            <div className="input-box">
              <input
                type="text"
                placeholder="ID"
                required
                onChange={(event) => setUserID(event.target.value)} //id 상태 업데이트
              />
              <FaUser className="icon" />
              <div>
                <button type="button" id="id_check">
                  중복확인
                </button>
              </div>
            </div>
          </div>
          {/*이메일*/}
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(event) => setUserEmail(event.target.value)} //이메일 상태 업데이트
            />
            <FaEnvelope className="icon" />
          </div>

          {/*비밀번호*/}
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(event) => setUserPassword(event.target.value)} //비밀번호 상태 업데이트
            />
            <FaLock className="icon" />
          </div>

          {/*생년월일*/}
          <div className="info" id="info_birth">
            <select className="box" id="birth-year">
              {BIRTH_YEAR_LIST.map((year, index) => (
                <option key={index}>{year}</option>
              ))}
            </select>

            <select className="box" id="birth-month">
              {BIRTH_MONTH_LIST.map((month, index) => (
                <option key={index}>{month}</option>
              ))}
            </select>

            <select className="box" id="birth-day">
              {BIRTH_DAY_LIST.map((day, index) => (
                <option key={index}>{day}</option>
              ))}
            </select>
          </div>

          {/*개인정보 저장 동의*/}
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />I agree to the terms & conditions
            </label>
          </div>

          {/*회원가입 버튼*/}
          <button type="submit">Register</button>

          {/*로그인 하러 가기*/}
          <div className="register-link">
            <p>
              Already have an account?{" "}
              <a href="#" onClick={loginLink}>
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
