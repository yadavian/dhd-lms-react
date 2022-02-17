import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

export const SideMenu = () => {

    let history = useHistory();
    const loginData = useSelector((state) => state.login);
    console.log(loginData)
    const { adminData } = loginData;

    return (
        <>

            <nav class="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
                <div class="container-fluid d-flex flex-column p-0">
                    <a class="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                        {/* <!-- <div class="sidebar-brand-icon rotate-n-15"><i class="fas fa-laugh-wink"></i></div> --> */}
                        <div class="sidebar-brand-text mx-3" onClick={() => history.push("/")}><span>DHD Library </span></div>
                    </a>
                    <hr class="sidebar-divider my-0" />
                    <ul class="navbar-nav text-light" id="accordionSidebar">

                        <li class="nav-item">
                            <a class="nav-link" role="button" onClick={() => history.push("/book")}>
                                {/* <!-- <i class="fa-solid fa-book-atlas"></i> --> */}
                                <span >Book</span>
                            </a>
                        </li>
                        <li class="nav-item" role="button" onClick={() => history.push("/user")}>
                            <a class="nav-link " >
                                {/* <!-- <i class="fas fa-tachometer-alt"></i> --> */}
                                <span>User</span>
                            </a>
                        </li>
                        <li class="nav-item" role="button" onClick={() => history.push("/issued-book")}>
                            <a class="nav-link" >
                                {/* <!-- <i class="fas fa-tachometer-alt"></i> --> */}
                                <span>Issued Book</span>
                            </a>
                        </li>
                        <li class="nav-item" role="button" onClick={() => history.push("/return-book")}>
                            <a class="nav-link ">
                                {/* <!-- <i class="fas fa-tachometer-alt"></i> --> */}
                                <span>Return Book</span>
                            </a>
                        </li>
                        <li class="nav-item" role="button" onClick={() => history.push("/report")}>
                            <a class="nav-link"  >
                                {/* <!-- <i class="fas fa-tachometer-alt"></i> --> */}
                                <span>Report</span>
                            </a>
                        </li>
                        {
                            (adminData && adminData.admin_username == "super") &&
                            <li class="nav-item" role="button" onClick={() => history.push("/admin")}>
                                <a class="nav-link" >
                                    {/* <!-- <i class="fas fa-tachometer-alt"></i> --> */}
                                    <span>Admin</span>
                                </a>
                            </li>
                        }






                    </ul>
                    {/* <div class="text-center d-none d-md-inline">
                        <button class="btn rounded-circle border-0" id="sidebarToggle" type="button"></button>
                    </div> */}
                </div>
            </nav>

        </>
    )
}
