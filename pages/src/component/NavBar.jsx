import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faPowerOff, faGift } from '@fortawesome/free-solid-svg-icons'
import { TeamC } from '../Context';
import styles from '@/styles/NavBar.module.css';

const NavBar = () => {


  const router = useRouter();
  const { userLogin } = useContext(TeamC);

  return (
    <div className={`${styles.navbar} ${(router.pathname === '/') ? styles.displayNone : ''}`}>      
        <Link
          className={`${styles.linkStyle} ${router.route == '/GiftTree/[id]' ? styles.activeLink : ''}`}
          href={`/GiftTree/${userLogin.UserID}`}
        >
          <div className={styles.linkContent}>
            <FontAwesomeIcon style={{ width: 25, display:"block" }} icon={faGift} />
            <p style={{paddingTop: "7px"}}>마이홈</p>
          </div>
        </Link>
        <span className={styles.coin}>코인 : {Number(userLogin.Coin).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        <Link
          className={`${styles.linkStyle} ${router.route == '/MyPage/[id]' ? styles.activeLink : ''}`}
          href={`/MyPage/${userLogin.UserID}`}
        >
          <div className={styles.linkContent}>
            <FontAwesomeIcon style={{ width: 20, display:"block" }} icon={faUser} />
            <p style={{paddingTop: "7px"}}>내정보</p>
          </div>
        </Link>
    </div>
  );
}

export default NavBar