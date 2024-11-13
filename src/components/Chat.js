import React, { useState } from "react";
import "./Chat.css";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const Chat = () => {
  const [prompt, setPrompt] = useState(""); // 사용자 입력 상태
  const [response, setResponse] = useState([]); // API 응답 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [selectedPrompt, setSelectedPrompt] = useState(null); // 선택된 프롬프트 상태

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const fetchResponse = async () => {
    setResponse((prevMessages) => [
      ...prevMessages,
      { sender: "사용자", text: prompt },
    ]);

    setLoading(true);
    try {
      const combinedPrompt = selectedPrompt + prompt;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: combinedPrompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `API 요청 실패: ${res.status} ${res.statusText} - ${errorText}`
        );
      }

      const data = await res.json();
      console.log("API 응답 데이터:", data);

      const extractedText =
        data.candidates &&
        data.candidates.length > 0 &&
        data.candidates[0].content &&
        data.candidates[0].content.parts.length > 0
          ? data.candidates[0].content.parts[0].text
          : "응답 데이터가 없습니다.";

      setResponse((prevMessages) => [
        ...prevMessages,
        { sender: "챗봇", text: extractedText },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setResponse((prevMessages) => [
        ...prevMessages,
        { sender: "챗봇", text: `오류가 발생했습니다: ${error.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt) {
      fetchResponse();
    } else {
      alert("질문을 입력하세요!");
    }
  };

  // 선택 박스가 클릭되면 해당 프롬프트를 설정하고 채팅 화면으로 전환
  const handleBoxClick = (prompt) => {
    setSelectedPrompt(prompt);
  };

  if (!selectedPrompt) {
    // 선택된 프롬프트가 없으면 선택 박스 화면을 보여줍니다.
    return (
      <main className="selection-screen">
        <div
          className="box"
          onClick={() =>
            handleBoxClick(
              " '당신의 건강 상태에 따른 병원을 추천해드립니다.' 라는 문구가 답변 맨 처음에 꼭 추가되도록 해주고, 답변은 3줄 이내로 해줘."
            )
          }
        >
          증상 별 병원 추천
        </div>
        <div
          className="box"
          onClick={() =>
            handleBoxClick(
              " '응급 처치 방법을 안내해드리겠습니다.' 라는 문구가 답변 맨 처음에 꼭 추가되도록 해주고, 답변은 3줄 이내로 해줘."
            )
          }
        >
          응급 처치 방법 안내
        </div>
        <div
          className="box"
          onClick={() =>
            handleBoxClick(
              " '약 복용 시 주의 식품에 안내해드리겠습니다.' 라는 문구가 답변의 맨 처음에 꼭 추가되도록 해주고, 답변은 3줄 이내로 해줘."
            )
          }
        >
          약 복용 시 주의 식품 안내
        </div>
      </main>
    );
  }

  // 선택된 프롬프트가 있으면 채팅 화면을 보여줍니다.
  return (
    <>
      <div>
        <h1 id="ch1">Chat 인공지능을 이용한 병원 추천 및 찾기</h1>
      </div>
      <main className="chatmain">
        <div className="p0">
          <p> </p>
        </div>
        <div className="p1">
          <section className="box1">
            <h2 id="ch2">채팅창</h2>
            <div className="chattingbox">
              {loading ? (
                <div>
                  {response.map((resp, index) => (
                    <p
                      className={
                        resp.sender === "사용자"
                          ? "user-messagebox"
                          : "bot-messagebox"
                      }
                      key={index}
                    >
                      <label
                        className={
                          resp.sender === "사용자"
                            ? "user-message"
                            : "bot-message"
                        }
                      >
                        {resp.text}
                      </label>
                    </p>
                  ))}
                  <p id="loadingp">로딩 중...</p>
                </div>
              ) : (
                <div>
                  {response.map((resp, index) => (
                    <p
                      className={
                        resp.sender === "사용자"
                          ? "user-messagebox"
                          : "bot-messagebox"
                      }
                      key={index}
                    >
                      <label
                        className={
                          resp.sender === "사용자"
                            ? "user-message"
                            : "bot-message"
                        }
                      >
                        {resp.text}
                      </label>
                    </p>
                  ))}
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={prompt}
                onChange={handleInputChange}
                placeholder="질문을 입력해주세요!"
              />
              <button type="submit">SEND</button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
};

export default Chat;
