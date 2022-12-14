import classes from "./SigninPage.module.css"
import img from "../../../assets/img/backgroundSignin.jpg"
import { useRef, useContext, useEffect, useState } from "react"
import AuthContext from '../../../store/auth-context';
import { Link, useHistory } from "react-router-dom";
import { signinApi, getOauth2Info } from "../../../api/AuthApi";

const SigninPage = () => {
    const history = useHistory()
    
    const authCtx = useContext(AuthContext)
    
    const usernameInputRef = useRef("")
    const passwordInputRef = useRef("")
    
    const [client_id, setClient_id] = useState('')
    const [client_serect, setClient_serect] = useState('')
    
    useEffect(() => {
        getOauth2Info()
        .then((data) => {
            setClient_id(data.client_id)
            setClient_serect(data.client_serect)
        })
        .catch((err) => {
            alert(err.message);
        });
    })
    
    const submitHandler = (event) => {
        event.preventDefault();
        
        const enteredUsername = usernameInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        
        // optional: Add validation
        
        signinApi(enteredUsername, enteredPassword, client_id, client_serect)
        .then((data) => {
            console.log(data)
            const expirationTime = new Date(
                new Date().getTime() + +data.expires_in * 1000
            );
            authCtx.login(data.access_token, expirationTime.toISOString());
            history.replace("/")
        })
        .catch((err) => {
            alert(err.message);
        });
    }
    
    return (
        <section className={classes.back}>
            <div className={classes.center}>
                <h1>Sign In</h1>
                <form method="POST" onSubmit={submitHandler}>
                    <div className={classes.txt_field}>
                        <input type="text" required ref={usernameInputRef}/>
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className={classes.txt_field}>
                        <input type="password" required ref={passwordInputRef}/>
                        <span></span>
                        <label>Password</label>
                    </div>
                    <Link className={classes.pass} to="/forget_password">Forgot Password?</Link>
                    <button type="submit">Login</button>
                    <div className={classes.signup_link}>
                        Not a member? <Link to="/signup">Signup</Link>
                    </div>
                </form>
            </div>
            <img src={img} alt='' />
        </section>
    )
}

export default SigninPage