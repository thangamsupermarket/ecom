import React, { useEffect, useState } from "react";
import ProductCard from "../Product/Product";
import Skeleton from "@material-ui/lab/Skeleton";
import "./product.css";

const ProductsIterator = (props) => {
  const [prodPresent, setProductPresent] = useState(false);
  
  useEffect(() => {
    if (props.products.length > 0) {
        setTimeout(()=> {
            setProductPresent(true);
        }, 2000)
    }
  }, [props.products]);

  return (
    <div>
      {prodPresent === true ? (
        props.products.map((prod, index) => (
          <ProductCard
            key={index}
            prodId={prod.prodId}
            prodCategory={prod.prodCategory}
            prodOnClick={props.onClick}
            prodTitle={prod.prodName}
            prodDesc={prod.prodDesc}
            prodPrice={prod.prodPrice}
          />
        ))
      ) : (
        <>
          <div className="column">
            <div className="card">
              <Skeleton
                variant="rect"
                width={170}
                height={170}
                animation="wave"
              />
            </div>
          </div>
          <div className="column">
            <div className="card">
              <Skeleton
                variant="rect"
                width={170}
                height={170}
                animation="wave"
              />
            </div>
          </div>
          <br />
          <div className="column">
            <div className="card">
              <Skeleton
                variant="rect"
                width={170}
                height={170}
                animation="wave"
              />
            </div>
          </div>
          <div className="column">
            <div className="card">
              <Skeleton
                variant="rect"
                width={170}
                height={170}
                animation="wave"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsIterator;
