const covidApi = require("../covid-api/covid-api");
const covidLiveApi = require("../covid-api/covid-live-api");
const weatherApi = require("../weather-api/weather-api");

module.exports = (app) => {
    //초단기 예보
    app.get("/getUltraSrtFcst", (request, response) => {
        const { x, y } = request.query;
        /* console.log(x,y); */
        weatherApi.getUtraSrtFcst(x, y, (res) => {
            try {
                response.json(res.items.item);
            } catch (e) { response.json("error") };
        });
    })

    //단기 예보
    app.get("/getVilageFcst", (request, response) => {
        const { x, y } = request.query;
        /* console.log(x, y); */
        weatherApi.getVilageFcst(x, y, (resp) => {
            //console.log(resp);
            try {
                response.json(resp.items.item);
            } catch (e) { response.json("error") };

        });
    })

    // 코로나 현황 - 질병청 API
    app.get("/getCovid", (request, response)=>{
        const {searchDate} = request.query;
        let _searchDate = new Date(Date.parse(searchDate));
        _searchDate.setHours(_searchDate.getHours() + 9); 

        let enddt = _searchDate.toISOString().split("T")[0];
        _searchDate.setDate(_searchDate.getDate()-60);
        let startdt = _searchDate.toISOString().split("T")[0];

        covidApi.getCovid(startdt.split('-').join(''), enddt.split('-').join(''), (res)=>{
            response.json(res)
        })
    })

    // 코로나 라이브 현황 - 재난문자 API
    app.get("/getCovidLive", (request, response)=>{
        const {searchDate} = request.query;
        covidLiveApi.covidLive(searchDate, (res)=>{
            response.json(res);
        })
    })
}