import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios';
import { useContext } from 'react';
import { TeamC } from '../src/Context';
import ProductList from '../src/component/ProductList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';
import styles from "@/styles/id.module.css";
import { motion } from "framer-motion";

const GiftRouteCom = () => {

  const router = useRouter();
  const { userLogin, setUserLogin } = useContext(TeamC)

  const [inputVisible, setInputVisible] = useState(false);
  const searchInput = useRef();

  // 인풋창 표시 상태를 변경하는 함수를 작성하세요./////////
  //
  const toggleInput = () => {
    setInputVisible(!inputVisible);
  };


  const [visible, setVisible] = useState(false);

  const [friendList, setFriendList] = useState();

  async function dataGet() {
    axios.get('/api').then((res)=>{
      setFriendList(res.data.filter(obj=>obj.UserID!=userLogin.UserID))
    })
  }
  let nameMatch = friendList?.filter(obj=>obj.UserID==router.query.id)

  useEffect(() => {
    dataGet();
  }, [])

  useEffect(()=>{
   
     if (userLogin == false) {
      router.push('/')  }
  },[userLogin])
  console.log(router.query.id)

  return (
    <div className={styles.container}>      
        <div className={styles.contentWrapper}>
          <div className={styles.flexContainer}>
            <ul className={styles.ulStyle}>
              {friendList?.map((obj, idx) => {
                return (
                  <li
                    onClick={() => {
                    }}
                    key={idx}
                    className={styles.liStyle}
                  >
                    <Link href={`/GiftTree/${obj.UserID}`}>
                      <figure>
                        <img
                          className={styles.imgStyle}
                          src={`/img/Profile${(obj.UserID%10)+1}.jpg`}
                          style={{filter:router.query.id==obj.UserID?"grayscale(0%)":"grayscale(100%)"
                        }}
                        />
                        <figcaption>
                          <strong style={{ fontSize: '13px' }}>{obj.NickName}</strong>
                        </figcaption>
                      </figure>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className={styles.searchWrap}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(searchInput.current.value);
                  axios.get('/api').then((res) => {
                    let newValue = res.data.filter((obj) => obj.NickName == searchInput.current.value);
                    console.log(newValue[0]?.NickName, '서치결과');
                    if(newValue[0]?.NickName==undefined){return alert('등록되지 않은 유저입니다.')}
                    router.push(`/GiftTree/${newValue[0]?.UserID}`)
                    toggleInput();
                    searchInput.current.value="";
                    // alert(newValue[0]?.NickName + '님이 검색되었습니다.');
                  });
                }}
                className={styles.searchForm}
              > 

           
                <motion.input
                  ref={searchInput}
                  className={`${styles.searchInput} ${inputVisible ? styles.showInput : styles.hideInput}`}
                  placeholder='친구 검색'
                  style={{
                    width: "98%",
                    height: "34px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    margin: "5px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    background: "rgba(255, 255, 255, 0.5)",
                    outline: "none",
                    padding:"10px"
                  }}
                  initial={{ opacity: 0, x: '20px' }}
                  animate={{ opacity: inputVisible ? 1 : 0, x: inputVisible ? '0px' : '10px' }}
                  transition={{ duration: 0.2 }}
                />

                <button onClick={toggleInput} className={styles.buttonStyle} type='button'>
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{ width: '25px' }} />
                </button>
              </form>
            </div>
          </div>
                  <div style={{marginTop:85}}><h2 style={{fontSize:"1.75rem",textAlign:"center",margin:"0 auto 10px"}}>{nameMatch?.length==0?userLogin.NickName:nameMatch?.[0].NickName}님의 위시리스트</h2></div>
          <ProductList visible={visible} setVisible={setVisible} />

        </div>
      


    </div>
  );
}

export default GiftRouteCom






