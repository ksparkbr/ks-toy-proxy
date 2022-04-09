const { default: axios } = require('axios');

require('dotenv').config();

module.exports = {
    getCyberNews : (keyword, callback)=>{
        //X-Naver-Client-Id
        //X-Naver-Client-Secret 을 헤더에 추가해야함
        const apiUrl = "https://openapi.naver.com/v1/search/news.json";
        const axiosConfig = {
            headers:{
                'X-Naver-Client-Id' : process.env.NAVER_API_ID,
                'X-Naver-Client-Secret' : process.env.NAVER_API_SECRET,
            },
            params: {
                query: keyword,
                display: 100,
                start: 1,
                sort: 'sim',
            }
        }
        
        axios.get(apiUrl, axiosConfig).then((res)=>{
            /* console.log(keyword); */
            callback(res.data);
        }).catch((err)=>{});


    }

}