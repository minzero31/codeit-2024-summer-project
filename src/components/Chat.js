import React, { useState } from 'react';

// 환경 변수에서 API 키를 가져옵니다.
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const Chat = () => {
  const [prompt, setPrompt] = useState(''); // 사용자 입력 상태
  const [response, setResponse] = useState(''); // API 응답 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 입력 필드의 변화 감지
  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  // API 호출 함수
  const fetchResponse = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API 요청 실패: ${res.status} ${res.statusText} - ${errorText}`);
      }

      const data = await res.json();
      console.log('API 응답 데이터:', data); // 전체 응답 데이터 출력 (콘솔에서 확인)

      // 응답 데이터에서 text 추출
      const extractedText = data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts.length > 0
        ? data.candidates[0].content.parts[0].text
        : '응답 데이터가 없습니다.';

      setResponse(extractedText);
    } catch (error) {
      console.error('Error:', error);
      setResponse(`오류가 발생했습니다: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt) {
      fetchResponse();
    } else {
      alert('질문을 입력하세요!');
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <p>인공지능을 이용한 병원 추천 및 찾기</p>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={prompt} 
          onChange={handleInputChange} 
          placeholder="질문을 입력하세요" 
        />
        <button type="submit">전송</button>
      </form>

      {loading ? <p>로딩 중...</p> : <p>응답: {response}</p>}
    </div>
  );
};

export default Chat;
