import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Layout } from '../../components/layout/admin/Layout'
import Api from '../../utils/Api';

export const Admin = () => {

    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState();
    const [exits, setExist] = useState(false);
    const login = useSelector((state) => state.login);
    const { adminData, adminLogin } = login;
    const history = useHistory();

    console.log(adminData)

    const [formData, setFormData] = useState({
        admin_username: "",
        admin_role: "librarian",
        admin_password: "",
    });

    function handleChange(evt) {
        const value =
            evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setFormData({
            ...formData,
            [evt.target.name]: value,
        });
    }

    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    useEffect(() => {
        if (adminData.admin_role != "super") {
            if (adminLogin) {
                history.push("/admin");
            } else {
                history.push("/");
            }
        }
    }, []);

    const checkAdminExits = async (e) => {
        const isExits = await Api.Calls(`admin/exits/${e.target.value}`, "GET");
        setExist(isExits.data.success);
    }

    const addAdmin = async () => {

        if (formData.admin_username.length == 0 || formData.user_name == '') {
            alert("please enter user name.")
            return;
        }

        if (formData.admin_password.length == 0 || formData.user_phone == '') {
            alert("please enter password.")
            return;
        }

        if (!exits) {
            const addAdmin = await Api.Calls(
                `admin/`,
                "POST",
                formData
            );
            if (addAdmin.status == 201) {
                handleRefresh();
                alert("Admin Added Successfully");
                setExist(false);
            } else {
                alert("Admin already exist.");
                // alert(addAdmin.msg.response.data.message);
            }
        }
    }


    const getAdmin = async () => {
        setLoading(true);
        const getAdminData = await Api.Calls(`admin/`, "GET");
        setAdmin(getAdminData.data);
        setLoading(false);
    };

    useEffect(() => {
        getAdmin();
    }, [refresh]);


    const [adminSelectedData, setAdminSelectedData] = useState();
    const [selectedAdminId, setSelectedAdminId] = useState(0)

    const getSelectedAdmin = async (selected_admin_id) => {
        setSelectedAdminId(selected_admin_id)
        const getSelectedAdminData = await Api.Calls(`admin/${selected_admin_id}`, "GET");
        console.log(getSelectedAdminData.data)
        setAdminSelectedData(getSelectedAdminData.data)
    }

    React.useEffect(() => {
        // console.log("Use effect called")
        console.log(adminSelectedData)
        // console.log(formData)
        if (selectedAdminId) {
            setFormData({
                admin_username: adminSelectedData && adminSelectedData.admin_username,
                admin_role: adminSelectedData && adminSelectedData.roleModel.roleName,
            });
        }
    }, [adminSelectedData]);


    const updateAdmin = async () => {

        if (formData.admin_username.length == 0 || formData.user_name == '') {
            alert("please enter user name.")
            return;
        }
 

        const updateAdmin = await Api.Calls(
            `admin/${selectedAdminId}`,
            "PUT",
            {
                admin_username: formData.admin_username,
                admin_role: "librarian"
            }
        );
        if (updateAdmin.status == 200) {
            handleRefresh();
            alert("Admin Updated Successfully");
            setExist(false);
        } else {
            alert(updateAdmin.msg.response.data.message);
        }
    }

    const deleteAdmin = async (delete_selected_admin_id) => {
        console.log(delete_selected_admin_id)
        const deleteAdmin = await Api.Calls(
            `admin/${delete_selected_admin_id}`,
            "DELETE"
        );
        if (deleteAdmin.status == 200) {
            handleRefresh();
            alert("Admin Deleted Successfully");
            setExist(false);
        } else {
            alert(deleteAdmin.msg.response.data.message);
        }

    }


    return (
        <Layout>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold  text-uppercase">Admin</p>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 text-nowrap">
                            <label className="form-label">
                                {/* <input type="search" className="form-control form-control-sm"
                                    aria-controls="dataTable" placeholder="Search" /> */}
                            </label>
                        </div>
                        <div className="col-md-6">
                            <div className="text-md-end dataTables_filter" id="dataTable_filter">
                                <button
                                    className="btn btn-sm btn-primary"
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop2"
                                    onClick={
                                        () => {
                                            // console.log(selectedAdminId);
                                            setSelectedAdminId(null);
                                            setFormData({
                                                admin_username: "",
                                                admin_role: "librarian",
                                                admin_password: ""
                                            })
                                            // console.log(formData)
                                        }
                                    }>Add Admin</button>
                            </div>


                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="staticBackdrop2" data-bs-backdrop="static"
                                data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
                                aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">

                                            <h5 className="modal-title" id="staticBackdropLabel">
                                                {
                                                    selectedAdminId == null ?
                                                        (
                                                            "Add "
                                                        )
                                                        :
                                                        (
                                                            "Update"
                                                        )
                                                }
                                                Admin
                                            </h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="">
                                                <div className="card-body">
                                                    <form>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="mb-3">
                                                                    <label className="form-label" for="Admin">
                                                                        <strong>Admin Name</strong>
                                                                    </label>
                                                                    <input className="form-control" type="text" name="admin_username"
                                                                        value={formData.admin_username}
                                                                        onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {
                                                            selectedAdminId == null ?
                                                                (
                                                                    <div className="row">
                                                                        <div className="col">
                                                                            <div className="mb-3">
                                                                                <label className="form-label" for="email">
                                                                                    <strong>Password </strong>
                                                                                </label>
                                                                                <input className="form-control" type="text" name="admin_password"
                                                                                    value={formData.admin_password}
                                                                                    onChange={handleChange} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) :
                                                                (
                                                                    <div className="row">
                                                                        <div className="col">
                                                                            <div className="mb-3">
                                                                                <label className="form-label" for="email">
                                                                                    <strong>Role </strong>
                                                                                </label>
                                                                                <input className="form-control" type="text" name="admin_role"
                                                                                    value={formData.admin_role}
                                                                                    onChange={handleChange} disabled={true} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                        }

                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary"
                                                data-bs-dismiss="modal">Close</button>


                                            {
                                                selectedAdminId == null ?
                                                    (
                                                        <button type="button" className="btn btn-primary" onClick={() => addAdmin()}>Add Admin</button>
                                                    )
                                                    :
                                                    (
                                                        <button type="button" className="btn btn-primary" onClick={() => updateAdmin()}>Update Admin</button>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive table mt-2" id="dataTable" role="grid"
                        aria-describedby="dataTable_info">
                        <table className="table my-0" id="dataTable">
                            <thead>
                                <tr>
                                    <th>Admin Name</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    admin &&
                                    admin.map((d, i) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{d.admin_username}</td>
                                                    <td>{d.roleModel.roleName}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-primary"
                                                            style={{ marginRight: 5 }}
                                                            type="button"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#staticBackdrop2"
                                                            onClick={
                                                                () => {
                                                                    getSelectedAdmin(d.admin_id);
                                                                }
                                                            }
                                                            disabled={d.admin_username == adminData.admin_username ? true : false}
                                                        >Edit</button>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={
                                                                () => {
                                                                    console.log(d.admin_id)
                                                                    deleteAdmin(d.admin_id);
                                                                }
                                                            }
                                                            disabled={d.admin_username == adminData.admin_username ? true : false}
                                                        >Delete</button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }

                                {
                                    (admin && admin.length == 0) &&
                                    <>
                                        <tr>
                                            <td colSpan={5}>Please Add Admin.</td>
                                        </tr>
                                    </>
                                }
                            </tbody>

                        </table>
                    </div>
                    {/* <div className="row">
                        <div className="col-md-6 align-self-center">
                            <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">
                                Showing 1 to 10 of 27</p>
                        </div>
                        <div className="col-md-6">
                            <nav
                                className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                                <ul className="pagination">
                                    <li className="page-item disabled"><a className="page-link" href="#"
                                        aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#" aria-label="Next"><span
                                        aria-hidden="true">»</span></a></li>
                                </ul>
                            </nav>
                        </div>
                    </div> */}
                </div>
            </div>
        </Layout>
    )

}