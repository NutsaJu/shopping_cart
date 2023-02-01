import { Card, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  images: string[];
  stock: number;
};

const StoreItem = ({ id, title, price, images, stock }: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  const {t} = useTranslation()
  return (
    <Card style={{ height: "310px", border: "none"}}>
      <NavLink to={`/product/${id}`}>
        <Card.Img
          src={images[0]}
          variant="top"
          height="140px"
          width="100%"
          style={{ objectFit: "scale-down" }}
        />
      </NavLink>
      <Card.Body
        className="d-flex flex-column"
        style={{ justifyContent: "space-between" }}
      >
        <Card.Title className="d-flex justify-content-space-between align-items-baseline">
          <NavLink to={`/product/${id}`} className="fs-7 text-decoration-none text-dark">{title}</NavLink>
          <span className="text-muted ms-2 ms-auto">${price}</span>
        </Card.Title>
        {quantity === 0 ? (
          <Button className="w-100" onClick={() => increaseItemQuantity(id)}>
            {t("add to cart")}
          </Button>
        ) : (
          <div
            className="d-flex align-items-center flex-column"
            style={{ gap: "0.5rem" }}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: "0.5rem" }}
            >
              <Button onClick={() => decreaseItemQuantity(id)}>-</Button>
              <div>
                <span className="fs-3">{quantity}</span>
                {t("in a cart")}
              </div>
              <Button onClick={() => increaseItemQuantity(id)} disabled={ quantity >= stock ? true : false}>+</Button>
            </div>
            <Button variant="danger" onClick={() => removeItem(id)}>
              {t("remove")}
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
