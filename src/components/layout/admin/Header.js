import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setAdminData, setAdminLogin, setUserData, setUserLogin, } from '../../../redux/slice/loginSlice';
import Api from '../../../utils/Api'

export const Header = () => {

    const [msg, setmsg] = React.useState(null);

    let history = useHistory();
    const dispatch = useDispatch();
    const login = useSelector((state) => state.login);
    const { userLogin, adminLogin, adminData, userData } = login;
    // console.log(adminData)

    const [formData, setFormData] = React.useState({
        password: "",
        confirm_password: "",
    });


    function handleChange(evt) {
        const value =
            evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setFormData({
            ...formData,
            [evt.target.name]: value,
        });
    }


    const changePassword = async () => {
        try {
            if (formData.password != formData.confirm_password) {
                alert("Password and confirm password not matching");
            } else {

                if (userLogin) {
                    const updatedData = await Api.Calls(
                        `user/password/${userData.user_id}`,
                        "PUT",
                        { user_password: formData.confirm_password }
                    );
                    console.log(updatedData)
                    if (updatedData.status == 200) {
                        alert("Password is Updated Successfully");
                    } else {
                        alert(updatedData.msg.response.data.message);
                    }
                } else {
                    const updatedData = await Api.Calls(
                        `admin/password/${adminData.admin_id}`,
                        "PUT",
                        { admin_password: formData.confirm_password }
                    );
                    console.log(updatedData)
                    if (updatedData.status == 200) {
                        alert("Password is Updated Successfully");
                    } else {
                        alert(updatedData.msg.response.data.message);
                    }
                }

            }
        } catch (error) { }
    }


    return (
        <>
            <nav class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                <div class="container-fluid">
                    <button class="btn btn-link d-md-none rounded-circle me-3" id="sidebarToggleTop" type="button">
                        <i class="fas fa-bars"></i>
                    </button>
                    <form class="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
                        <h3 class="text-primary m-0 fw-bold " role="button" onClick={() => history.push("/")}>Library Management System</h3>
                    </form>
                    <ul class="navbar-nav flex-nowrap ms-auto">

                        <div class="d-none d-sm-block topbar-divider"></div>
                        <li class="nav-item dropdown no-arrow">
                            <div class="nav-item dropdown no-arrow"><a class="dropdown-toggle nav-link"
                                aria-expanded="false" data-bs-toggle="dropdown" href="#"><span
                                    class="d-none d-lg-inline me-2 text-gray-600 text-uppercase">{adminData.admin_username}</span>
                                <img
                                    class="border rounded-circle img-profile"
                                    src="assets/img/avatars/avatar1.jpeg" />
                            </a>
                                <div class="dropdown-menu shadow dropdown-menu-end animated--grow-in">

                                    {
                                        adminLogin &&
                                        <>
                                            <div class=" dataTables_filter" id="dataTable_filter">
                                                <a class="dropdown-item"
                                                    role="button"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop">
                                                    <i class="fas fa-list fa-sm fa-fw me-2 text-gray-400"></i>Change
                                                    Password</a>
                                            </div>
                                            <div class="dropdown-divider"></div></>
                                    }

                                    <a class="dropdown-item"
                                        role="button"
                                        onClick={() => {
                                            if (userLogin) {
                                                history.push("/user-login");
                                            } else {
                                                history.push("/admin-login");
                                            }
                                            dispatch(setUserLogin(false));
                                            dispatch(setAdminLogin(false));
                                            dispatch(setUserData([]));
                                            dispatch(setAdminData([]));

                                        }}>
                                        <i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400">
                                        </i>Logout
                                    </a>
                                </div>
                            </div>


                            {/* <!-- Modal --> */}
                            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static"
                                data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
                                aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel">Change Password</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="">
                                                <div class="card-body">
                                                    <form>
                                                        <div class="row">
                                                            <div class="col">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="first_name">
                                                                        <strong> New Password</strong>
                                                                    </label>
                                                                    <input className="form-control" type="password" name="password"
                                                                        value={formData.password}
                                                                        onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="row">
                                                            <div class="col">
                                                                <div class="mb-3">
                                                                    <label class="form-label" for="first_name">
                                                                        <strong> Confirm Password</strong>
                                                                    </label>
                                                                    <input className="form-control" type="password" name="confirm_password"
                                                                        value={formData.confirm_password}
                                                                        onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary" onClick={() => changePassword()}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
