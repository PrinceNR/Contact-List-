import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import "./contact.css";
import { getContacts } from "../store/contactSlice";
import Form from "./form";
import DeletePopup from "./deletePopup";

function contacts() {
  const [deletingId, setDeletingId] = useState(null);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(false);
  const [limit, setLimit] = useState(5);
  // const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState({
    limit: limit,
    search: search,
    page: 1,
  });
  const page = 1
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("limit", limit, "page", page);
    
    dispatch(getContacts({ limit, page, search }));
  }, [dispatch, limit, modal,form]);

  const contacts = useSelector((store) => store.contact.contacts);
  const count = useSelector((store) => store.contact.count);
  const totalPages = useSelector((store) => store.contact.totalPages);
  let start = useSelector((store) => store.contact.start);

  console.log(start);

  const toggleModal = () => {
    console.log("its here...");
    setModal(!modal);
    console.log(modal);
  };

  const toggleForm = () => {
    setForm(!form);
    console.log(form);
  };
  const [putData, setPutData] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  let newArray;
  const editData = (data) => {
    console.log(data);
    let splitedName = data.name.split(" ");
    newArray = {
      id: data._id,
      firstName: splitedName[0],
      lastName: splitedName.slice(1).join(" "),
      email: data.email,
      phone: data.phone,
    };
    setPutData(newArray);
    toggleForm();
  };
  const storingID = (id) => {
    setDeletingId(id);
  };
  const colors = ["secondary", "dark", "danger", "success"];
  function getRandomColor() {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
  }

  function profileTag(name) {
    const nameArray = name.trim().split(" ");
    
    let letters =
      nameArray[0].charAt(0).toUpperCase() +
      nameArray[1].charAt(0).toUpperCase();
    return letters;
  }
  
  return (
    <div className="p-5">
      <div></div>
      <div className="pagination10">
        <span>Contact List</span>
        <select
          defaultValue={5}
          className="form-select  numbers"
          id="employeeList"
          onChange={(e) => {
            setLimit(parseInt(e.target.value));
          }}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <p className=" m-0 ">of</p>
        <span>
          <p id="totalLength" className="m-0">
            10
          </p>
        </span>
      </div>
      <span className="contactsCount"> Tottal Contacts {count}</span>
      <div></div>

      <div className="p-5">
        <table className="table">
          <thead>
            <tr className="head-element">
              <th scope="col">
                SI.No <FontAwesomeIcon icon={faAngleDown} />
              </th>
              <th scope="col">
                Name <FontAwesomeIcon icon={faAngleDown} />
              </th>
              <th scope="col">
                Email <FontAwesomeIcon icon={faAngleDown} />
              </th>
              <th scope="col">
                Phone <FontAwesomeIcon icon={faAngleDown} />
              </th>
              <th scope="col">Action </th>
            </tr>
          </thead>
          <tbody>
            {contacts != [] &&
              contacts.map((contact, index) => {
                {
                  start++;
                }
                return (
                  <tr className="table-details" key={index}>
                    <td scope="row">#{start < 9 ? `0${start}` : start}</td>
                    <td className="flexAlign">
                      
                      <div  className={`profileTag bg-${getRandomColor()}`}>
                        {profileTag(contact.name)}
                      </div>
                      {contact.name}
                    </td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td className="d-flex gap-3">
                      <button
                        href="#"
                        className="btn btn-primary"
                        onClick={() => {
                          editData(contact);
                        }}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit
                      </button>
                      <button
                        href="#"
                        onClick={() => {
                          toggleModal();
                          storingID(contact._id);
                        }}
                        className="btn btn-danger"
                      >
                        <FontAwesomeIcon icon={faTrashCan} /> Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
             
          </tbody>
          {/* {
                contacts.length === 0 && (
                  
                    <h3 colSpan="5">No contacts found.</h3>
                  
                )

                // pagination
              } */}
        </table>
      </div>

      {form && <Form add={false} data={putData} toggleModal={toggleForm} />}

      {modal && <DeletePopup toggleModal={toggleModal} id={deletingId} />}
    </div>
  );
}

export default contacts;
