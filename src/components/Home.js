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
                    <p><img id='usrImg' src="images/home2_icon.png" alt="Home" />회원정보</p>
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
                <section className='block4'><p>block4</p></section>
            </div>
        </main>
    </>
  );
};

export default Home;