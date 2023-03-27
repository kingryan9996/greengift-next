import { executeQuery } from './db';

export default function handler(req, res) {
  // DESC(내림차순), ASC(오름차순)
  const { method, body } = req;

  const selectUserData = async () => {
    try {
      let data = await executeQuery('select * from UserList order by UserID DESC', []);
      res.json(data)
    } catch (err) {
      res.send(err);
    }
  }

  const insertUserData = async () => {
    let { LoginID, LoginPW, NickName, Birth } = body;

    console.log(LoginID, LoginPW, NickName, Birth, '???')
    let data = await executeQuery(
      'insert into UserList ( LoginID, LoginPW, NickName, Birth ) values (?,?,?,?)',
      // 0 : true / 1 : false // true(1)면 선물완료니까 기본값으로 false(0)
      [LoginID, LoginPW, NickName, Birth]
    );
    res.json(data)
  }


  const updateUserData = async () => {
    let { Coin, UserID } = body;
    console.log(Coin, UserID, '코인수정 Put !!')

    let data = await executeQuery(
      'update UserList set Coin=? where UserID=?', [Coin, UserID]
    );
    res.json(data)
  }



  switch (method) {
    case "GET": selectUserData(); break;
    case "POST": insertUserData(); break;
    case "PUT": updateUserData(); break;
  }
}

//  #2.  method를 통해, 접속하는데 *(전체) from teamDbList(지정한 db파일이름)

///////////////////////////////////////////////








////////////////////////////////////////////////////