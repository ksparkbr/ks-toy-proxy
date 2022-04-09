module.exports = {
    toQueryString: (obj) => {
        let _k = Object.keys(obj);
        let _ret = [];
        _k.forEach((item) => {
            _ret.push(`${item}=${obj[item]}`)
        })
        return "?" + _ret.join("&")
    }
}