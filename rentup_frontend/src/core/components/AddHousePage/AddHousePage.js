import img from "../../../assets/img/backgroundSignin.jpg"
import classes from "./AddHousePage.module.css"
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react"
import AuthContext from '../../../store/auth-context';
import {getProvince, getDistrict, getWard} from "../../../api/ProvinceApi"
import { createHouseApi } from "../../../api/HouseApi";
import Popup from "../common/Popup/Popup"

const typeData = [
    {
        text: "Family House",
        value: "0"
    },
    {
        text: "House & Villa",
        value: "1"
    },
    {
        text: "Apartment",
        value: "2"
    },
    {
        text: "Office & Studio",
        value: "3"
    },
    {
        text: "Villa & Condo",
        value: "4"
    },
    
]

const AddHousePage = () => {
    const history = useHistory()
    
    const [cityData, setCityData] = useState([])
    const [districtData, setDistrictData] = useState([])
    const [wardData, setWardData] = useState([])
    const [popup, setPopup] = useState(false)
    
    const imageRef = useRef()
    
    const [values, setValues] = useState({
        city: '1',
        district: '1',
        ward: '1',
        type: '0',
        detail: '',
        description: ''
    })
    
    const {city, district, ward, type, detail, description} = values
    
    const authCtx = useContext(AuthContext)
    
    useEffect(() => {
        getProvince().then(data => {
            const tempCity = []
            data.forEach(data => {
                tempCity.push({
                    text: data.name,
                    value: data.code,
                })
            })
            setCityData(tempCity)
        })
        .catch(error => console.log('Error', error))
    }, [])
    
    useEffect(() => {
        getDistrict(city).then(data => {
            const tempDistrict = []
            data.districts.forEach(data => {
                tempDistrict.push({
                    text: data.name,
                    value: data.code,
                })
            })
            setDistrictData(tempDistrict)
        })
        .catch(error => console.log('Error', error))
    }, [city])
    
    useEffect(() => {
        getWard(district).then(data => {
            const tempWard = []
            data.wards.forEach(data => {
                tempWard.push({
                    text: data.name,
                    value: data.code,
                })
            })
            setWardData(tempWard)
        })
        .catch(error => console.log('Error', error))
    }, [district])
    
    const handleChange = (key) => {
        return (event) => {
            setValues({...values, [key]: event.target.value})
        }
    }
    
    const submitHandler = (event) => {
        event.preventDefault();

        const cityInput = cityData.find(c => c.value == city).text
        const districtInput = districtData.find(d => d.value == district).text
        const wardInput = wardData.find(w => w.value == ward).text
        const categoryInput = typeData.find(t => t.value == type).text
        
        const house = {
            category: categoryInput,
            city: cityInput,
            district: districtInput,
            ward: wardInput,
            detail: detail,
            description: description,
            image: imageRef.current.files[0],
        }
        
        createHouseApi(house, authCtx.token)
        .then((data) => {
            setPopup(true)
        })
        .catch((err) => {
            alert(err.message);
        });
    }
    
    const redirectToManagePage = () => {
        history.replace("/manage")
    }
    
    return (
        <section className={classes.back}>
            <div className={classes.center}>
                <h1>Add House</h1>
                <form method="POST" onSubmit={submitHandler}>
                    <div className={classes.txt_field}>
                        <select 
                            value={type}
                            onChange={handleChange('type')}
                        >
                            {typeData.map(type => <option value={type.value}>{type.text}</option>)}
                        </select>
                        <span></span>
                        <label>Type</label>
                    </div>
                    <div className={classes.txt_field}>
                        <select 
                            value={city}
                            onChange={handleChange('city')}
                        >
                            {cityData.map(city => <option value={city.value}>{city.text}</option>)}
                        </select>
                        <span></span>
                        <label>City</label>
                    </div>
                    <div className={classes.txt_field}>
                        <select 
                            value={district}
                            onChange={handleChange('district')}
                        >
                            {districtData.map(district => <option value={district.value}>{district.text}</option>)}
                        </select>
                        <span></span>
                        <label>District</label>
                    </div>
                    <div className={classes.txt_field}>
                        <select 
                            value={ward}
                            onChange={handleChange('ward')}
                        >
                            {wardData.map(ward => <option value={ward.value}>{ward.text}</option>)}
                        </select>
                        <span></span>
                        <label>Ward</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="text" required value={detail} onChange={handleChange('detail')}/>
                        <span></span>
                        <label>Detail</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="text" required value={description} onChange={handleChange('description')}/>
                        <span></span>
                        <label>Description</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="file" required ref={imageRef}/>
                        <span></span>
                        <label>Image</label>
                    </div>
                    <button type="submit">Add</button>
                    <div className={classes.signup_link}>
                        <Link to="/">home</Link>
                    </div>
                </form>
            </div>
            <img src={img} alt='' />
            <Popup trigger={popup}>
                <h3>Add House successfully</h3>
                <p>Your house has been added</p>
                <button type="button" onClick={redirectToManagePage}>Ok</button>
            </Popup>
        </section>
    )
}

export default AddHousePage 