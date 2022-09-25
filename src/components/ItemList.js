import React from "react";
import { Card } from "antd";

const ItemList = ({ item }) => {
  const { Meta } = Card;
  return (
    <div>
      {" "}
      <Card
        hoverable
        style={{
          width: 180,
          marginBottom: 10,
        }}
        cover={<img alt={item.name} src={item.image} style={{ height: 180 }} />}
      >
        <Meta title={item.name} description={item.category} />
      </Card>
    </div>
  );
};

export default ItemList;
