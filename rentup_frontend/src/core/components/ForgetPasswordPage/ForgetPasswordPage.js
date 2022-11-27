import classes from "./ForgetPasswordPage.module.css"
import img from "../../../assets/img/backgroundSignin.jpg"
import { useRef, useContext, useEffect, useState } from "react"
import AuthContext from '../../../store/auth-context';
import { Link, useHistory } from "react-router-dom";
import { signinApi, getOauth2Info } from "../../../api/AuthApi";
import {forgetPassword} from "../../../api/AuthApi"
import Popup from "../common/Popup/Popup"

const ForgetPasswordPage = () => {
    const emailInputRef = useRef("")
    
    const [popup, setPopup] = useState(false)
    
    const submitHandler = (event) => {
        event.preventDefault();
        
        const enteredEmail = emailInputRef.current.value;
        
        // optional: Add validation
        
        forgetPassword({email: enteredEmail})
        .then((data) => {
            setPopup(true)
        })
        .catch((error) => console.error(error))
    }
    
    return (
        <section className={classes.back}>
            <div className={classes.center}>
                <h1>Forget Password</h1>
                <form method="POST" onSubmit={submitHandler}>
                    <div className={classes.txt_field}>
                        <input type="text" required ref={emailInputRef}/>
                        <span></span>
                        <label>Email</label>
                    </div>
                    <button type="submit">Submit</button>
                    <div className={classes.signup_link}>
                        <Link to="/">home</Link>
                    </div>
                </form>
            </div>
            <img src={img} alt='' />
            <Popup trigger={popup}>
                <h3>Email has been sent</h3>
                <p>An email containing a link to change your password has been sent to you</p>
                <button type="button" onClick={() => {setPopup(false);}}>Ok</button>
            </Popup>
        </section>
    )
}

export default ForgetPasswordPage