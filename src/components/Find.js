import React from 'react';
import './Find.css';

const Find = () => {
  return (
    <>
      <div>
        <h1 id='fh1'>Find 가까운 병원 찾기</h1>
      </div>
      <main className='findmain'>
        <div className='pa0'>
          <p> </p>
        </div>
        <div className='pa1'>
          <section className='blk1'>
            <h2 id='fh2'>구글 지도 연결 </h2>
            <iframe id='findmap' src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d25366.06479783992!2d127.107072!3d37.3719003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sko!2skr!4v1722856197052!5m2!1sko!2skr"></iframe>
          
          </section>
        </div>
        <div className='pa2'>
          <section className='blk2'>
            <p>구글 지도 검색 결과 조회</p>
          </section>
        </div>
      </main>  
    </>
  );
};

export default Find;
