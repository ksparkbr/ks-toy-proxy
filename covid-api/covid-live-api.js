const { default: axios } = require('axios');

require('dotenv').config();

module.exports = {
    covidLive : (searchDate, callback)=>{

        let param = {
            searchInfo : {
                c_ocrc_type: "DST200",
                dstr_se_Id: "27",
                firstIndex: "1",
                lastIndex: "1",
                pageIndex: "1",
                pageSize: 29,
                pageUnit: "300",
                rcv_Area_Id: "",
                recordCountPerPage: "10",
                sbLawArea1: "",
                sbLawArea2: "",
                searchBgnDe: searchDate,
                searchEndDe: searchDate,
                searchGb: "1",
                searchWrd: "",
            }
        }
        console.log(process.env.COVID_LIVE_API_URL);
        axios.post(process.env.COVID_LIVE_API_URL, param).then((res)=>{
            callback(res.data.disasterSmsList);
        })
    }

}