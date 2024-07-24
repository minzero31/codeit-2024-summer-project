import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <>
        <div>
          <h1>00님, 어서오세요.</h1>
          <p>메인 페이지</p>
        </div>
        <main>
            <div className='para0'>
                <p> </p>
            </div>
            <div className='para1'>
                <section className='block1'>
                    <p><img id='usrImg' src="images/home2_icon.png" alt="Home" /></p>
                </section>
            </div>
            <div className='para2'>
                <section className='block2'>
                    블럭 2
                </section>
                <section className='block3'>
                    블럭 3
                </section>
            </div>
            <div className='para3'>
                <section className='block4'>블럭 4</section>
            </div>
        </main>
    </>
  );
};

export default Home;