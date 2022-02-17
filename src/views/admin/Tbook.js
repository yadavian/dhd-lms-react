import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Layout } from '../../components/layout/admin/Layout'
import Api from '../../utils/Api';

export const Tbook = () => {

    const [loading, setloading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [book, setBook] = useState();
    // const [open, setOpen] = React.useState(false);
    const [exist, setBookExist] = useState(false);


    const loginData = useSelector((state) => state.login);

    //FOR TAKING INPUT FOR ADDING BOOKS
    const [formData, setFormData] = React.useState({
        book_name: "",
        book_isbn: 0,
        book_quantity: 0,
        book_author: "",
        genre_type: "",
        admin_id: loginData.adminData.admin_id
    });


    function handleChange(evt) {
        const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setFormData({
            ...formData,
            [evt.target.name]: value
        });
    }

    console.log(formData)

    // FIRST CHECKS IF BOOK ID isexist
    const checkBookExist = async () => {
        const isExist = await Api.Calls(`book/exits/${formData.book_name}`, "GET");
        setBookExist(isExist.data.success);
        console.log(isExist.data.success)
    }

    //FIRST CHECK BOOK EXIST IF YES => THEN ADD QUANTITY ONLY
    //ELSE ADD WHOLE OBJECT
    const addBook = async () => {

        if (formData.book_name.length == 0 || formData.book_name == '') {
            alert("please enter book name.")
            return;
        }

        if (formData.book_isbn.length == 0 || formData.book_isbn == '') {
            alert("please enter isbn.")
            return;
        }

        if (formData.book_quantity.length == 0 || formData.book_quantity == '') {
            alert("please enter quantity.")
            return;
        }

        if (formData.book_author.length == 0 || formData.book_author == '') {
            alert("please enter author.")
            return;
        }

        if (formData.genre_type.length == 0 || formData.genre_type == '') {
            alert("please enter genre.")
            return;
        }

        await checkBookExist();

        console.log(exist)

        if (exist && exist == true) {
            const data = {
                book_name: formData.book_name,
                book_quantity: formData.book_quantity,
            };
            const bookUpdate = await Api.Calls(
                `book/quantity`,
                "PUT",
                data
            );
            if (bookUpdate.status == 200) {
                handleRefresh();
                alert("Book Already exist. Quantity Updated.");
                setBookExist(false);
            } else {
                alert(bookUpdate.msg.response.data.message);
            }
        } else {
            const addbook = await Api.Calls(
                `book/`,
                "POST",
                formData
            );
            // console.log(addbook)
            if (addbook.status == 201) {
                handleRefresh();
                alert("Book Added Successfully.");
                setBookExist(false);
            } else {
                alert(addbook.msg.response.data.message);
            }
        }
        // console.log(formData);
        // setOpen(false);
    }

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

    //UPDATE BOOK
    const [selectedBookId, setSelectedBookId] = useState()
    const [bookSelectedData, setBookSelectedData] = useState()

    const getSelectedBook = async (selected_book_id) => {
        setSelectedBookId(selected_book_id)
        const getSelectedBookData = await Api.Calls(`book/${selected_book_id}`, "GET");
        console.log(getSelectedBookData.data)
        setBookSelectedData(getSelectedBookData.data)
    }


    useEffect(() => {
        console.log(bookSelectedData)
        console.log(selectedBookId)
        // console.log(formData)
        if (selectedBookId) {
            setFormData({
                book_name: bookSelectedData && bookSelectedData.book_name,
                book_isbn: bookSelectedData && bookSelectedData.book_isbn,
                book_quantity: bookSelectedData && bookSelectedData.book_quantity,
                book_author: bookSelectedData && bookSelectedData.authorModel.authorName,
                genre_type: bookSelectedData && bookSelectedData.genreModel.genre_type

                // user_name: bookSelectedData && bookSelectedData.user_name,
                // user_phone: bookSelectedData && bookSelectedData.user_phone,
                // admin_id: loginData.adminData.admin_id
            }
            );
        }
    }, [bookSelectedData]);


    const updateBook = async () => {

        if (formData.book_name.length == 0 || formData.book_name == '') {
            alert("please enter book name.")
            return;
        }

        if (formData.book_isbn.length == 0 || formData.book_isbn == '') {
            alert("please enter isbn.")
            return;
        }

        if (formData.book_quantity.length == 0 || formData.book_quantity == '') {
            alert("please enter quantity.")
            return;
        }

        if (formData.book_author.length == 0 || formData.book_author == '') {
            alert("please enter author.")
            return;
        }

        if (formData.genre_type.length == 0 || formData.genre_type == '') {
            alert("please enter genre.")
            return;
        }

        const getBookData = await Api.Calls(
            `book/${selectedBookId}`,
            "PUT",
            {
                book_name: formData.book_name,
                book_isbn: formData.book_isbn,
                book_quantity: formData.book_quantity,
                book_author: formData.book_author,
                genre_type: formData.genre_type,
                admin_id: loginData.adminData.admin_id
            }
        );
        if (getBookData.status == 200) {
            handleRefresh();
            alert("Book Updated Successfully");
        } else {
            alert(getBookData.msg.response.data.message);
        }
    }

    const deleteBook = async (selected_book_id) => {

        const deleteBook = await Api.Calls(
            `book/${selected_book_id}`,
            "DELETE"
        );
        if (deleteBook.status == 200) {
            handleRefresh();
            alert("Book Deleted Successfully");
            setBookExist(false);
        } else {
            alert(deleteBook.msg.response.data.message);
        }

    }


    //Search Book
    const [searchBookFormData, setSearchBookFormData] = React.useState({
        bookSearch: ""
    })
    console.log(searchBookFormData.bookSearch)

    const [tempBook, setTempBook] = useState([])

    let filteredData;

    function filterByValue(string) {
        filteredData = book.filter(o =>
            Object.keys(o).some(k =>
                (typeof o[k] != "number" && typeof o[k] != "object") &&
                o[k].toLowerCase().includes(string.toLowerCase())
                // console.log(o[k])
            ));

        console.log("filteredData =>>", filteredData)
        // console.log("book filtered =>>", book)
        setTempBook(filteredData);
    }


    // const arrayOfObject = [
    //     { name: 'Paul', country: 'Canada', },
    //     { name: 'Lea', country: 'Italy', },
    //     { name: 'John', country: 'Italy' }
    // ];

    // filterByValue(book, 'java'); // [{name: 'Lea', country: 'Italy'}]
    // console.log(filterByValue(arrayOfObject, 'ita'));


    return (
        <Layout>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold text-uppercase">User</p>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 text-nowrap">
                            <label className="form-label">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="bookSearch"
                                    placeholder="Search Book"
                                    value={formData.bookSearch}
                                    onChange={
                                        (e) => {
                                            filterByValue(e.target.value)
                                        }
                                    }
                                />
                            </label>
                        </div>
                        <div className="col-md-6">
                            <div className="text-md-end dataTables_filter" id="dataTable_filter">
                                <button className="btn btn-sm btn-primary" type="button" className="btn btn-primary"
                                    data-bs-toggle="modal" data-bs-target="#staticBackdrop1"
                                    onClick={
                                        () => {
                                            setSelectedBookId(null);
                                            console.log(selectedBookId);
                                            setFormData({
                                                book_name: "",
                                                book_isbn: "",
                                                book_quantity: "",
                                                book_author: "",
                                                genre_type: "",
                                                admin_id: loginData.adminData.admin_id
                                            })
                                            // console.log(formData)
                                        }
                                    }
                                >Add Book</button>
                            </div>


                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static"
                                data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
                                aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="staticBackdropLabel">
                                                {
                                                    selectedBookId == null ? "Add " : "Update "
                                                }
                                                Book
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
                                                                    <label className="form-label" for="username">
                                                                        <strong>BookName</strong>
                                                                    </label>
                                                                    <input className="form-control" type="text" name="book_name"
                                                                        value={formData.book_name}
                                                                        onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="mb-3">
                                                                    <label className="form-label" for="email">
                                                                        <strong>ISBN</strong>
                                                                    </label>
                                                                    <input className="form-control" type="text" name="book_isbn"
                                                                        value={formData.book_isbn}
                                                                        onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="mb-3">
                                                                    <label className="form-label" for="first_name">
                                                                        <strong>Quantity</strong>
                                                                    </label>
                                                                    <input className="form-control" type="text" name="book_quantity"
                                                                        value={formData.book_quantity}
                                                                        onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="mb-3">
                                                                    <label className="form-label" for="last_name">

                                                                        <strong>Author
                                                                            Name</strong></label>
                                                                    <input className="form-control" type="text" name="book_author"
                                                                        value={formData.book_author}
                                                                        onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="mb-3">
                                                                    <label className="form-label" for="first_name">
                                                                        <strong>Genre
                                                                            Name</strong>
                                                                    </label>
                                                                    <input className="form-control" type="text" name="genre_type"
                                                                        value={formData.genre_type}
                                                                        onChange={handleChange} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <!-- <div className="mb-3"><button className="btn btn-primary btn-sm" type="submit">Save Settings</button></div> --> */}
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary"
                                                data-bs-dismiss="modal">Close</button>

                                            {
                                                selectedBookId == null ?
                                                    (
                                                        <button type="button" className="btn btn-primary" onClick={() => addBook()}>Add Book</button>
                                                    )
                                                    :
                                                    (
                                                        <button type="button" className="btn btn-primary" onClick={() => updateBook()}>Update Book</button>
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

                                {
                                    tempBook.length > 0
                                        ?
                                        <>
                                            {tempBook && tempBook.map((d, i) => {
                                                return <>

                                                    <tr>
                                                        <td>{d.book_name}</td>
                                                        <td>{d.book_isbn}</td>
                                                        <td>{d.book_quantity}</td>
                                                        <td>{d.authorModel.authorName}</td>
                                                        <td>{d.genreModel.genre_type}</td>
                                                        <td>{d.adminModel.admin_username}</td>
                                                        <td>

                                                            <button className="btn btn-sm btn-primary" style={{ marginRight: 5 }} type="button" data-bs-toggle="modal"
                                                                data-bs-target="#staticBackdrop1"

                                                                onClick={
                                                                    () => {
                                                                        getSelectedBook(d.book_id);
                                                                    }
                                                                }

                                                            >Edit</button>
                                                            <button className="btn btn-danger btn-sm"

                                                                onClick={
                                                                    () => {
                                                                        deleteBook(d.book_id);
                                                                    }
                                                                }

                                                            >Delete</button>
                                                        </td>
                                                    </tr>

                                                </>
                                            })}
                                        </>
                                        :
                                        <>
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

                                                            <button className="btn btn-sm btn-primary" style={{ marginRight: 5 }} type="button" data-bs-toggle="modal"
                                                                data-bs-target="#staticBackdrop1"

                                                                onClick={
                                                                    () => {
                                                                        getSelectedBook(d.book_id);
                                                                    }
                                                                }

                                                            >Edit</button>
                                                            <button className="btn btn-danger btn-sm"

                                                                onClick={
                                                                    () => {
                                                                        deleteBook(d.book_id);
                                                                    }
                                                                }

                                                            >Delete</button>
                                                        </td>
                                                    </tr>

                                                </>
                                            })}
                                        </>
                                }

                                {
                                    (book && book.length == 0) &&
                                    <>
                                        <tr>
                                            <td>Book not available.</td>
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
