import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";

const ItemPage = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [editItems, setEditItems] = useState(null);
  const [popupModal, setPopupModal] = useState(false);

  const getAllItems = async () => {
    //fetch es una función que nos permite hacer peticiones a un servidor
    try {
      //Muestra el spinner
      dispatch({ type: "SHOW_LOADER" });
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/items/get-item"
      );
      setItems(data);
      console.log(data);
      setItems(data);
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
    getAllItems();
  }, []);
  //Tabla de datos
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
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(record);
            }}
          />
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditItems(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  //Formulario
  const handleSubmit = async (values) => {
    if (editItems === null) {
      try {
        //Muestra el spinner
        dispatch({ type: "SHOW_LOADER" });
        const response = await axios.post(
          "http://localhost:8080/api/v1/items/add-item",
          values
        );
        console.log(response);
        message.success("Item added successfully");
        getAllItems();
        setPopupModal(false);
        //Oculta el spinner
        dispatch({ type: "HIDE_LOADER" });
      } catch (error) {
        message.error("Error adding item");
        console.log(error);
        //Oculta el spinner
        dispatch({ type: "HIDE_LOADER" });
      }
    } else {
      try {
        //Muestra el spinner
        dispatch({ type: "SHOW_LOADER" });
        await axios.put("http://localhost:8080/api/v1/items/edit-item", {
          ...values,
          itemId: editItems._id,
        });
        message.success("Item Updated Succesfully");
        getAllItems();
        setPopupModal(false);
        dispatch({ type: "HIDE_LOADING" });
        //Oculta el spinner
        dispatch({ type: "HIDE_LOADER" });
      } catch (error) {
        message.error("Error updating item");
        console.log(error);
        //Oculta el spinner
        dispatch({ type: "HIDE_LOADER" });
      }
    }
  };

  //Eliminar
  const handleDelete = async (record) => {
    try {
      //Muestra el spinner
      dispatch({ type: "SHOW_LOADER" });
      // Tengo un problema con el delete, sin embargo funciona bien con el post.
      await axios.post("http://localhost:8080/api/v1/items/delete-item", {
        itemId: record._id,
      });
      message.success("Item deleted successfully");
      setPopupModal(false);
      getAllItems();
      //Oculta el spinner
      dispatch({ type: "HIDE_LOADER" });
    } catch (error) {
      message.error("Error deleting item");
      console.log(error);
      dispatch({ type: "HIDE_LOADER" });
    }
  };

  return (
    <DefaultLayout>
      {/* En este lugar se pondrá todo lo que se quiere renderizar como contenido, 👇 según el path.  */}
      <div className="d-flex justify-content-between">
        <h1>Item List</h1>
        <Button type="primary" onClick={() => setPopupModal(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={items} bordered />
      {popupModal && (
        <Modal
          title={`${editItems !== null ? "Edit" : "Add"} Item`}
          open={popupModal}
          onCancel={() => {
            setEditItems(null);
            setPopupModal(false);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItems}
            onFinish={handleSubmit}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="1">Option 1</Select.Option>
                <Select.Option value="2">Option 2</Select.Option>
                <Select.Option value="3">Option 3</Select.Option>
                <Select.Option value="4">Option 4</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default ItemPage;
