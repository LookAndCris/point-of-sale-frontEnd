import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      //Muestra el spinner
      dispatch({ type: "SHOW_LOADER" });
      const res = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        values
      );
      console.log(res.data);
      if (res.data.user !== null) {
        localStorage.setItem("auth", JSON.stringify(res.data));
        message.success("Login Succesfully");
        navigate("/");
      } else {
        message.error("User or Password incorrect");
      }
      //Oculta el spinner
      dispatch({ type: "HIDE_LOADER" });
    } catch (error) {
      message.error("Something went wrong");
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
          <h3>Login APP</h3>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <p>
                Don't have an account?
                <Link to="/register"> Register Here!</Link>
              </p>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
