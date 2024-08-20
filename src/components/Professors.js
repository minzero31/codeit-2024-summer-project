import React from 'react';
import './Professors.css';

const Professors = () => {
  return (
    <>
      <div>
        <h1 id='profh1'>Professors 분야 별 유명한 교수님 리스트</h1>
      </div>
      <main className='profmain'>
        <div className='p_zero'>
          <p> </p>
        </div>
        <div className='p_one'>
          <div className='prof_article'>
            <a href="https://www.amc.seoul.kr/asan/staff/base/staffBaseInfoDetail.do?drEmpId=eWlUUFM5T3ZFSWlHbm1BeXVnS25BUT09&searchHpCd=D150" target="_blank" rel="noopener noreferrer">
              <h3 className='p_name'>이승규 교수</h3>
              <div className='prof_struct'>
                <img className='p_img' src="images/profs/prof1.jpg" alt="Prof_1" />
                <div className='list1'>
                  <label id='list_col'>근무병원</label>
                  <label id='list_col'>전문분야</label>
                  <label id='list_col'>진료과</label>
                  <label id='list_col'>학력</label>
                  <label id='list_col'>경력</label>
                </div>
                <div className='list2'>
                  <label id='list_text'>서울아산병원</label>
                  <label id='list_text'>간이식, 간암절제</label>
                  <label id='list_text'>간이식ㆍ간담도외과 .. 등</label>
                  <label id='list_text'>서울대학교 의학 박사</label>
                  <label id='list_text'>울산의대 서울아산병원 석좌교수</label>
                </div>
              </div>
            </a>
          </div>
          <div className='prof_article'>
            <a href="https://gs.severance.healthcare/gs/doctor/doctor-view.do?empNo=eXVoczIwMjBAKUApM9wei10mFPh%2BVa3NDRNJNfudJ1GDusFpAm9t676XHCE%3D" target="_blank" rel="noopener noreferrer">
              <h3 className='p_name'>노승훈 교수</h3>
              <div className='prof_struct'>
                <img className='p_img' src="images/profs/prof2.jpg" alt="Prof_2" />
                <div className='list1'>
                  <label id='list_col'>근무병원</label>
                  <label id='list_col'>전문분야</label>
                  <label id='list_col'>진료과</label>
                  <label id='list_col'>학력</label>
                  <label id='list_col'>경력</label>
                </div>
                <div className='list2'>
                  <label id='list_text'>강남세브란스병원</label>
                  <label id='list_text'>[위장관외과] 위암</label>
                  <label id='list_text'>위장관외과</label>
                  <label id='list_text'>고려대학교 의학과 박사</label>
                  <label id='list_text'>연세대학교 의과대학 외과 교수</label>
                </div>
              </div>
            </a>
          </div>
          <div className='prof_article'>
            <a href="http://inshineskin.com/doctors" target="_blank" rel="noopener noreferrer">
              <h3 className='p_name'>윤재일 교수</h3>
              <div className='prof_struct'>
                <img className='p_img' src="images/profs/prof3.jpg" alt="Prof_3" />
                <div className='list1'>
                  <label id='list_col'>근무병원</label>
                  <label id='list_col'>전문분야</label>
                  <label id='list_col'>진료과</label>
                  <label id='list_col'>학력</label>
                  <label id='list_col'>경력</label>
                </div>
                <div className='list2'>
                  <label id='list_text'>인샤인피부과의원</label>
                  <label id='list_text'>피부과, 건선</label>
                  <label id='list_text'>피부과</label>
                  <label id='list_text'>서울대의대, 대학원 졸, 의학박사</label>
                  <label id='list_text'>서울대 의과대 피부과 명예교수</label>
                </div>
              </div>
            </a>
          </div>
          <div className='prof_article'>
            <a href="http://www.du-son.com/?idx=intro/ct_5b58367aca94d" target="_blank" rel="noopener noreferrer">
              <h3 className='p_name'>황종익 교수</h3>
              <div className='prof_struct'>
                <img className='p_img' src="images/profs/prof4.png" alt="Prof_4" />
                <div className='list1'>
                  <label id='list_col'>근무병원</label>
                  <label id='list_col'>전문분야</label>
                  <label id='list_col'>진료과</label>
                  <label id='list_col'>학력</label>
                  <label id='list_col'>경력</label>
                </div>
                <div className='list2'>
                  <label id='list_text'>안산 두손병원</label>
                  <label id='list_text'>수족지 접합, 손저림증, 골절 등</label>
                  <label id='list_text'>성형외과, 수부외과</label>
                  <label id='list_text'>고려대 대학원 성형외과학 박사</label>
                  <label id='list_text'>고려대 의대 외래교수</label>
                </div>
              </div>
            </a>
          </div>
          <div className='prof_article'>
            <a href="https://www.snubh.org/medical/drIntroduce.do?DP_CD=NS&sDrSid=1000114" target="_blank" rel="noopener noreferrer">
              <h3 className='p_name'>오창완 교수</h3>
              <div className='prof_struct'>
                <img className='p_img' src="images/profs/prof5.png" alt="Prof_5" />
                <div className='list1'>
                  <label id='list_col'>근무병원</label>
                  <label id='list_col'>전문분야</label>
                  <label id='list_col'>진료과</label>
                  <label id='list_col'>학력</label>
                  <label id='list_col'>경력</label>
                </div>
                <div className='list2'>
                  <label id='list_text'>분당 서울대학교병원</label>
                  <label id='list_text'>뇌동맥류ㆍ뇌혈관 및 감마나이프</label>
                  <label id='list_text'>신경외과</label>
                  <label id='list_text'>서울대학교 의학대학원 박사</label>
                  <label id='list_text'>분당서울대병원 신경외과 교수</label>
                </div>
              </div>
            </a>
          </div>
          <div className='prof_article'>
            <a href="https://www.schmc.ac.kr/seoul/doctr/home.do?key=1605&doctrNo=665" target="_blank" rel="noopener noreferrer">
              <h3 className='p_name'>오효표 교수</h3>
              <div className='prof_struct'>
                <img className='p_img' src="images/profs/prof6.jpeg" alt="Prof_6" />
                <div className='list1'>
                  <label id='list_col'>근무병원</label>
                  <label id='list_col'>전문분야</label>
                  <label id='list_col'>진료과</label>
                  <label id='list_col'>학력</label>
                  <label id='list_col'>경력</label>
                </div>
                <div className='list2'>
                  <label id='list_text'>순천향대학교 서울병원</label>
                  <label id='list_text'>부인암, 복강경수술, 부인종양 등</label>
                  <label id='list_text'>산부인과</label>
                  <label id='list_text'>서울대학교 의학사</label>
                  <label id='list_text'>건국대 산부인과 임상 자문교수</label>
                </div>
              </div>
            </a>
          </div>
          <div className='prof_article'>
            <a href="https://www.ncc.re.kr/ncc_about03_param.ncc?searchKey=&searchValue=&dept=#" target="_blank" rel="noopener noreferrer">
              <h3 className='p_name'>이종호 교수</h3>
              <div className='prof_struct'>
                <img className='p_img' src="images/profs/prof7.jpeg" alt="Prof_7" />
                <div className='list1'>
                  <label id='list_col'>근무병원</label>
                  <label id='list_col'>전문분야</label>
                  <label id='list_col'>진료과</label>
                  <label id='list_col'>학력</label>
                  <label id='list_col'>경력</label>
                </div>
                <div className='list2'>
                  <label id='list_text'>국립암센터</label>
                  <label id='list_text'>구강암, 설암, 구강악안면재건</label>
                  <label id='list_text'>구강종양클리닉</label>
                  <label id='list_text'>서울대 대학원 치의학과 박사</label>
                  <label id='list_text'>서울대학병원 원내생진료센터장</label>
                </div>
              </div>
            </a>
          </div>
          <a href="https://gemmaleaders.com/bbs/board.php?bo_table=GL_free&wr_id=294897&reid=popoujin516" target="_blank" rel="noopener noreferrer">
            <div className='more_info'>
              + MORE INFO.
            </div>
          </a>
        </div>
      </main>
    </>
  );
};

export default Professors;
