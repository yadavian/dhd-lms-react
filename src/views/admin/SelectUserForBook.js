import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Layout } from '../../components/layout/admin/Layout'
import { setIssueBookId } from '../../redux/slice/homeSlice';
import Api from '../../utils/Api';

export const SelectUserForBook = () => {

    const [loading, setloading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState();
    const [refresh, setRefresh] = useState(false);
    let history = useHistory();
    const dispatch = useDispatch();

    const loginData = useSelector((state) => state.login);
    const home = useSelector((state) => state.home);
    const { IssueBookId, IssueUserId } = home;

    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    const getUser = async () => {
        let changeToarray = [];
        setloading(true);
        const getUserData = await Api.Calls(`user/`, "GET");
        setUser(getUserData.data);
        setloading(false);
    };

    useEffect(() => {
        getUser();
    }, [refresh]);

    return (
        <Layout>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold text-uppercase">SELECT USER</p>
                </div>
                <div className="card-body">
                    <div className="row">
                        {/* <div className="col-md-6 text-nowrap">
                            <label className="form-label">
                                <input type="search" className="form-control form-control-sm"
                                    aria-controls="dataTable" placeholder="Search" />
                            </label>
                        </div> */}

                    </div>
                    <div className="table-responsive table mt-2" id="dataTable" role="grid"
                        aria-describedby="dataTable_info">
                        <table className="table my-0" id="dataTable">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Phone</th>
                                    <th>Added By</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {user &&
                                    user.map((d, i) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{d.user_name}</td>
                                                    <td>{d.user_phone}</td>
                                                    <td>{d.adminModel.admin_username}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-primary"
                                                            type="button"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#staticBackdrop1"
                                                            onClick={
                                                                async () => {
                                                                    const data = {
                                                                        admin_id: loginData.adminData.admin_id,
                                                                        book_id: IssueBookId,
                                                                        user_id: d.user_id,
                                                                    };
                                                                    const getIssueData = await Api.Calls(
                                                                        `issuedbook/`,
                                                                        "POST",
                                                                        data
                                                                    );
                                                                    if (getIssueData.status == 201) {
                                                                        // handleTrigger();
                                                                        dispatch(setIssueBookId(null));
                                                                        alert("Book Issued Successfully");
                                                                        history.push("issued-book");
                                                                    } else {
                                                                        alert(getIssueData.msg.response.data.message);
                                                                    }
                                                                }
                                                            }

                                                        >Lend book</button>

                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }

                                {
                                    (user && user.length == 0) &&
                                    <>
                                        <tr>
                                            <td>No User Exist.</td>
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
