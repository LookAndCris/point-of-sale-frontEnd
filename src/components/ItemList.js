import React from "react";
import { Button, Card } from "antd";

const ItemList = ({ item }) => {
  const { Meta } = Card;

  return (
    <div>
      {" "}
      <Card
        style={{
          width: 240,
          marginBottom: 10,
        }}
        cover={<img alt={item.name} src={item.image} style={{ height: 180 }} />}
      >
        <Meta title={item.name} description={item.category} />
        <div className="item-button">
          <Button>Add to cart</Button>
        </div>
      </Card>
    </div>
  );
};

export default ItemList;
