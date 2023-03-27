const { createPool } = require('mysql');
const cors = require('cors')


// let corsOptions = {
//     origin: '*',      // 출처 허용 옵션
//     credential: true, // 사용자 인증이 필요한 리소스(쿠키 등) 접근
// }

// app.use(cors(corsOptions))

const pool = createPool({
    host: 'svc.sel3.cloudtype.app',
    user: 'root',
    password: '1234',
    port: 30056,
    database: 'test', //mySQL프로젝트 이름이 아니고, 프로젝트 안에 SCHEMAS안에 있는 root 이름을 작성해야함/////
});

pool.getConnection(() => {
    console.log('success')
});

const executeQuery = async (query, arraParms) => {
    return await new Promise((resolve) => {
        pool.query(query, arraParms, (err, data) => { //query라는 것을 통해서 작업을 진행한다.
            // 조회 ,추가 ,수정, 삭제 등등
            resolve(data)
        });
    })

}

module.exports = { executeQuery };

//  #1.  db.js : mysql연결을 위해,pool 항목 정리.