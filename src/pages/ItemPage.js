import React from "react";
import DefaultLayout from "../components/DefaultLayout";

const ItemPage = () => {
  return (
    <DefaultLayout>
      {/* En este lugar se pondrá todo lo que se quiere renderizar como contenido, 👇 según el path.  */}
      <div>Item List</div>
    </DefaultLayout>
  );
};

export default ItemPage;
