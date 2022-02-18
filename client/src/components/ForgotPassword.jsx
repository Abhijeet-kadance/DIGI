import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { url } from '../commons/constants';
function ForgotPassword() {
    const history = useHistory()

    const validPassword = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [encOTP, setEncOTP] = useState('');
    const [userOtp, setUserOtp] = useState(0);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const sendOTP = () => {
        const emailform = new FormData()
        emailform.append('useremail',email)
        axios.post(url + '/email', emailform).then((response) => {
            if (response.data.status === 'success') {
                setEncOTP(response.data.data)
                setIsOtpSent(true)
            } else {
                // console.log(response.data.data)
                window.alert("email not found in record")
            }
        })
    }
    const verifyOtp = () => {
        const otp = (parseInt(encOTP) + 31) / 31;
        // console.log('otp '+otp)
        // console.log('userOtp '+userOtp)
        if (userOtp.length !== 4) {
            alert('OTP should be of 4-digits which is sent on your email')
        } if(otp != userOtp){
            // console.log('otp '+otp)
            // console.log('userOtp '+userOtp)
            alert('Incorrect OTP ! please enter a correct OTP')
        } else if (password.length === 0 && confirmPassword.length === 0) {
            alert('enter a new password')
        } else if(!validPassword.test(password)){
            alert(' password must contain 1 number (0-9)\n password must contain 1 uppercase letters \n password must contain 1 lowercase letters \n password must contain 1 non-alpha numeric number (#?!@$%^&*-) \n password must be of more than 8 characters with no space');
        }else if (password !== confirmPassword) {
            alert('confirm password not matched..Re-enter the password')
        } else {
            const data = new FormData();

            data.append('email', email);
            data.append('newPassword', password);

            axios.post(url + '/email/verifyotp',data).then((response) => {
                if (response.data.status === 'success') {
                    window.alert('Your password is reset ! please use new password to logIn now')
                    history.push('/')
                } else {
                    window.alert('password updatation failed')
                }
            })
        }
    }
    return (
        <div>
            <div className="container">


                <div className="main_display_form">
                    <hr /><h1 style={{ textAlign: 'center' }}>Forgot password</h1><hr />

                    {!isOtpSent && (
                        <>
                            <h4 style={{ textAlign: 'center' }}>Please enter your Email-id to reset password</h4>

                            <div className="row mb-3">
                                <label htmlFor="email" className="col-sm-2 col-form-label">Email: </label>
                                <div class="col-sm-10">
                                    <input type="email" name="email" className="form-control" id="email" placeholder='Enter your registered email-id'
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }} />
                                </div>
                            </div>
                            <button class="btn btn-success" onClick={sendOTP}>Send OTP</button><br />

                        </>
                    )}
                    {isOtpSent && (
                        <>
                            <div className="alert alert-success" role="alert">
                                OTP is successfully sent to your registered Email-Id ! <br />
                                You can now set a new password
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="email" className="col-sm-2 col-form-label">Email: </label>
                                <div class="col-sm-10">
                                    <input type="email" name="email" className="form-control" id="email" value={email} disabled />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="otp" className="col-sm-2 col-form-label">OTP: </label>
                                <div class="col-sm-10">
                                    <input type="number" className="form-control" id="otp" placeholder='Enter the received 4-digit OTP'
                                        onChange={(e) => {
                                            setUserOtp(e.target.value)
                                        }} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="password" className="col-sm-2 col-form-label">Password: </label>
                                <div class="col-sm-10">
                                    <input type="password" className="form-control" id="password" placeholder='Enter your password'
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="confirmpassword" className="col-sm-2 col-form-label">Confirm Password: </label>
                                <div class="col-sm-10">
                                    <input type="password" className="form-control" id="confirmpassword" placeholder='confirm your password'
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value)
                                        }} />
                                </div>
                            </div>

                            <div style={{ textAlign: 'center' }}>
                                <button class="btn btn-success" onClick={verifyOtp}>Change password</button><br />

                            </div>

                        </>
                    )}

                </div>

            </div>

        </div>
    )
}

export default ForgotPassword
