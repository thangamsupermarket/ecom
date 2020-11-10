import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

export default function ProductCard(props) {
  
  const handleOnClick = (e) => {
    props.prodOnClick(props.prodId);
  };
  return (
    <>
      <div className="column">
        <div className="card">
          <Card onClick={handleOnClick}>
            <CardActionArea>
              <CardContent>
                <img
                  src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/1.jpg"
                  width="100"
                  height="100"
                  alt="product"
                />
                 <h2>{props.prodTitle}</h2>
                <p className="font-size-16">{props.prodDesc}</p>
                <p>₹{props.prodPrice}</p>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </>
  );
}
