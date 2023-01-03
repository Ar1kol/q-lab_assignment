import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DoubleClickLabel from "./DoubleClickLabel";
import {
  getUsersAsync,
  selectRows,
  selectUsers,
  changeRowsAmount,
  updateUser,
  deleteUser,
  selectDeletedUsers
} from "../features/userSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { BiFemale, BiMale } from "react-icons/bi";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rows = useSelector(selectRows);
  const users = useSelector(selectUsers);
  const deletedUsers = useSelector(selectDeletedUsers);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const rowsAmount = [{ amount: 10 }, { amount: 20 }, { amount: 30 }];

  const onAmountChange = (e) => {
    dispatch(changeRowsAmount(e.value.amount));
  };

  const updateUserData = (rowData) => {
    dispatch(
      updateUser({
        userId: rowData.login.uuid,
        phone: phoneNumber,
        email: email,
        firstName: firstName,
        lastName: lastName,
      })
    );
  };

  const removeUser = (rowData) => {
    console.log(rowData);
    dispatch(deleteUser(rowData.login.uuid));
    setPhoneNumber("");
    setEmail("");
    setFirstName("");
    setLastName("");
  };

  const handleNavigate = (data) => {
    navigate(`user/${data.rowData.login.uuid}`);
  };

  const rightToolbarTemplate = () => {
    return (
      <>
        <Dropdown
          value={rows}
          options={rowsAmount}
          onChange={onAmountChange}
          optionLabel="amount"
          placeholder={rows}
        />
      </>
    );
  };

  const idTemplate = (rowData, rowIndex) => {
    return (
      <Button
        onClick={() => handleNavigate({ rowData })}
        label={rowIndex.rowIndex + 1}
      ></Button>
    );
  };

  const genderTemplate = (rowData) => {
    if (rowData.gender === "male") {
      return (
        <h1 style={{ color: "blue" }}>
          <BiMale />
        </h1>
      );
    }
    return (
      <h1 style={{ color: "red" }}>
        <BiFemale />
      </h1>
    );
  };

  const updateTemplate = (rowData) => {
    return (
      <Button
        label="Update"
        className="p-button-info"
        onClick={() => updateUserData(rowData)}
      />
    );
  };

  const deleteTemplate = (rowData) => {
    return (
      <Button
        label="Delete"
        className="p-button-danger"
        onClick={() => removeUser(rowData)}
      />
    );
  };

  useEffect(() => {
    console.log(rows);
    console.log(deletedUsers.length);
    dispatch(getUsersAsync(rows + deletedUsers.length));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  useEffect(() => {
    console.log(users);
  }, [dispatch, users]);

  return (
    <div className="card">
      <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
      <DataTable
        value={users}
        responsiveLayout="scroll"
        style={{ textAlign: "center" }}
      >
        <Column field="SN" header="SN" body={idTemplate} />
        <Column
          header="First Name"
          body={(rowData) => (
            <DoubleClickLabel
              value={rowData.name.first}
              setInputData={setFirstName}
            />
          )}
        />
        <Column
          header="Last Name"
          body={(rowData) => (
            <DoubleClickLabel
              value={rowData.name.last}
              setInputData={setLastName}
            />
          )}
        />
        <Column
          header="Email"
          body={(rowData) => (
            <DoubleClickLabel value={rowData.email} setInputData={setEmail} />
          )}
        />
        <Column
          header="Phone"
          body={(rowData) => (
            <DoubleClickLabel
              value={rowData.phone}
              setInputData={setPhoneNumber}
            />
          )}
        />
        <Column header="Gender" body={(rowData) => genderTemplate(rowData)} />
        <Column field="update" header="Update" body={updateTemplate} />
        <Column field="delete" header="Delete" body={deleteTemplate} />
      </DataTable>
    </div>
  );
};

export default Users;
