import React from 'react';
import './Schedule.css'

const Schedule = () => {
  return (
    <>
      <div>
        <h1 id='schh1'>Schedule 진단 기록 및 약 복용 기록</h1>
      </div>
      <main className='schmain'>
        <div className='par0'>
          <p> </p>
        </div>
        <div className='par1'>
          <section className='blck1'>
            <h2 id='schh2'> </h2>
            <img src='images/sampleimage_cal.avif' alt='달력샘플이미지'/>
          </section>
        </div>
        <div className='par2'>
          <section className='blck2'>
            <h2 id='schh2'>진료 기록</h2>
            <fieldset className='schsec1'>
              <label>
                병원명
              </label>
            </fieldset>
            <fieldset className='schsec2'>
              <label></label>
            </fieldset>
            <button id="schsavebtn">저장하기</button>

          </section>
        </div>
      </main>
    </>
  );
};

export default Schedule;
