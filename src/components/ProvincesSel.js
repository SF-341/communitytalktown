import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const ProvincesSel = () => {
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [subdistrict, setSubdistrict] = useState("");
    const [dataProvince, setDataProvince] = useState();
    const [dataDistrict, setDataDistrict] = useState();
    const [dataSubDistrict, setDataSubDistrict] = useState();
    const [disabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const wrapper = React.createRef();

    async function queryProvinces () {
        await fetch("https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces", {
            method: "GET",
            body: JSON.stringify(),
        }).then((response) => response.json())
            .then(result => {
                const temp = [];
                result.data.forEach(function(item, index) {
                    temp.push({
                            key: index,
                            province: item.province,
                    })
                });
                console.log(temp);
                setDataProvince(temp);
                
            })
    }

    async function queryDistrict(province) {
        await fetch("https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/" + province + "/district", {
            method: "GET",
            body: JSON.stringify(),
        }).then((response) => response.json())
            .then(result => {
                const temp = [];
                result.data.forEach(function(item, index) {
                    temp.push({
                            key: index,
                            district: item,
                    })
                });
                console.log(temp);
                setDataDistrict(temp);
            })
    }

    async function querySubDistrict(district) {
        await fetch("https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/" + province + "/district/" + district, {
            method: "GET",
            body: JSON.stringify(),
        }).then((response) => response.json())
            .then(result => {
                const temp = [];
                result.data.forEach(function(item, index) {
                    temp.push({
                            key: index,
                            subdistrict: item,
                    })
                });
                console.log(temp);
                setDataSubDistrict(temp);
            })
    }



    const handleChange = (event) => {
        if (event.target.name === "province") {
            setProvince(event.target.value);
            queryDistrict(event.target.value);
        } else if (event.target.name === "district") {
            setDistrict(event.target.value);
            
        } else if (event.target.name === "subdistrict") {
            setSubdistrict(event.target.value);
        }

    };


    if(isLoading){
        queryProvinces();
        setDisabled(false);
        setIsLoading(false);
    }
    
    
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    return (
    
    <div ref={wrapper}>

        <FormControl className={classes.formControl} disabled={disabled}>
            <InputLabel id="province"  >province</InputLabel>
            <Select labelId="province" id="province" name="province" value={province} onChange={handleChange}>
                
                    <MenuItem value=""><em>None</em></MenuItem>
                    {dataProvince ? dataProvince.map((data) => ( <MenuItem key={data.key} value={data.province}>{data.province}</MenuItem>)) : ""}
                
            </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
            <InputLabel id=""  >district</InputLabel>
            <Select labelId="district" id="district" name="district" value={district} onChange={handleChange}>
                
                    <MenuItem value=""><em>None</em></MenuItem>
                    {dataDistrict ? dataDistrict.map((item) => (<MenuItem key={item.key} value={item.district}>{item.district}</MenuItem>)) : ""}
                
            </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
            <InputLabel id=""  >subdistrict</InputLabel>
            <Select labelId="subdistrict" id="subdistrict" name="subdistrict" value={subdistrict} onChange={handleChange}>

                <MenuItem value=""><em>None</em></MenuItem>
                    {dataSubDistrict ? dataSubDistrict.map((item) => (<MenuItem key={item.key} value={item.subdistrict}>{item.subdistrict}</MenuItem>)) : ""}
                
            </Select>
        </FormControl>

    </div>)

}


export default ProvincesSel