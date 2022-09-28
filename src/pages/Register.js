import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //this is a bad practice for registering users.
  const handleSubmit = async (values) => {
    try {
      //Muestra el spinner
      dispatch({ type: "SHOW_LOADER" });
      await axios.post("http://localhost:8080/api/v1/users/register", values);
      message.success("Register Succesfully");
      navigate("/login");
      //Oculta el spinner
      dispatch({ type: "HIDE_LOADER" });
    } catch (error) {
      message.error("Error adding item");
      console.log(error);
      //Oculta el spinner
      dispatch({ type: "HIDE_LOADER" });
    }
  };

  //Currently Login User
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="register">
        <div className="register-form">
          <h2>Pharmacy</h2>
          <h3>Register APP</h3>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <p>
                Already have an account? <Link to="/login">Login Here!</Link>
              </p>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
