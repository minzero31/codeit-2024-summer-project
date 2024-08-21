import React from 'react';
import './Home.css';

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
  const [isAddPillPopupOpen, setIsAddPillPopupOpen] = useState(false);
  const [profilePicFile, setProfilePicFile] = useState(null);

  //나중에 필요시 삭제
  const [pillOptions, setPillOptions] = useState([]);
  const [selectedPills, setSelectedPills] = useState([]);
  const [dosageDays, setDosageDays] = useState({
    Monday: "X",
    Tuesday: "X",
    Wednesday: "X",
    Thursday: "X",
    Friday: "X",
    Saturday: "X",
    Sunday: "X",
  });

  const userID = "exampleUserID";

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

    fetch("http://localhost:3001/getpillOptions")
      .then((res) => res.json())
      .then((data) => {
        setPillOptions(data.pills);
      })
      .catch((error) => {
        console.error("Fetch Error: ", error);
      });
  }, []);

  const handlePillChange = (e) => {
    setSelectedPills(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
    selectedPills(selectedOption);
  };

  const openEditPopup = () => {
    setIsPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsPopupOpen(false);
  };

  const openAddPillPopup = () => {
    setIsAddPillPopupOpen(true);
  };

  const closeAddPillPopup = () => {
    setIsAddPillPopupOpen(false);
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

  const handleDosageDayChange = (day) => {
    setDosageDays((prevDosageDays) => ({
      ...prevDosageDays,
      [day]: prevDosageDays[day] === "X" ? "O" : "X",
    }));
  };

  const handleAddPillSubmit = (e) => {
    e.preventDefault();

    const selectedDays = Object.keys(dosageDays).filter(
      (day) => dosageDays[day] === "O"
    );

    fetch("http://localhost:3001/addPillRoutine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pills: selectedPills, // pillName이 포함된 배열
        dosageDays: selectedDays,
      }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("약 복용 루틴이 추가되었습니다.");
          closeAddPillPopup();
        } else {
          alert("약 복용 루틴 추가에 실패했습니다.");
        }
      })
      .catch((error) => console.error("Fetch error:", error));
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
            <div className='para2'>
                <section className='block2'>
                    <h3 id='block2h'>Health<br/>Care<br/>News +</h3>
                </section>
                <section className='block3'>
                    <p id='b3txt'>병원 찾기<img id='hosPic' src='images/hospital_icon.png' alt='pic of hospital icon'/></p>
                </section>
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
              {pillOptions.length > 0 ? (
                pillOptions.map((pill) => (
                  <div id="option" key={pill.id}>
                    <input
                      type="checkbox"
                      id={`pill-${pill.id}`}
                      name="pills"
                      value={pill.name}
                      checked
                      readOnly
                    />
                    <label htmlFor={`pill-${pill.id}`}>{pill.name}</label>
                  </div>
                ))
              ) : (
                <p>복용 중인 약이 없습니다.</p>
              )}
            </fieldset>
            <button id="addMed" onClick={openAddPillPopup}>
              + 복용 루틴 추가하기
            </button>
            <br />
            <button id="saveMed">저장하기</button>
          </section>
          <div
            id="addPillPopup"
            className={`popup ${isAddPillPopupOpen ? "show" : ""}`}
          >
            <div className="pill_popup">
              <span className="close_button" onClick={closeAddPillPopup}>
                &times;
              </span>

              <h2>복용 루틴 추가</h2>
              <form id="addPillForm" onSubmit={handleAddPillSubmit}>
                <label>
                  <select onChange={handlePillChange}>
                    {pillOptions.map((pill) => (
                      <option key={pill.id} value={pill.name}>
                        {pill.name}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="dosage-days">
                  {Object.keys(dosageDays).map((day) => (
                    <label key={day}>
                      <input
                        type="checkbox"
                        checked={dosageDays[day] === "O"}
                        onChange={() => handleDosageDayChange(day)}
                      />
                      {day}
                    </label>
                  ))}
                </div>

                <button className="pill_btn" type="submit">
                  저장하기
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
