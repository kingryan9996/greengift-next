import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faPowerOff, faGift } from '@fortawesome/free-solid-svg-icons'
import { TeamC } from '../Context';
import styles from '@/styles/NavBar.module.css';
import axios from 'axios';

const NavBar = () => {


  const router = useRouter();
  const { userLogin } = useContext(TeamC);
  const [userBadge,setUserBadge] = useState(null);
  // console.log(router.isReady)
  // console.log(router)
  useEffect(()=>{
    axios.get('/api/gift',{params:{userLogin:userLogin.UserID}}).then(
      (res)=> {
        // console.log(res.data.filter(obj=>obj.state==1).length)
        setUserBadge(res.data.filter(obj=>obj.state==1).length)
        // console.log(userBadge)
      })
  },[userLogin])

  return (
    <div className={`${styles.navbar} ${(router.pathname === '/') ? styles.displayNone : ''}`}>      
        <Link
          className={`${styles.linkStyle} ${router.route == '/GiftTree/[id]' ? styles.activeLink : ''}`}
          href={`/GiftTree/${userLogin.UserID}`}
        >
          <div className={styles.giftLinkContent}>
            <FontAwesomeIcon style={{ width: 25, display:"block" }} icon={faGift} />            
          </div>
        </Link>
        <span className={styles.coin}>코인 : {Number(userLogin.Coin).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
        <Link
          className={`${styles.linkStyle} ${router.route == '/MyPage/[id]' ? styles.activeLink : ''}`}
          href={`/MyPage/${userLogin.UserID}`}
        >
          <div className={styles.userLinkContent}>
            <FontAwesomeIcon style={{ width: 25, display:"block" }} icon={faUser} />
            <span className={styles.userLinkContentBadge}>{userBadge?userBadge:""}</span>
          </div>
        </Link>
    </div>
  );
}

export default NavBar