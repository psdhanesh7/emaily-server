import React , {useState} from 'react'
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle} from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import { useHistory } from 'react-router';


export default function Login({ setToken }) {
    const [username, setusername] = useState('');
    const [password,setPassword] = useState('');

    const history = useHistory();

    const handleSignIn = async (e) => {
        e.preventDefault();
        
        console.log(username, password);
        const res = await axios.post('http://localhost:3000/auth/login', { email: username, password });
        console.log(res.data.token);
        localStorage.setItem('token', res.data.token)
      
        window.location.assign('/home');
    }

    const handleGoogleAuth = async (e) => {
        const res = await axios.get('https://emailserver-backend.herokuapp.com/auth/google');
        console.log(res.data.token);
        localStorage.setItem('token', res.data.token)
      
        window.location.assign('/home');
    }

    const handleSignUp = async (e) => {
        const res = await axios.post('http://localhost:3000/auth/signup', { email: username, password });
        if(res.data.success) {
            window.location.assign('/');
        } else {
            console.log(res);
        }
    }

    return (
        
        <div>
            <div className="row">
                <div className="col-md-6 mx-auto p-0">
                    <div className="card">
                        <div className="login-box">
                            <div className="login-snip"> <input id="tab-1" type="radio" name="tab" className="sign-in" checked/><label for="tab-1" className="tab">Login</label> <input id="tab-2" type="radio" name="tab" className="sign-up"/><label for="tab-2" className="tab">Sign Up</label>
                                <div className="login-space">
                                    <div className="login">
                                        <div className="group"> <label for="user" className="label">Email Address</label> <input id="user" type="text" className="input" placeholder="Enter your email address" value={username} onChange = {(e) => setusername(e.target.value)}/> </div>
                                        <div className="group"> <label for="pass" className="label">Password</label> <input id="pass" type="password" className="input" data-type="password" placeholder="Enter your password" value={password} onChange = {(e) => setPassword(e.target.value)}/> </div>
                                        <div className="sign">  
                                        <div className="group"> <input type="submit" className="button" value="Sign In" onClick={handleSignIn}/> </div>
                                        <div className="group"> <button  className="button" type="submit" onClick={handleGoogleAuth}><FontAwesomeIcon icon={faGoogle} style={{marginRight:"10%",fontSize:"1.5rem"}}  /><span className="buttonText">Sign in with Google</span></button> </div>
                                        </div>
                                        <div className="hr"></div>
                                        {/* <div className="foot"> <a href="#">Forgot Password?</a> </div> */}
                                    </div>
                                    <div className="sign-up-form">
                                        <div className="group"> <label for="user" className="label">Email Address</label> <input id="user" type="text" className="input" placeholder="Enter your email address" value={username} onChange = {(e) => setusername(e.target.value)}/> </div>
                                        <div className="group"> <label for="pass" className="label">Password</label> <input id="pass" type="password" className="input" data-type="password" placeholder="Create your password"value={password} onChange = {(e) => setPassword(e.target.value)}/> </div>
                                   
                                        {/* <div className="group"> <label for="pass" className="label">Email Address</label> <input id="pass" type="text" className="input" placeholder="Enter your email address"/> </div > */}
                                        <div className="sign"> 
                                        <div className="group"> <input type="submit" onClick={handleSignUp} className="button" value="Sign Up"/> </div></div>
                                        <div className="hr"></div>
                                        {/* <div className="foot"> <label for="tab-1">Already Member?</label> </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
