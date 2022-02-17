import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { setAdminData, setAdminLogin, setUserData, setUserLogin } from '../../redux/slice/loginSlice';
import Api from '../../utils/Api';

export const AdminLogin = () => {
    let history = useHistory();
    const dispatch = useDispatch();

    const loginData = useSelector((state) => state.login);

    const [formData, setFormData] = React.useState({
        admin_username: "",
        admin_password: "",
    })

    function handleChange(evt) {
        const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setFormData({
            ...formData,
            [evt.target.name]: value
        });
    }

    const adminLogin = async () => {
        if (formData.admin_username.length == 0 || formData.admin_username == '') {
            alert("please enter username.")
            return;
        }

        if (formData.admin_password.length == 0 || formData.admin_password == '') {
            alert("please enter password.")
            return;
        }

        console.log(loginData)
        console.log(formData)
        try {
            const loginData = await Api.Calls("admin/login", "POST", formData);
            if (loginData.status == 200) {
                dispatch(setUserLogin(false));
                dispatch(setAdminLogin(true));
                dispatch(setAdminData(loginData.data));
                dispatch(setUserData([]));
                history.push("/");
            } else {
                alert("Wrong username and password.",loginData.msg.response.data.message);
                console.log(loginData.msg.response.data.message);
            }
        } catch (error) { }
    };


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
    };


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
                                                <p className="text-primary m-0 fw-bold text-center  text-uppercase">ADMIN LOGIN</p>
                                            </div>
                                            <div className="card-body">
                                                <form>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="mb-3"><label className="form-label"
                                                                for="username"><strong>Username</strong></label>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    name="admin_username"
                                                                    value={formData.admin_username}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="mb-3">
                                                                <label className="form-label"
                                                                    for="first_name"><strong>Password</strong></label>
                                                                <input className="form-control" type="password" name="admin_password"
                                                                    value={formData.admin_password}
                                                                    onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 mt-3 text-center">
                                                        <a className="btn btn-primary btn-sm px-5" onClick={() => adminLogin()} type="submit">Login</a>
                                                    </div>
                                                    <div className="mb-3 mt-3 text-left">

                                                        {/* <div className="text-center">
                                                            <a className="small"
                                                                href="forgot-password.html">Forgot Password?</a>
                                                        </div> */}
                                                        <div className="text-center"><a role="button" onClick={() => history.push("user-login")} className="small" >User
                                                            Login</a>
                                                        </div>
                                                    </div>
                                                </form>
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
