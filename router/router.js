const weatherApi = require("../weather-api/weather-api");

module.exports = (app) => {
    //초단기 예보
    app.get("/getUltraSrtFcst", (request, response) => {
        const { x, y } = request.query;
        console.log(x,y);
        weatherApi.getUtraSrtFcst(x, y, (res) => {
            try {
                response.json(res.items.item);
            } catch (e) { response.json("error") };
        });
    })

    //단기 예보
    app.get("/getVilageFcst", (request, response) => {
        const { x, y } = request.query;
        console.log(x, y);
        weatherApi.getVilageFcst(x, y, (resp) => {
            //console.log(resp);
            try {
                response.json(resp.items.item);
            } catch (e) { console.log(e); response.json("error") };

        });

    })
}