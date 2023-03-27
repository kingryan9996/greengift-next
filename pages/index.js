import { Inter } from "@next/font/google";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { TeamC } from "./src/Context";
import { useState } from "react";
import { Translate } from "@mui/icons-material";

import styles from "@/styles/index.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { setUserLogin } = useContext(TeamC);
  const router = useRouter();

  function formLogin(e) {}
  const [modalOpen, setModalOpen] = useState(false);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const modalTransition = {
    type: "spring",
    stiffness: 200,
    damping: 20,
  };

  function formLogin(e) {
    e.preventDefault();
    if (e.target.id.value == "") {
      return alert("ID를 입력해주세요.");
    } else if (e.target.passwords.value == "") {
      return alert("PW를 입력해주세요.");
    }

    try {
      axios.get("/api", { LoginID: e.target.id.value }).then((res) => {
        let newValue = res?.data?.filter(
          (obj) => obj.LoginID == e.target.id.value
        );
        if (newValue.length === 0) {
          return alert("등록되지 않은 ID입니다.");
        } else if (newValue[0].LoginPW != e.target.passwords.value) {
          return alert("비밀번호를 확인해주세요.");
        } else if (newValue[0].LoginPW == e.target.passwords.value) {
          setUserLogin(newValue[0]);
          router.push(`/GiftTree/${newValue[0].UserID}`);
        }
      });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  function formSignUp(e) {
    e.preventDefault();
    console.log(e);
    console.log(
      e.target.signid.value,
      e.target.signpasswords.value,
      e.target.nickname.value,
      e.target.birthday.value
    );
    axios.post("/api", {
      LoginID: e.target.signid.value,
      LoginPW: e.target.signpasswords.value,
      NickName: e.target.nickname.value,
      Birth: e.target.birthday.value,
    });
    setModalOpen(!modalOpen);
  }

  return (
    <>
      <div className={styles.container}>
        {/* dddddddddddddd */}
        {/* <img
          src="./img/Balloon-removebg-preview.png"
          alt="image1"
          className={styles.image1}
        /> //////*/}
        <img
          src="/img/pinkSun-removebg-preview.png"
          alt="image2"
          className={styles.image2}
        />{" "}
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            소중한 사람에게
            <br />
            마음을 전해보세요 !
          </h1>
          <p className={styles.subtitle}>
            내가 받고싶은 선물을 위시리스트에 담아보세요
            <br />
            위시리스트를 공유하고, 선물을 주고받아보세요
          </p>
        </div>
        <div className={styles.formContainer}>
          <form method="post" onSubmit={formLogin}>
            <div className={styles.inputWrapper}>
              <Form.Control
                name="id"
                placeholder="아이디"
                type="text"
                className={styles.input}
              />
            </div>

            <div className={styles.inputWrapper}>
              <Form.Control
                type="password"
                placeholder="비밀번호"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                name="passwords"
                className={styles.input}
              />
            </div>

            <button className={styles.loginButton} type="submit">
              로그인
            </button>
          </form>

          <div className={styles.signupWrapper}>
            <span className={styles.signupText}>계정이 없으신가요?</span>
            <button
              className={styles.signupButton}
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            >
              회원가입
            </button>
          </div>
        </div>
        <div className={modalOpen ? styles.modal : styles.modalHidden}>
          <button
            className={styles.modalCloseButton}
            onClick={() => {
              setModalOpen(false);
            }}
          >
            X
          </button>

          <form onSubmit={formSignUp} className={styles.modalForm}>
            <div className={styles.modalInputWrapper}>
              <Form.Control placeholder="아이디" name="signid" type="text" />
            </div>

            <div className={styles.modalInputWrapper}>
              <Form.Control
                placeholder="비밀번호"
                name="signpasswords"
                type="password"
              />
            </div>

            <div className={styles.modalInputWrapper}>
              <Form.Control placeholder="생일" name="birthday" type="text" />
            </div>

            <div className={styles.modalInputWrapper}>
              <Form.Control placeholder="닉네임" name="nickname" type="text" />
            </div>

            <button className={styles.signupSubmitButton} type="submit">
              회원가입
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
