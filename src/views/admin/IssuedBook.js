import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { Layout } from '../../components/layout/admin/Layout'
import Api from '../../utils/Api';

export const IssuedBook = () => {

  const [loading, setLoading] = useState(true);
  const [issuedBook, setIssuedBook] = useState();
  const [refresh, setRefresh] = useState(false);

  let history = useHistory();

  const login = useSelector((state) => state.login);
  const { userData } = login;

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const getIssuedBookData = async () => {
    setLoading(true);
    const issuedData = await Api.Calls(`issuedbook/`, "GET");
    console.log(issuedData.data)
    setIssuedBook(issuedData.data);
    setLoading(false);
  };

  useEffect(() => {
    getIssuedBookData();
  }, [refresh]);



  return (
    <Layout>
      <div className="card shadow">
        <div className="card-header py-3">
          <p className="text-primary m-0 fw-bold text-uppercase">All Issued Book</p>
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
              <div className="text-md-end">
                <a className="btn btn-sm btn-primary" type="button" className="btn btn-primary" onClick={() => history.push("select-book")}>Issue a
                  Book</a>
              </div>
            </div>
          </div>
          <div className="table-responsive table mt-2" id="dataTable" role="grid"
            aria-describedby="dataTable_info">
            <table className="table my-0" id="dataTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>User</th>
                  <th>Issued Date</th>
                  <th>Return Date</th>
                  <th>Given By</th>
                  <th>Return Status</th>
                </tr>
              </thead>
              <tbody>

                {
                  issuedBook &&

                  issuedBook.map((d, i) => {
                    return <>

                      <tr>
                        <td>{d.bookModel.book_name}</td>
                        <td>{d.userModel.user_name}</td>
                        <td>{d.issued_date}</td>
                        <td>{d.return_date}</td>
                        <td>{d.adminModel.admin_username}</td>
                        <td>

                          {d.return_status &&
                            (d.return_status == "not returned" ?

                              <button type="button" className="btn btn-danger btn-sm rounded-pill px-3">
                                <span className='text-uppercase'>{d.return_status}</span>
                              </button>
                              :
                              <button type="button" className="btn btn-success btn-sm rounded-pill px-3 text-white">
                                <span className='text-uppercase'>{d.return_status}</span>
                              </button>
                            )
                          }


                        </td>

                      </tr>

                    </>
                  })

                }
 
                {
                  (issuedBook && issuedBook.length == 0) &&
                  <>
                    <tr>
                      <td colSpan={5}>Book not available.</td>
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
      </div >
    </Layout >
  )
}
