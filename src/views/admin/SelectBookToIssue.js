import { Alert, Button, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Layout } from '../../components/layout/admin/Layout'
import { setIssueBookId } from '../../redux/slice/homeSlice';
import Api from '../../utils/Api';

export const SelectBookToIssue = () => {

    const [loading, setloading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [book, setBook] = useState();

    let history = useHistory();
    const dispatch = useDispatch();


    const loginData = useSelector((state) => state.login);

    //CHANGES VALUE TO T OR F SO THAT USE EFFECT WILL REFRESH DATA
    const handleRefresh = () => {
        setRefresh(!refresh);
    };

    //GET BOOK IN ARRAY OF OBJECT
    const getBook = async () => {
        let changeToarray = [];
        setloading(true);
        const getbookData = await Api.Calls(`book/`, "GET");
        // console.log(countData);
        if (getbookData.data.length > 0) {
            getbookData.data.map((d, i) => {
                changeToarray.push({
                    // id:i+1,
                    id: d.book_id,
                    book_name: d.book_name,
                    book_isbn: d.book_isbn,
                    book_quantity: d.book_quantity,
                    book_author: d.book_author,
                    genre: d.genreModel.genre_type,
                });
            });
        }

        console.log(getbookData.data)
        setBook(getbookData.data);
        setloading(false);
    }

    useEffect(() => {
        getBook();
    }, [refresh]);



    return (
        <>
            <Layout>
                {loading ? (
                    <h2>loading......</h2>
                ) : (

                    <>
                        <div className="card shadow">
                            <div className="card-header py-3">
                                <p className="text-primary m-0 fw-bold text-uppercase">SELECT BOOK </p>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 text-nowrap">
                                        <label className="form-label">
                                            <input type="search" className="form-control form-control-sm"
                                                aria-controls="dataTable" placeholder="Search" />
                                        </label>
                                    </div>

                                </div>
                                <div className="table-responsive table mt-2" id="dataTable" role="grid"
                                    aria-describedby="dataTable_info">

                                    <table className="table my-0" id="dataTable">
                                        <thead>
                                            <tr>
                                                {/* <!-- <th>Book Id</th> --> */}
                                                <th>Title</th>
                                                <th>ISBN</th>
                                                <th>Quantity</th>
                                                <th>Author</th>
                                                <th>Genre</th>
                                                <th>Added By</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {book && book.map((d, i) => {
                                                return <>
                                                    <tr>
                                                        <td>{d.book_name}</td>
                                                        <td>{d.book_isbn}</td>
                                                        <td>{d.book_quantity}</td>
                                                        <td>{d.authorModel.authorName}</td>
                                                        <td>{d.genreModel.genre_type}</td>
                                                        <td>{d.adminModel.admin_username}</td>
                                                        <td>

                                                            <button
                                                                className="btn btn-sm btn-primary"
                                                                type="button"
                                                                data-bs-toggle="modal"
                                                                data-bs-target="#staticBackdrop1"
                                                                disabled={d.book_quantity == 0 ? true : false}
                                                                onClick={
                                                                    () => {
                                                                        if (d.book_quantity == 0) {
                                                                            alert("Book is not availble.")
                                                                        } else {
                                                                            dispatch(setIssueBookId(d.book_id));
                                                                            history.push("select-user");
                                                                        }
                                                                    }
                                                                }
                                                            >select </button>
                                                        </td>
                                                    </tr>
                                                </>
                                            })}

                                            {
                                                (book && book.length == 0) &&
                                                <>
                                                    <tr>
                                                        <td>No Book Exist.</td>
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
                    </>
                )
                }
            </Layout>

        </>
    )
}
