import React from 'react';
import './Test.css';

const Test = () => {
  return (
    <>
      <div>
        <h1 id='testh1'>Test 우울증 및 ADHD 자가진단</h1>
      </div>
      <main className='testmain'>
        <div className='part0'>
          <p> </p>
        </div>
        <div className='part1'>
          <section className='bone'>
            <a href="https://scienceon.kisti.re.kr/commons/util/originalView.do?cn=JAKO201170764946792&oCn=JAKO201170764946792&dbt=JAKO&journal=NJOU00291982" target="_blank" rel="noopener noreferrer"><h2 id='testh2'>우울증 자가진단<br/>하러가기</h2>
            <img id='test_arrow' src="images/arrow.png" alt="Arrow" /></a>
          </section>
        </div>
        <div className='part2'>
          <section className='btwo'>
            <a href="https://www.haneumnetwork.co.kr/m/diagnosis/adhd.php" target="_blank" rel="noopener noreferrer"><h2 id='testh2'>ADHD 자가진단<br/>하러가기</h2>
            <img id='test_arrow' src="images/arrow.png" alt="Arrow" /></a>
          </section>
        </div>
        <div className='part3'>
          <p> </p>
        </div>
      </main>
    </>
  );
};

export default Test;
