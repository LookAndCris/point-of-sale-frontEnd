import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";

const Homepage = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = [
    {
      name: "medicamentos",
      imageURL: "https://img.icons8.com/office/452/pill.png",
    },
    {
      name: "medicamentos-no-efp",
      imageURL: "https://img.icons8.com/office/452/clinic.png",
    },
    {
      name: "dermocosmetica",
      imageURL: "https://img.icons8.com/office/452/powder.png",
    },
    {
      name: "deporte-ortopedia",
      imageURL: "https://img.icons8.com/office/452/broken-bone.png",
    },
    {
      name: "nutricion",
      imageURL: "https://img.icons8.com/office/452/heart-with-pulse.png",
    },
    {
      name: "infantil",
      imageURL: "https://img.icons8.com/office/452/baby-bottle.png",
    },
    {
      name: "higiene",
      imageURL: "https://img.icons8.com/office/452/electric-toothbrush.png",
    },
    {
      name: "parafarmacia-otros",
      imageURL: "https://img.icons8.com/office/452/syringe.png",
    },
  ];

  //useEffect es un hook que se ejecuta cuando el componente se monta
  useEffect(() => {
    const getAllItems = async () => {
      //fetch es una función que nos permite hacer peticiones a un servidor
      try {
        //Muestra el spinner
        dispatch({ type: "SHOW_LOADER" });
        const { data } = await axios.get(
          "http://localhost:8080/api/v1/items/get-item"
        );
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
    getAllItems();
  }, [dispatch]);
  return (
    <>
      <DefaultLayout>
        {/* En este lugar se pondrá todo lo que se quiere renderizar como contenido, 👇 según el path.  */}
        <div className="d-flex">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`d-flex category ${
                selectedCategory === category.name && "category-active"
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <h6>{category.name}</h6>
              <img
                src={category.imageURL}
                alt={category.name}
                height="20"
                width="30"
              />
            </div>
          ))}
        </div>
        <Row>
          {/* Muestra cada elemento que se trae en los datos.    */}
          {items
            .filter((i) => i.category === selectedCategory)
            .map((item) => (
              <Col xs={24} lg={6} md={12} sm={6}>
                <ItemList key={item.id} item={item} />
              </Col>
            ))}
        </Row>
      </DefaultLayout>
    </>
  );
};

export default Homepage;
