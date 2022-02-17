import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Layout } from '../../components/layout/admin/Layout'
import Api from '../../utils/Api';

export const User = () => {

  const [loading, setloading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState();
  const [exits, setExist] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const loginData = useSelector((state) => state.login);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const [formData, setFormData] = useState({
    user_name: "",
    user_phone: "",
    user_password: "12345",
    admin_id: loginData.adminData.admin_id
  });

  function handleChange(evt) {
    const value =
      evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    setFormData({
      ...formData,
      [evt.target.name]: value,
    });
  }

  const checkUserExits = async (e) => {
    const isExits = await Api.Calls(`user/exits/${formData.user_phone}`, "GET");
    console.log(isExits)
    setExist(isExits.data.success);
  }

  const addUser = async () => {


    if (formData.user_name.length == 0 || formData.user_name == '') {
      alert("please enter user name.")
      return;
    }

    if (formData.user_phone.length == 0 || formData.user_phone == '') {
      alert("please enter password.")
      return;
    }

    await checkUserExits();
    console.log(formData)
    if (!exits) {
      const addUser = await Api.Calls(
        `user/`,
        "POST",
        formData
      );
      console.log(addUser);
      if (addUser.status == 201) {
        handleRefresh()
        alert("User Successfully Added.");
      } else {
        alert("User Already Exist.");
        // alert(addUser.msg.response.data.message);
      }
      setOpen(false);
    } else {
      alert("User Already Exist.");
    }
  }

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



  //update user

  const [selectedUserId, setSelectedUserId] = useState()
  const [userSelectedData, setUserSelectedData] = useState()

  const getSelectedUser = async (selected_user_id) => {
    setSelectedUserId(selected_user_id)
    const getSelectedUserData = await Api.Calls(`user/${selected_user_id}`, "GET");
    console.log(getSelectedUserData.data)
    setUserSelectedData(getSelectedUserData.data)
  }

  useEffect(() => {
    console.log(userSelectedData)
    // console.log(formData)
    if (selectedUserId) {
      setFormData({
        user_name: userSelectedData && userSelectedData.user_name,
        user_phone: userSelectedData && userSelectedData.user_phone,
        admin_id: loginData.adminData.admin_id
      }
      );
    }
  }, [userSelectedData]);



  const updateUser = async () => {



    if (formData.user_name.length == 0 || formData.user_name == '') {
      alert("please enter user name.")
      return;
    }

    if (formData.user_phone.length == 0 || formData.user_phone == '') {
      alert("please enter phone number.")
      return;
    }

    const updateUser = await Api.Calls(
      `user/${selectedUserId}`,
      "PUT",
      {
        user_name: formData.user_name,
        user_phone: formData.user_phone,
        admin_id: loginData.adminData.admin_id
      }
    );
    if (updateUser.status == 200) {
      handleRefresh();
      alert("User Updated Successfully");
      setExist(false);
    } else {
      alert(updateUser.msg.response.data.message);
    }
  }

  const deleteUser = async (delete_selected_user_id) => {
    const deleteAdmin = await Api.Calls(
      `user/${delete_selected_user_id}`,
      "DELETE"
    );
    if (deleteAdmin.status == 200) {
      handleRefresh();
      alert("User Deleted Successfully");
      setExist(false);
    } else {
      alert(deleteAdmin.msg.response.data.message);
    }

  }


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
                {/* <input type="search" className="form-control form-control-sm"
                  aria-controls="dataTable" placeholder="Search" /> */}
              </label>
            </div>
            <div className="col-md-6">
              <div className="text-md-end dataTables_filter" id="dataTable_filter">
                <button className="btn btn-sm btn-primary" type="button" className="btn btn-primary"
                  data-bs-toggle="modal" data-bs-target="#staticBackdrop1"
                  onClick={
                    () => {
                      // console.log(selectedAdminId);
                      setSelectedUserId(null);
                      setFormData({
                        user_name: "",
                        user_phone: "",
                        user_password: "12345",
                        admin_id: loginData.adminData.admin_id
                      })
                      // console.log(formData)
                    }
                  }
                >Add User</button>
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
                          selectedUserId == null ?
                            (
                              "Add "
                            )
                            :
                            (
                              "Update"
                            )
                        }
                        User
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
                                    <strong>User Name</strong>
                                  </label>
                                  <input className="form-control" type="text" name="user_name"
                                    value={formData.user_name}
                                    onChange={handleChange} />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="mb-3">
                                  <label className="form-label" for="email">
                                    <strong>Phone</strong>
                                  </label>
                                  <input className="form-control" type="text" name="user_phone"
                                    value={formData.user_phone}
                                    onChange={handleChange} />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary"
                        data-bs-dismiss="modal">Close</button>

                      {
                        selectedUserId == null ?
                          (
                            <button type="button" className="btn btn-primary" onClick={() => addUser()}>Add User</button>
                          )
                          :
                          (
                            <button type="button" className="btn btn-primary" onClick={() => updateUser()}>Update User</button>
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
                            <button className="btn btn-sm btn-primary" style={{ marginRight: 5 }} type="button" data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop1"
                              onClick={
                                () => {
                                  getSelectedUser(d.user_id);
                                }
                              }


                            >Edit</button>
                            <button className="btn btn-danger btn-sm"
                              onClick={() => deleteUser(d.user_id)}
                            >Delete</button>
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
