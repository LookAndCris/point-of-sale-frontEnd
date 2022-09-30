import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Table } from "antd";
const CutomerPage = () => {
  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();
  const getAllBills = async () => {
    //fetch es una función que nos permite hacer peticiones a un servidor
    try {
      //Muestra el spinner
      dispatch({ type: "SHOW_LOADER" });
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/bills/get-bills"
      );
      setBillsData(data);
      //Oculta el spinner
      dispatch({ type: "HIDE_LOADER" });
    } catch (error) {
      console.log(error);
      //Oculta el spinner
      dispatch({ type: "HIDE_LOADER" });
    }
  };
  //useEffect
  useEffect(() => {
    getAllBills();
  }, []);

  const columns = [
    { title: "ID ", dataIndex: "_id" },
    {
      title: "Cutomer Name",
      dataIndex: "customerName",
    },
    { title: "Contact No", dataIndex: "customerContact" },
  ];

  return (
    <DefaultLayout>
      <h1>Cutomer Page</h1>
      <Table
        columns={columns}
        dataSource={billsData}
        bordered
        pagination={false}
      />
    </DefaultLayout>
  );
};

export default CutomerPage;
