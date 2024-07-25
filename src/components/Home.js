import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <>
        <div>
          <h1>00님, 어서오세요.</h1>
        </div>
        <main>
            <div className='para0'>
                <p> </p>
            </div>
            <div className='para1'>
                <section className='block1'>
                    <p><img id='usrImg' src="images/home2_icon.png" alt="Home" />00회원님</p>
                    <p>회원정보</p>

                </section>
            </div>
            <div className='para2'>
                <section className='block2'>
                    <p>news</p>
                </section>
                <section className='block3'>
                    <p id='b3txt'>병원 찾기<img id='hosPic' src='images/hospital_icon.png' alt='pic of hospital icon'/></p>
                </section>
            </div>
            <div className='para3'>
                <section className='block4'>
                    <h2>오늘 어떤 약을<br/>복용하셨습니까?</h2>
                    <fieldset>
                        <legend></legend>
                        <div>
                            <input type='checkbox' id='med1' name='복용약 종류' value='1번 약(입력되는 값?)' />
                            <label for='med1'>약1번</label>
                        </div>
                        <div>
                            <input type='checkbox' id='med2' name='복용약 종류' value='2번 약(입력되는 값?)' />
                            <label for='med2'>약2번</label>
                        </div>
                        <div>
                            <input type='checkbox' id='med3' name='복용약 종류' value='3번 약(입력되는 값?)' />
                            <label for='med3'>약3번</label>
                        </div>
                    </fieldset>
                    <button>+ 복용 루틴 추가하기</button>
                    <br />
                    <button>저장하기</button>
                </section>
            </div>
        </main>
    </>
  );
};

export default Home;