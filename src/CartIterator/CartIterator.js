import React, { useEffect, useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import CartProduct from "../CartProduct/CartProduct";

const CartIterator = (props) => {
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
          <CartProduct
            cartItem={prod}
            key={index}
          />
        ))
      ) : (
        <>
          <div className="column">
            <div className="card">
              <Skeleton
                variant="rect"
                width={300}
                height={50}
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
                width={300}
                height={50}
                animation="wave"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartIterator;
