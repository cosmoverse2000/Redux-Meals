import classes from "./OrderItem.module.css";

const OrderItem = (props) => {
  const dateTime = new Date(props.time.toString());
  const orderStatus = props.orderDetails.status;
  let statusCss = null;
  if (orderStatus === "Preparing") {
    statusCss = classes.statusPreparing;
  } else if (orderStatus === "Failed") {
    statusCss = classes.statusFailed;
  } else if (orderStatus === "Delivered") {
    statusCss = classes.statusDelivered;
  }

  return (
    <li className={classes["cart-item"]}>
      <h3>
        {props.index}.) <u>ORDER DETAILS</u> :{" "}
        <i className={statusCss}> {orderStatus}</i>
      </h3>
      <div>
        <h4>Order Id : </h4>
        <h5>{props.orderId}</h5>
      </div>
      <div>
        <h4>Order Date :</h4>
        <h5>{dateTime.toString()}</h5>
      </div>
      <div>
        <h4>Ordered Items :</h4>
        <ul className={classes.itemList}>
          {props.orderedItems.map((item) => {
            return (
              <li key={item.mealId}>
                <b>
                  {" "}
                  {item.mealName}(${item.mealPrice}){" "}
                </b>{" "}
                : <span>x{item.mealCount}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h4>Ordered Details :</h4>
        <ul className={classes.detailList}>
          <li>
            <b>Name : </b>
            <span>{props.orderDetails.name}</span>
          </li>
          <li>
            <b>Conatct : </b> <span>{props.orderDetails.contact}</span>
          </li>
          <li>
            <b>Pin : </b> <span>{props.orderDetails.pinCode}</span>
          </li>
          <li>
            <b>Status : </b> <span>{props.orderDetails.status}</span>
          </li>
          <li>
            <b>Total Amount : </b>
            <span>{props.orderDetails.totalAmount}</span>
          </li>
          <li>
            <b>Delivery Address : </b>{" "}
            <span>
              {props.orderDetails.address &&
                props.orderDetails.address.slice(0, 65)}
              ...
            </span>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default OrderItem;
