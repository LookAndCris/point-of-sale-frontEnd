import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import { useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";

const BillsPage = () => {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const [bills, setBills] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const getAllBills = async () => {
    //fetch es una función que nos permite hacer peticiones a un servidor
    try {
      //Muestra el spinner
      dispatch({ type: "SHOW_LOADER" });
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/bills/get-bills"
      );
      setBills(data);
      //Oculta el spinner
      dispatch({ type: "HIDE_LOADER" });
    } catch (error) {
      console.log(error);
      //Oculta el spinner
      dispatch({ type: "HIDE_LOADER" });
    }
  };
  //useEffect es un hook que se ejecuta cuando el componente se monta
  useEffect(() => {
    getAllBills();
  }, []);
  //Tabla de datos
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    { title: "Customer Contact", dataIndex: "customerContact" },
    { title: "Subtotal", dataIndex: "subTotal" },
    { title: "I.V.A.", dataIndex: "tax" },
    { title: "Total Amount", dataIndex: "totalAmount" },
    { title: "Payment Mode", dataIndex: "paymentMode" },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  //print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <DefaultLayout>
      {/* En este lugar se pondrá todo lo que se quiere renderizar como contenido, 👇 según el path.  */}
      <div className="d-flex justify-content-between">
        <h1>Invoice List</h1>
      </div>
      <Table columns={columns} dataSource={bills} bordered />
      {popupModal && (
        <Modal
          title="Invoice Details"
          open={popupModal}
          onCancel={() => {
            setPopupModal(false);
          }}
          footer={false}
        >
          {/* ============ invoice modal start ==============  */}
          <div id="invoice-POS" ref={componentRef}>
            <center id="top">
              <div className="logo" />
              <div className="info">
                <h2>Drogueria J</h2>
                <p> Contact : 123456 | Ciudad Colombia</p>
              </div>
              {/*End Info*/}
            </center>
            {/*End InvoiceTop*/}
            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name : <b>{selectedBill.customerName}</b>
                  <br />
                  Phone No : <b>{selectedBill.customerContact}</b>
                  <br />
                  Date : <b>{selectedBill.date.toString().substring(0, 10)}</b>
                  <br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            {/*End Invoice Mid*/}
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2>Item</h2>
                      </td>
                      <td className="Hours">
                        <h2>Qty</h2>
                      </td>
                      <td className="Rate">
                        <h2>Price</h2>
                      </td>
                      <td className="Rate">
                        <h2>Total</h2>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <>
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.price}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {item.quantity * item.price}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}

                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>tax</h2>
                      </td>
                      <td className="payment">
                        <h2>${selectedBill.tax}</h2>
                      </td>
                    </tr>
                    <tr className="tabletitle">
                      <td />
                      <td />
                      <td className="Rate">
                        <h2>Total</h2>
                      </td>
                      <td className="payment">
                        <h2>
                          <b>${selectedBill.totalAmount}</b>
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*End Table*/}
              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your order!</strong> Please note that
                  this is non refundable amount for any assistance please write
                  email
                  <b> help@domain.com</b>
                </p>
              </div>
            </div>
            {/*End InvoiceBot*/}
          </div>
          {/*End Invoice*/}
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
          {/* ============ invoice modal ends ==============  */}
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
