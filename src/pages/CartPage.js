import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Table, Button, Modal, message, Form, Input, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.rootReducer);
  const navigate = useNavigate();
  // Handle Increase Quantity
  const handleIncrement = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };
  const handleDecrement = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncrement(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleDecrement(record)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() => dispatch({ type: "DELETE_FROM_CART", payload: id })}
        />
      ),
    },
  ];

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setSubTotal(total);
  }, [cartItems]);

  // Handle Submit Bill
  const handleSubmit = async (values) => {
    try {
      const newObject = {
        ...values,
        subTotal: subTotal,
        tax: (subTotal * 0.19).toFixed(2),
        totalAmount: (subTotal + subTotal * 0.19).toFixed(2),
        cartItems: cartItems,
        userId: JSON.parse(localStorage.getItem("auth"))._id,
      };
      console.log(newObject);
      const response = await axios.post(
        "http://localhost:8080/api/v1/bills/add-bill",
        newObject
      );
      console.log(response);
      message.success("Bill Generated Successfully");
      navigate("/bills");
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <h1>Cart Page</h1>
      <Table columns={columns} dataSource={cartItems} bordered />
      <div className="d-flex flex-column align-items-end">
        <h3>Sub Total: {subTotal}</h3>
        <Button
          type="primary"
          onClick={() => {
            setBillPopup(true);
          }}
        >
          Create Invoice
        </Button>
        <Modal
          title="Create Invoice"
          visible={billPopup}
          onCancel={() => setBillPopup(false)}
          footer={false}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="customerName" label="Customer Name">
              <Input />
            </Form.Item>
            <Form.Item name="customerContact" label="Customer Contact">
              <Input />
            </Form.Item>

            <Form.Item name="paymentMode" label="Payment Method">
              <Select>
                <Select.Option value="cash">Cash</Select.Option>
                <Select.Option value="digital">Digital</Select.Option>
              </Select>
            </Form.Item>
            <div className="bill-item">
              <h5>Sub Total: {subTotal}</h5>
              <h4>
                I.V.A: <b> {(subTotal * 0.19).toFixed(2)}</b>
              </h4>
              <h3>
                TOTAL:{" "}
                <b>{Number(subTotal) + Number((subTotal * 0.19).toFixed(2))}</b>
              </h3>
            </div>
            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Generate Bill
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </DefaultLayout>
  );
};

export default CartPage;
