const util = require('../util/util');
const axios = require('axios');

require('dotenv').config();

module.exports = {
    //초단기예보
    getUtraSrtFcst : (nx, ny, callback)=>{
        let url = process.env.WEATHER_API_URL + 'getUltraSrtFcst';
        let date = new Date();
        let basehour = date.getHours();
        if(date.getMinutes() < 40) basehour--;

        let getBaseDateTime = ()=>{
            let date = new Date();
            //API 제공시간은 매시간 40분이므로, 현재시간에서 40분을 빼고 구한다.
            date.setMinutes(date.getMinutes()-40);

            let curHour = date.getHours();

            let _basetime = curHour;
            _basetime < 10 ? _basetime = "0" + _basetime + "00" : _basetime = _basetime + "00";
            _basedate = date.toISOString().split("T")[0].split("-").join('');

            return {base_date: _basedate, base_time: _basetime}
        }

        let _params ={
            serviceKey: process.env.API_KEY,
            numOfRows: 1000,
            pageNo: 1,
            dataType: 'JSON',
            base_date: getBaseDateTime().base_date,
            base_time: getBaseDateTime().base_time,
            nx: nx,
            ny: ny,
        }

        //console.log(_params);
        let params = util.toQueryString(_params);

        axios.get(url + params).then((response)=>{
            callback(response.data.response.body);
        })
    },

    //단기예보
    getVilageFcst : (nx, ny, callback)=>{
        let url = process.env.WEATHER_API_URL + 'getVilageFcst';
        let date = new Date();
        
        let getBaseDateTime = ()=>{
            let date = new Date();
            //API 제공시간은 3시간 간격 해시각 10분이므로, 현재시간에서 10분을 빼고 3시간 간격을 구한다.
            date.setMinutes(date.getMinutes()-10);

            let curHour = date.getHours();

            let _basetime = curHour - ((curHour-2) % 3)
            _basetime < 10 ? _basetime = "0" + _basetime + "00" : _basetime = _basetime + "00";
            _basedate = date.toISOString().split("T")[0].split("-").join('');

            return {base_date: _basedate, base_time: _basetime}
        }

        let _params ={
            serviceKey: process.env.API_KEY,
            numOfRows: 1000,
            pageNo: 1,
            dataType: 'JSON',
            base_date: getBaseDateTime().base_date,
            base_time: getBaseDateTime().base_time,
            nx: nx,
            ny: ny,
        }
        /* console.log(_params); */
        let params = util.toQueryString(_params);

        axios.get(url + params).then((response)=>{
            /* console.log(response.data); */
            callback(response.data.response.body);
        })
    }
}