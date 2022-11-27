import { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signupApi } from "../../../api/AuthApi";
import { getDistrict, getProvince, getWard } from "../../../api/ProvinceApi";
import img from "../../../assets/img/backgroundSignin.jpg";
import classes from "./SignupPage.module.css";
import Popup from "../common/Popup/Popup"

const SignupPage = () => {
    const history = useHistory()
    
    const [cityData, setCityData] = useState([])
    const [districtData, setDistrictData] = useState([])
    const [wardData, setWardData] = useState([])
    const imageRef = useRef()
    
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        phone: '',
        password: '',
        password_repeat: '',
        city: '1',
        district: '1',
        ward: '1',
        linkfb: '',
        linkin: '',
        linktw: '',
        linkli: '',
    })
    
    const [popup, setPopup] = useState(false)
    
    const {first_name, last_name, email, username, phone, password, password_repeat, city, district, ward, linkfb, linkin, linktw, linkli} = values
    
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
    
    const redirectSigninPage = () => {
        history.replace("/signin")    
    }
    
    const handleChange = (key) => {
        return (event) => {
            setValues({...values, [key]: event.target.value})
        }
    }
    
    const submitHandler = (event) => {
        event.preventDefault();
        
        if(password !== password_repeat){
            alert('password repeat not like password')
            return;
        }
        
        const cityInput = cityData.find(c => c.value == city).text
        const districtInput = districtData.find(d => d.value == district).text
        const wardInput = wardData.find(w => w.value == ward).text
        
        const data = {
            first_name: first_name, 
            last_name: last_name, 
            email: email, 
            username: username, 
            phone: phone,  
            password: password, 
            city: cityInput, 
            district: districtInput, 
            ward: wardInput, 
            linkfb: linkfb, 
            linkin: linkin, 
            linktw: linktw,  
            linkli: linkli, 
            image: imageRef.current.files[0],
        }
        
        signupApi(data)
        .then((data) => {
            setPopup(true);
        })
        .catch((err) => {
            alert(err.message);
        });
    }
    
    return (
        <section className={classes.back}>
            <div className={classes.center}>
                <h1>Sign Up</h1>
                <form method={classes.post} onSubmit={submitHandler}>
                    <div className={classes.txt_field}>
                        <input type="text" required value={first_name} onChange={handleChange('first_name')}/>
                        <span></span>
                        <label>First Name</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="text" required value={last_name} onChange={handleChange('last_name')}/>
                        <span></span>
                        <label>Last Name</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="text" required value={username} onChange={handleChange('username')}/>
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="text" required value={email} onChange={handleChange('email')}/>
                        <span></span>
                        <label>Email</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="text" required value={phone} onChange={handleChange('phone')}/>
                        <span></span>
                        <label>Phone Number</label>
                    </div>
                    <div className={classes.txt_field}>
                        <select 
                            value={city}
                            onChange={handleChange('city')}
                        >
                            {cityData.map(city => <option value={city.value} onChange={handleChange('city')}>{city.text}</option>)}
                        </select>
                        <span></span>
                        <label>City</label>
                    </div>
                    <div className={classes.txt_field}>
                        <select 
                            value={district}
                            onChange={handleChange('district')}
                        >
                            {districtData.map(district => <option value={district.value} onChange={handleChange('district')}>{district.text}</option>)}
                        </select>
                        <span></span>
                        <label>District</label>
                    </div>
                    <div className={classes.txt_field}>
                        <select 
                            value={ward}
                            onChange={handleChange('ward')}
                        >
                            {wardData.map(ward => <option value={ward.value} onChange={handleChange('ward')}>{ward.text}</option>)}
                        </select>
                        <span></span>
                        <label>Ward</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="text" required value={linkfb} onChange={handleChange('linkfb')}/>
                        <span></span>
                        <label>Facebook</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="text" required value={linkin} onChange={handleChange('linkin')}/>
                        <span></span>
                        <label>Instagram</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="text" required value={linktw} onChange={handleChange('linktw')}/>
                        <span></span>
                        <label>Twitter</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="text" required value={linkli} onChange={handleChange('linkli')}/>
                        <span></span>
                        <label>LinkedIn</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="file" required ref={imageRef}/>
                        <span></span>
                        <label>Avatar</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="password" required value={password} onChange={handleChange('password')}/>
                        <span></span>
                        <label>Password</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="password" required value={password_repeat} onChange={handleChange('password_repeat')}/>
                        <span></span>
                        <label>Password repeat</label>
                    </div>
                    <button type="submit">Sign Up</button>
                    <div className={classes.signin_link}>
                       Have a account? <Link to="signin">Sign in</Link>
                    </div>
                </form>
            </div>
            <img src={img} alt='' />
            <Popup trigger={popup}>
                <h3>Sign up successfully</h3>
                <p>Your account has been set up</p>
                <button type="button" onClick={redirectSigninPage}>Sign in now</button>
            </Popup>
        </section>
    )
}

export default SignupPage