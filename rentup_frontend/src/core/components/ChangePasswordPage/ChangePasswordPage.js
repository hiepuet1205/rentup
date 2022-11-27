import classes from "./ChangePasswordPage.module.css"
import img from "../../../assets/img/backgroundSignin.jpg"
import { useRef, useContext, useEffect, useState } from "react"
import AuthContext from '../../../store/auth-context';
import { Link, useHistory, useParams } from "react-router-dom";
import { signinApi, getOauth2Info } from "../../../api/AuthApi";
import {changePassword} from "../../../api/AuthApi"
import Popup from "../common/Popup/Popup"


const ChangePasswordPage = () => {
    const newPasswordInputRef = useRef("")
    const newPasswordRepeatInputRef = useRef("")
    
    const [popup, setPopup] = useState(false)
    
    const history = useHistory()
    
    const params = useParams()
    
    const token = params.token
    
    const submitHandler = (event) => {
        event.preventDefault();
        
        const enteredNewPassword = newPasswordInputRef.current.value;
        const enteredNewPasswordRepeat = newPasswordRepeatInputRef.current.value;
        
        if(enteredNewPassword !== enteredNewPasswordRepeat){
            alert("Repeated password is not the same")
        }
        
        changePassword(token, {new_password: enteredNewPassword})
        .then((data) => {
            setPopup(true)
        })
        .catch((error) => console.error(error))
    }
    
    const redirectSigninPage = () => {
        history.replace("/signin")    
    }
    
    return (
        <section className={classes.back}>
            <div className={classes.center}>
                <h1>Change Password</h1>
                <form method="POST" onSubmit={submitHandler}>
                    <div className={classes.txt_field}>
                        <input type="password" required ref={newPasswordInputRef}/>
                        <span></span>
                        <label>Password</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="password" required ref={newPasswordRepeatInputRef}/>
                        <span></span>
                        <label>Password Repeat</label>
                    </div>
                    <button type="submit">Submit</button>
                    <div className={classes.signup_link}>
                        <Link to="/">home</Link>
                    </div>
                </form>
                <Popup trigger={popup}>
                    <h3>Change password successfully</h3>
                    <p>Your password has been updated</p>
                    <button type="button" onClick={redirectSigninPage}>Ok</button>
                </Popup>
            </div>
            <img src={img} alt='' />
        </section>
    )
}

export default ChangePasswordPage