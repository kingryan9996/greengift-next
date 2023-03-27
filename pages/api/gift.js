import { executeQuery } from './db';

export default function handler(req, res) {
    // DESC(내림차순), ASC(오름차순)
    const { method, body, query } = req;
    console.log(method)

    const selectGiftData = async () => {
        let { userLogin } = query;
        console.log(userLogin, '선물조회 get!!')

        let data = await executeQuery(
            'select * from GiftList where UserID=? order by UserID DESC', [userLogin]
        );
        res.json(data)

        // try {
        //     let data = await executeQuery("select * from GiftList where UserID=LoginUserID order by UserID DESC", [LoginUserID]);
        //     res.json(data)
        // } catch (err) {
        //     res.send(err);
        // }
    }

    const insertGiftData = async () => {
        let { UserID, UserName, title, image, price, state } = body;

        let data = await executeQuery(
            'insert into GiftList (UserID, UserName, title, image, price, state) values (?,?,?,?,?,?)',
            [UserID, UserName, title, image, price, state]
        );
        res.json(data)
    }

    const dataUpdate = async () => {
        let { GiverID, GiverName, ItemID } = body;
        console.log(ItemID, "2", GiverID, GiverName, '선물수정 Put !!')

        let data = await executeQuery(
            'update GiftList set state=1, GiverID=?, GiverName=? where id=?', [GiverID, GiverName, ItemID]
        );
        res.json(data)
    }

    const dataDelete = async () => {
        let { ItemID } = query;
        console.log(ItemID, '선물삭제 Del !!')

        let data = await executeQuery(
            'delete from GiftList where id=?', [ItemID]
        );
        res.json(data)
    }

    switch (method) {
        case "GET": selectGiftData(); break;
        case "POST": insertGiftData(); break;
        case 'PUT': dataUpdate(); break;
        case 'DELETE': dataDelete(); break;
    }
}

//  #2.  method를 통해, 접속하는데 *(전체) from teamDbList(지정한 db파일이름)

///////////////////////////////////////////////

////////////////////////////////////////////////////