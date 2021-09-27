import { SET_ADDRESS_LOADING, SET_PROVINCES, SET_DISTRICT, SET_SUBDISTRICT } from "../types"


export const getProvinces = () => (dispatch) => {
    dispatch({ type: SET_ADDRESS_LOADING })
    fetch("https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces", {
        method: "GET",
        body: JSON.stringify(),
    }).then((response) => response.json())
        .then(result => {
            const temp = [];
            result.data.forEach(function (item, index) {
                temp.push({
                    key: index,
                    province: item.province,
                })
            });
            dispatch({ type: SET_PROVINCES, payload: temp });
        })

}

export const getDistrict = (provinces) => (dispatch) => {
    console.log(provinces);
    dispatch({ type: SET_ADDRESS_LOADING })
    fetch("https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/" + provinces + "/district", {
        method: "GET",
        body: JSON.stringify(),
    }).then((response) => response.json())
        .then(result => {
            const temp = [];
            result.data.forEach(function (item, index) {
                temp.push({
                    key: index,
                    district: item,
                })
            });
            dispatch({ type: SET_DISTRICT, payload: temp });
        })

}

export const getSubDistrict = (provinces, district) => (dispatch) => {
    console.log(provinces, district);
    dispatch({ type: SET_ADDRESS_LOADING })
    fetch("https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/" + provinces + "/district/" + district, {
        method: "GET",
        body: JSON.stringify(),
    }).then((response) => response.json())
        .then(result => {
            const temp = [];
            result.data.forEach(function (item, index) {
                temp.push({
                    key: index,
                    subdistrict: item,
                })
            });
            dispatch({ type: SET_SUBDISTRICT, payload: temp });
        })

}