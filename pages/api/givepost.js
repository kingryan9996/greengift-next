import { executeQuery } from './db';

export default function handler(req, res) {
    // DESC(내림차순), ASC(오름차순)
    const { method, body, query } = req;
    console.log(method)

    const selectGiftData = async () => {
        let { userLogin } = query;
        console.log(userLogin, '선물조회 get!!')

        let takeData = await executeQuery(
            'select * from GiftList where state=1 and GiverID=? order by UserID DESC',
            [userLogin]
        );
        res.json(takeData)

        // let giveData = await executeQuery(
        //     'select * from GiftList where GiverID=? and state=1 order by UserID DESC', [userLogin]
        // );
        // res.json(takeData, giveData)

        // try {
        //     let data = await executeQuery("select * from GiftList where UserID=LoginUserID order by UserID DESC", [LoginUserID]);
        //     res.json(data)
        // } catch (err) {
        //     res.send(err);
        // }
    }


    switch (method) {
        case "GET": selectGiftData(); break;
    }
}

//  #2.  method를 통해, 접속하는데 *(전체) from teamDbList(지정한 db파일이름)

///////////////////////////////////////////////

////////////////////////////////////////////////////