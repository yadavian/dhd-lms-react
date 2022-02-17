import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layout/admin/Layout'
import Api from '../../utils/Api';

export default function Report() {

    const [loading, setloading] = useState(true);
    const [returnBook, setreturnBook] = useState();
    const [countGenre, setcountGenre] = useState();
    const [userCount, setuserCount] = useState();
    const [adminCount, setadminCount] = useState();
    const [bookCount, setbookCount] = useState();
    const [issuedCount, setissuedCount] = useState();
    const [active, setActive] = useState("today")


    const getcountGenreByBook = async () => {
        let changeToarray = [];
        setloading(true);

        const countData = await Api.Calls(`report/count`, "GET");
        console.log(countData);
        setcountGenre(countData.data);

        const returnToday = await Api.Calls(`report/today`, "GET");
        setreturnBook(returnToday.data);
        console.log(returnToday.data);

        const user = await Api.Calls(`user/`, "GET");
        setuserCount(user.data.length);
        console.log(user.data.length);

        const admin = await Api.Calls(`admin/`, "GET");
        setadminCount(admin.data.length);
        console.log(admin.data.length);

        const book = await Api.Calls(`book/`, "GET");
        setbookCount(book.data.length);
        console.log(book.data.length);

        const issued = await Api.Calls(`issuedbook/`, "GET");
        setissuedCount(issued.data.length);
        console.log(issued.data.length);

        setloading(false);
    };

    useEffect(() => {
        getcountGenreByBook();
    }, []);


    return (
        <>
            <Layout>
                <div className="row">
                    <div className="col-md-6 col-xl-3 mb-4" role="button" onClick={() => setActive("genreCount")}>
                        <div className="card shadow border-start-primary py-2">
                            <div className="card-body">
                                <div className="row align-items-center no-gutters">
                                    <div className="col me-2">
                                        <div className="text-uppercase text-primary fw-bold text-xs mb-1" onClick={() => setActive("genre")}>
                                            <span>Total
                                                Books</span>
                                        </div>
                                        <div className="text-dark fw-bold h5 mb-0"><span>{bookCount}</span></div>
                                    </div>
                                    <div className="col-auto"><i className="fas fa-calendar fa-2x text-gray-300"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3 mb-4" role="button" onClick={() => setActive("today")}>
                        <div className="card shadow border-start-warning py-2">
                            <div className="card-body">
                                <div className="row align-items-center no-gutters">
                                    <div className="col me-2">
                                        <div className="text-uppercase text-danger fw-bold text-xs mb-1">
                                            <span>Books To
                                                Return Today</span>
                                        </div>
                                        <div className="text-dark fw-bold h5 mb-0">
                                            <span>{returnBook && returnBook.length}</span>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-comments fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3 mb-4">
                        <div className="card shadow border-start-success py-2">
                            <div className="card-body">
                                <div className="row align-items-center no-gutters">
                                    <div className="col me-2">
                                        <div className="text-uppercase text-success fw-bold text-xs mb-1">
                                            <span>Total User </span>
                                        </div>
                                        <div className="text-dark fw-bold h5 mb-0">
                                            <span>{userCount}</span>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3 mb-4">
                        <div className="card shadow border-start-info py-2">
                            <div className="card-body">
                                <div className="row align-items-center no-gutters">
                                    <div className="col me-2">
                                        <div className="text-uppercase text-info fw-bold text-xs mb-1">
                                            <span>Total Issued Books</span>
                                        </div>
                                        <div className="row g-0 align-items-center">
                                            <div className="col-auto">
                                                <div className="text-dark fw-bold h5 mb-0 me-3">
                                                    <span>{issuedCount}</span>
                                                </div>
                                            </div>
                                            {/* <div className="col">
                                                <div className="progress progress-sm">
                                                    <div className="progress-bar bg-info" aria-valuenow="50"
                                                        aria-valuemin="0" aria-valuemax="100" style={{ width: "50%" }}>
                                                        <span className="visually-hidden">500</span>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    active && active == "today" &&


                    <div className="card shadow">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold text-uppercase">Books to be Return today</p>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 text-nowrap">
                                    <label className="form-label">
                                        {/* <input type="search" className="form-control form-control-sm"
                                            aria-controls="dataTable" placeholder="Search" /> */}
                                    </label>
                                </div>

                            </div>
                            <div className="table-responsive table mt-2" id="dataTable" role="grid"
                                aria-describedby="dataTable_info">
                                <table className="table my-0" id="dataTable">
                                    <thead>
                                        <tr>
                                            <th class="text-uppercase">Book Title</th>
                                            <th class="text-uppercase">ISBN</th>
                                            <th class="text-uppercase">User</th>
                                            <th class="text-uppercase">Phone number</th>
                                            <th class="text-uppercase">Return Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            returnBook &&
                                            returnBook.map((d, i) => {
                                                return <>

                                                    <tr>
                                                        <td>{d.book_name}</td>
                                                        <td>{d.book_isbn}</td>
                                                        <td>{d.user_name}</td>
                                                        <td>{d.user_phone}</td>
                                                        <td><button type="button" className={`btn btn-${d.return_status == "returned" ? "success" : "danger"} btn-sm rounded-pill px-3 text-white`}>
                                                            <strong className='text-uppercase'>{d.return_status}</strong>
                                                        </button></td>
                                                    </tr>

                                                </>
                                            })
                                        }

                                        {
                                            (returnBook && returnBook.length == 0) &&
                                            <>
                                                <tr>
                                                    <td colSpan={5}>No Book to return today.</td>
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

                }
                {
                    active && active != "today" &&

                    <div className="card shadow">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold text-uppercase">Books By Genre</p>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive table mt-2" id="dataTable" role="grid"
                                aria-describedby="dataTable_info">
                                <table className="table my-0" id="dataTable">
                                    <thead>
                                        <tr>
                                            <th class="text-uppercase">Genre</th>
                                            <th class="text-uppercase">Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            countGenre &&
                                            countGenre.map((d, i) => {
                                                return <>

                                                    <tr>
                                                        <td class="text-uppercase">{d.genre_type}</td>
                                                        <td>{d.count}</td>
                                                    </tr>

                                                </>
                                            })
                                        }


                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>

                }
            </Layout>

        </>
    )
}
