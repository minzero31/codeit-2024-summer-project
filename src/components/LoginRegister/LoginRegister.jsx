import React, { useState, useEffect } from "react";
import "./LoginRegister.css";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";

const LoginRegister = () => {
  const [action, setAction] = useState("");

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

  return (
    <div className={`wrapper${action}`}>
      {/*로그인*/}
      <div className="form-box login">
        <form action="">
          <h1>Login</h1>

          {/*아이디*/}
          <div className="input-box">
            <input type="text" placeholder="ID" required />
            <FaUser className="icon" />
          </div>

          {/*비밀번호*/}
          <div className="input-box">
            <input type="password" placeholder="Password" required />
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
        <form action="">
          <h1>Registration</h1>
          <div className="id_field">
            {/*이름*/}
            <div className="input-box">
              <input type="text" placeholder="Name" required />
              <MdDriveFileRenameOutline className="icon" />
            </div>

            {/*아이디*/}
            <div className="input-box">
              <input type="text" placeholder="ID" required />
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
            <input type="email" placeholder="Email" required />
            <FaEnvelope className="icon" />
          </div>

          {/*비밀번호*/}
          <div className="input-box">
            <input type="password" placeholder="Password" required />
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
