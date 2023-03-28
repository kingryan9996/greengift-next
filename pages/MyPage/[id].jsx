import axios from 'axios';
import React,{useContext, useEffect, useRef, useState} from 'react'
import NavBar from '../src/component/NavBar'
import { TeamC } from '../src/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router';

const MyRouteCom = () => {
    const maxLength = 25;
    const [giftVisible,setGiftVisible] = useState(false);
    const [giveData,setGiveData] = useState();
    const [takeData,setTakeData] = useState();
    const {userLogin, setUserLogin} = useContext(TeamC);
    const router = useRouter();


    useEffect(()=>{
      axios.get('/api/gift',{params:{userLogin:userLogin.UserID}}).then(res=>{setTakeData(res.data.filter(obj=>obj.state==1));console.log(res.data.filter(obj=>obj.state==1))})
      ///////////////////
      axios.get('/api/givepost',{params:{userLogin:userLogin.UserID}}).then(res=>{setGiveData(res.data);console.log(res.data)})

       if (userLogin == false) {
        router.push('/')
    }
    },[userLogin])

   

    return (
    <div style={{width: "100%", height: "100%", position: "relative",overflow:"scroll"}}>
      {/* <div style={{position:"fixed",top:"48%",left:"50%",transform:"translate(-50%,-50%)",zIndex:0,background:"rgba(255,255,255,0.6)",width:"100%", maxWidth: "600px" ,height:"90vh",borderRadius:"24px",boxShadow:"0 2px 2px"}}> */}

        <div style={{position:"fixed",top:0,left:"50%",width:"100%",height:250,paddingTop:"30px",minWidth:"300px",maxWidth:"600px", transform: "translateX(-50%)",backgroundColor:"#DFD7EC",zIndex:99}}>
        <div style={{position: "absolute", right: "20px", top: "20px"}}>
          <button style={{display: "block",  margin: 0, border: "none", backgroundColor: "transparent"}} onClick={()=>{setUserLogin(false)}}><FontAwesomeIcon icon={faPowerOff} style={{width: "25px"}} /></button>
        </div>

        <div style={{width: "90%", margin: "0 auto 15px"}}>
          <div>
            <p style={{display: "block", width:100, height:100, margin: "0 auto", borderRadius: "50%",boxShadow: "0px 4px 10px 2px #ccc", border: "8px solid #fff"}}>
              <img style={{width: "100%", height: "100%", borderRadius: "50%"}} src={`/img/Profile${(userLogin.UserID%10)+1}.jpg`}/>
            </p>
            <p style={{marginTop: "20px", textAlign: "center", fontSize: "1.5rem"}}>{userLogin?.NickName}</p>
          </div>
        </div>
        
        <div style={{display: "flex", justifyContent: "center", width: "90%",marginBottom: "10px"}}>
          <button onClick={()=>{setGiftVisible(false)}} style={{ backgroundColor: (giftVisible == false)? "#219bc3" : "#b2d3e1", display: "block", width: "50%", border: "none", margin: 0, padding: "14px 0", borderRadius: "10px 0 0 10px", borderRight: "1px solid #219bc3", fontSize:"1rem"}} >받은 선물</button>
          <button onClick={()=>{setGiftVisible(true)}} style={{ backgroundColor: (giftVisible == true)? "#219bc3" : "#b2d3e1", display: "block", width: "50%", border: "none", margin: 0, padding: "14px 0", borderRadius: "0 10px 10px 0",fontSize:"1rem"}} >보낸 선물</button>
        </div>
        </div>



        <div style={{display:giftVisible?"none":"block",width:"100%", margin:"255px 0 65px"}}>
          <ul style={{display: "flex", flexDirection: "column", width: "90%", borderRadius: "10px", backgroundColor: "#fff",listStyle: "none", boxShadow: "0px 4px 10px 2px #ccc", border: "8px solid #fff"}}>
            {
              takeData?.length>0 && takeData.map((obj,idx )=>{
                return <li key={idx} style={{width: "100%",borderBottom:idx==takeData.length-1?"none":"1px solid rgba(0,0,0,0.05)",padding:"5px 0"}}> 
                        <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center",width: "100%" ,padding: "0 5%"}}>
                          <img src={obj.image} alt="gift" style={{display: "block", width: "70px", height: "70px", margin: 0, borderRadius: "50%", backgroundColor: "orange"}}/>
                          <div style={{width: "calc(100% - 70px)", margin: 0, paddingLeft: "20px"}}>
                            <p style={{width: "100%", fontSize: "14px",overflow: "hidden" ,textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{obj.title.replaceAll("<b>","").replaceAll("</b>","")}</p>
                            <p style={{margin: "7px 0", fontSize: "12px"}}>{Number(obj.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                            <p style={{fontSize: "12px"}}>{obj.GiverName}에게 받음</p>
                          </div>
                        </div>
                      </li>
              })
            }

          </ul>
        </div>
        {/* 받은 선물 */}

        <div style={{display:giftVisible?"block":"none", width:"100%", margin:"255px 0 65px"}}>
        <ul style={{display: "flex", flexDirection: "column", width: "90%", borderRadius: "10px", backgroundColor: "#fff",listStyle: "none", boxShadow: "0px 4px 10px 2px #ccc", border: "8px solid #fff"}}>
            {
              giveData && giveData.map((obj,idx )=>{
                return <li key={idx} style={{width: "100%",borderBottom:idx==giveData.length-1?"none":"1px solid rgba(0,0,0,0.05)",padding:"5px 0"}}>
                      <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center",width: "100%" ,padding: "0 5%"}}>
                        <img src={obj.image} alt="gift" style={{display: "block", width: "70px", height: "70px", margin: 0, borderRadius: "50%", backgroundColor: "orange"}}/>
                        <div style={{width: "calc(100% - 70px)", margin: 0, paddingLeft: "20px"}}>
                          <p style={{width: "100%", fontSize: "14px",overflow: "hidden" ,textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{obj.title.replaceAll("<b>","").replaceAll("</b>","").substr(0, maxLength)}</p>
                          <p style={{margin: "7px 0", fontSize: "12px"}}>{Number(obj.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                          <p style={{fontSize: "12px"}}>{obj.UserName}에게 보냄</p>
                        </div>
                      </div>
                    </li>
              })
            }

          </ul>
        </div>

        {/* 보낸 선물 */}
        {/* </div> */}
    </div>
  )
}

export default MyRouteCom