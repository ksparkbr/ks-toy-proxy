const { default: axios } = require("axios");
const util = require("../util/util");

module.exports = {
    getCovid: (startdt, enddt, callback)=>{
        let url = process.env.COVID_API_URL;
        let _params ={
            serviceKey: process.env.API_KEY,
            numOfRows: 30,
            pageNo: 1,
            startCreateDt: startdt,
            endCreateDt : enddt,
        }
        axios.get(url + util.toQueryString(_params))
            .then((res) => {
                callback(res.data.response.body.items.item);
            })

    }
}