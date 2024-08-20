import React, { useEffect, useState } from "react";
import "./Home.css";
import { FaRegEnvelope } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdOutlineBloodtype } from "react-icons/md";
import { LuRuler } from "react-icons/lu";
import { MdOutlineMonitorWeight } from "react-icons/md";
import { TbBuildingHospital } from "react-icons/tb";
import { IoCallOutline } from "react-icons/io5";

const Home = () => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    userEmail: "",
    userBirth: "",
    bloodType: "",
    height: "",
    weight: "",
    disease: "",
    emergencyContact: "",
    profilePic: "",
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [profilePicFile, setProfilePicFile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/userinfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credential: "include",
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
            bloodType: data.bloodType || "",
            height: data.height || "",
            weight: data.weight || "",
            disease: data.disease || "",
            emergencyContact: data.emergencyContact || "",
            profilePic: data.profilePic || "images/home2_icon.png", // 기본 이미지 설정
          });
        } else {
          alert("로그인 상태가 아닙니다");
          window.location.href = "/";
        }
      });
  }, []);

  const openEditPopup = () => {
    setIsPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfilePicFile(e.target.files[0]); // 선택된 파일 저장
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let profilePicUpdated = false;
    let userInfoUpdated = false;

    // 비동기 요청을 동시에 수행하기 위한 배열
    const promises = [];

    // 파일 업로드
    if (profilePicFile) {
      const formData = new FormData();
      formData.append("profilePic", profilePicFile);

      fetch("http://localhost:3001/uploadProfilePic", {
        method: "POST",
        body: formData,
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("프로필 사진이 업데이트되었습니다.");
            setUserInfo((prevUserInfo) => ({
              ...prevUserInfo,
              profilePic: data.profilePicUrl, // 업데이트된 프로필 사진 URL 저장
            }));
            profilePicUpdated = true;
          } else {
            alert("프로필 사진 업로드에 실패했습니다.");
          }
        });
    } else {
      profilePicUpdated = true;
    }

    //다른 정보 업데이트
    fetch("http://localhost:3001/updateuserinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bloodType: userInfo.bloodType,
        height: userInfo.height,
        weight: userInfo.weight,
        disease: userInfo.disease,
        emergencyContact: userInfo.emergencyContact,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          userInfoUpdated = true;
        } else {
          alert("정보 업데이트에 실패했습니다.");
        }
      });

    // 모든 요청이 완료된 후 팝업창 닫기
    Promise.all(promises).finally(() => {
      closeEditPopup();
    });
  };

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
            <div className="profile-info">
              <img id="usrImg" src={userInfo.profilePic} alt="User Profile" />
              <h2>{userInfo.userName}회원님</h2>
            </div>

            <div className="userinfo_box">
              <p className="userinfo_text">
                <span>
                  <strong>
                    <FaRegEnvelope className="icon1" />
                  </strong>{" "}
                  {userInfo.userEmail}
                </span>
                <br />
                <span>
                  <strong>
                    <LiaBirthdayCakeSolid className="icon1" />
                  </strong>{" "}
                  {userInfo.userBirth}
                </span>
                <br />
                <span>
                  <strong>
                    <MdOutlineBloodtype className="icon1" />
                  </strong>{" "}
                  {userInfo.bloodType}형
                </span>
                <br />
                <span>
                  <strong>
                    <LuRuler className="icon1" />
                  </strong>{" "}
                  {userInfo.height}cm
                </span>
                <br />
                <span>
                  <strong>
                    <MdOutlineMonitorWeight className="icon1" />
                  </strong>{" "}
                  {userInfo.weight}kg
                </span>
                <br />
                <span>
                  <strong>
                    <TbBuildingHospital className="icon1" />
                  </strong>{" "}
                  {userInfo.disease}
                </span>
                <br />
                <span>
                  <strong>
                    <IoCallOutline className="icon1" />
                  </strong>{" "}
                  {userInfo.emergencyContact}
                </span>
                <br />
              </p>

              <p></p>
            </div>
            <button className="userinfo_edit" onClick={openEditPopup}>
              수정
            </button>
          </section>

          <div id="editPopup" className={`popup ${isPopupOpen ? "show" : ""}`}>
            <div className="popup_content">
              <span className="close_button" onClick={closeEditPopup}>
                &times;
              </span>

              <h2>정보 수정</h2>

              <form id="editForm" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email : </label>
                  <input
                    type="email"
                    id="email"
                    name="useremail"
                    value={userInfo.userEmail}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="birth">생년월일:</label>
                  <input
                    type="text"
                    id="birth"
                    name="userBirth"
                    value={userInfo.userBirth}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bloodType">혈액형:</label>
                  <input
                    type="text"
                    id="bloodType"
                    name="bloodType"
                    value={userInfo.bloodType}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="height">키:</label>
                  <input
                    type="text"
                    id="height"
                    name="height"
                    value={userInfo.height}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="weight">몸무게:</label>
                  <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={userInfo.weight}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="disease">질병:</label>
                  <input
                    type="text"
                    id="disease"
                    name="disease"
                    value={userInfo.disease}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emergencyContact">긴급 연락처:</label>
                  <input
                    type="text"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={userInfo.emergencyContact}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="profilePic">프로필 사진:</label>
                  <input
                    type="file"
                    id="profilePic"
                    name="profilePic"
                    onChange={handleFileChange}
                  />
                </div>
                <button type="submit" id="saveMed">
                  저장하기
                </button>
              </form>
            </div>
          </div>
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
                <label htmlFor="med1">약1</label>
              </div>
              <div id="option">
                <input
                  type="checkbox"
                  id="med2"
                  name="복용약 종류"
                  value="2번 약(입력되는 값?)"
                />
                <label htmlFor="med2">약2</label>
              </div>
              <div id="option">
                <input
                  type="checkbox"
                  id="med3"
                  name="복용약 종류"
                  value="3번 약(입력되는 값?)"
                />
                <label htmlFor="med3">약3</label>
              </div>
              <div id="option">
                <input
                  type="checkbox"
                  id="med4"
                  name="복용약 종류"
                  value="4번 약(입력되는 값?)"
                />
                <label htmlFor="med4">약4</label>
              </div>
              <div id="option">
                <input
                  type="checkbox"
                  id="med5"
                  name="복용약 종류"
                  value="5번 약(입력되는 값?)"
                />
                <label htmlFor="med5">약5</label>
              </div>
              <div id="option">
                <input
                  type="checkbox"
                  id="med6"
                  name="복용약 종류"
                  value="6번 약(입력되는 값?)"
                />
                <label htmlFor="med6">약6</label>
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
