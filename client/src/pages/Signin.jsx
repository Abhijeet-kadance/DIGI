import React from 'react'
import './Signin.css'
import { useState } from 'react'
import axios from 'axios';
import { url } from './../commons/constants';
import { Link, useHistory, Redirect } from 'react-router-dom';





function Signin({ setIsAuthorized }) {
    let history = useHistory();
    const [emailLogin, setemailLogin] = useState('')
    const [passwordLogin, setpasswordLogin] = useState('')

    axios.defaults.withCredentials = false;
    const logIn = (e) => {
        if (emailLogin.length === 0) {
            alert('please enter email')
        } else if (passwordLogin.length === 0) {
            alert('please enter password')
        } else {
            e.preventDefault()
            const data = new FormData();

            data.append('email', emailLogin);
            data.append('password', passwordLogin);
            try {
                axios.post(url + '/patient/authenticate', data).then((response) => {
                    // response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
                    const result = response.data;
                    console.log(result.data);
                    if (result.status === 'success') {
                        // console.log(result.status);
                        // console.log(result.data);
                        sessionStorage.setItem('credentials', JSON.stringify(result.data))
                        setIsAuthorized(true)
                        window.alert('Hey! you are Successfully Logged In to DigiHeal');
                        history.push('/')
                    } else if(result.status != 'success') {
                        // console.log(result.status)
                        window.alert('Registeration Failed..');
                    }

                });
            } catch (error) {
                console.log(error)
            }
        }
    }
    // //Still needs to work on
    //     useEffect(() => {
    //         Axios.get(`${url}/patient/authenticate`).then((response) => {
    //             if(response.data.loggedIn == true){
    //                 setLoginStatus(response.data[0].email);
    //             }
    //         })
    //     }, [])

    return (

        <>
            <div className="container-fluid">

                <div className="row">
                    <div className="col-lg-12">

                        <div style={{ textAlign: 'right' }}>
                            <Link to="/docsignin">
                                <button type="button" class="btn btn-warning">Goto Doctor's Login</button>
                            </Link>
                        </div>
                    </div>
                    <div className="main_display_image col-sm-3 col-md-9 col-lg-6">
                        <h1 style={{ textAlign: 'center' }}>
                            Welcome to DigiHeal
                        </h1>
                        <h5 style={{ textAlign: 'center' }}>
                            We are always there for you...
                        </h5>
                        <img src="\images\main_image.jpg" className="img-responsive Hospitalimg" alt="Hospitalimg" style={{ display: "block", marginRight: "auto", marginLeft: "auto" }} />
                    </div>

                    <div className="main_display_form col-sm-3 col-md-9 col-lg-6 mb-3 py-4">

                        <h3 style={{ textAlign: 'center' }}>Login to DigiHeal</h3>

                        <div className="row mb-3">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" name="email" className="form-control" id="email" placeholder='Enter your registered email-id'
                                    onChange={(e) => {
                                        setemailLogin(e.target.value)
                                    }} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                            <div class="col-sm-10">
                                <input type="password" name="password" className="form-control" id="password" placeholder='Enter your password'
                                    onChange={(e) => {
                                        setpasswordLogin(e.target.value)
                                    }} />
                            </div>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <button type="submit" class="btn btn-success" onClick={logIn}>Log in</button><br />
                            <Link to='/forgotpassword'>
                                <button type="button" class="btn btn-secondary transparent-btn" >Forgot Password ?</button>
                            </Link>

                            <h6 style={{ marginTop: '5px' }}>OR</h6>

                            <Link to="/signup">
                                <button type="button" class="btn btn-primary" onClick={() => { return <Redirect to='/signup' /> }}>Create New Account</button>
                            </Link>
                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default Signin;
