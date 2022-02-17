import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { setAdminData, setAdminLogin, setUserData, setUserLogin } from '../../redux/slice/loginSlice';
import Api from '../../utils/Api';
//OTP LOGIN
import firebase from 'firebase/app'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../../firebase-config';

export const UserLogin = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const loginData = useSelector((state) => state.login);

    const [sendOtpActive, setSendOtpActive] = useState(true)
    // const [phoneExist, setPhoneExist] = useState(false);


    const [formData, setFormData] = React.useState({
        user_phone: "",
        // user_password: "12345",
        otp: ""
    })

    function handleChange(evt) {
        const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setFormData({
            ...formData,
            [evt.target.name]: value
        });
    }


    const userLogin = async () => {

        // if (formData.user_phone.length == 0 || formData.user_phone == '') {
        //     alert("please enter phone number.")
        //     return;
        // }

        // if (formData.otp.length == 0 || formData.otp == '') {
        //     alert("please enter password.")
        //     return;
        // }

        try {
            const loginData = await Api.Calls(
                "user/login",
                "POST",
                {
                    user_phone: formData.user_phone,
                    user_password: "12345"
                });
            if (loginData.status == 200) {
                dispatch(setUserLogin(true));
                dispatch(setAdminLogin(false));
                dispatch(setUserData(loginData.data));
                dispatch(setAdminData([]));
                history.push("/");
            } else {
                alert(loginData.msg.response.data.message);

                console.log(loginData.msg.response.data.message);
            }
        } catch (error) { }
    };


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
    };



    //OTP LOGIN
    // const isPhoneExist = async (e) => {
    //     const isExits = await Api.Calls(`user/exits/${formData.user_phone}`, "GET");
    //     console.log(isExits)
    //     setPhoneExist(isExits.data.success);
    // }

    const generateRecaptcha = (e) => {

        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
            }
        }, auth);
    }


    const onSignInSubmit = async (e) => {

        if (formData.user_phone.length == 0 || formData.user_phone == '') {
            alert("please enter phone number.")
            return;
        }

        const isPhoneExist = await Api.Calls(`user/exits/${formData.user_phone}`, "GET");



        if (isPhoneExist.data.success == true) {
            setSendOtpActive(false)
            generateRecaptcha();
            signInWithPhoneNumber(auth, `+91${formData.user_phone}`, window.recaptchaVerifier)
                .then((confirmationResult) => {
                    console.log(confirmationResult);
                    window.confirmationResult = confirmationResult;
                }).catch((error) => {
                    console.log(error)
                });
        } else {
            alert("Phone number not registered, please contact to your librarian.")
        }



    }

    const verifyOtp = () => {
        window.confirmationResult.confirm(formData.otp).then((result) => {
            console.log(result.user)
            if (result.user.uid) {
                console.log("fireabse otp success.", result)
                userLogin()
            } else {
                console.log("something wrong.", result)
                alert("wrong otp, please enter again.")
            }
        }).catch((error) => {
            console.log(error)
            alert("wrong otp, please enter again.")
        })
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-9 col-lg-12 col-xl-10">
                        <div className="card  o-hidden border-0 my-5">
                            <div className="card-body p-5">
                                <div className="row">
                                    <div className="col-md-3 col-xl-0"></div>
                                    <div className="col-md-6">
                                        <div className="card shadow mb-3">
                                            <div className="card-header py-3">
                                                <p className="text-primary m-0 fw-bold  text-uppercase text-center">USER LOGIN</p>
                                            </div>
                                            <div className="card-body">

                                                <div className="row">
                                                    <div className="col">
                                                        <div className="mb-3">
                                                            <label className="form-label">
                                                                <strong>Phone number</strong>
                                                            </label>
                                                            <input className="form-control" type="text" name="user_phone"
                                                                value={formData.user_phone}
                                                                onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    sendOtpActive == false &&
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="mb-3">
                                                                <label className="form-label">
                                                                    <strong>Otp</strong>
                                                                </label>
                                                                <input className="form-control" type="text" name="otp"
                                                                    value={formData.otp}
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                <div className="mb-3 mt-3 text-center">
                                                    {/* <a className="btn btn-primary btn-sm px-5" onClick={() => userLogin()} type="submit">Login</a> */}
                                                    {
                                                        sendOtpActive ?
                                                            <>
                                                                <button className="btn btn-primary btn-sm px-5" id="sign-in-button" onClick={() => onSignInSubmit()}>Send Otp</button>
                                                            </> :
                                                            <>
                                                                <button className="btn btn-primary btn-sm px-5" id="sign-in-button" onClick={() => verifyOtp()}>Verify Otp</button>
                                                            </>
                                                    }


                                                </div>
                                                <div className="mb-3 mt-3 text-left">
                                                    {/* {
                                                        sendOtpActive == false &&
                                                        <div className="text-center">
                                                            <button className="btn btn-primary btn-sm px-5" id="sign-in-button" onClick={() => onSignInSubmit()}>Resend Otp</button>
                                                        </div>
                                                    } */}
                                                    <div className="text-center">
                                                        <a className="small" role="button" onClick={() => history.push("admin-login")}>Admin Login</a>
                                                    </div>
                                                </div>




                                                <div id="recaptcha-container"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
