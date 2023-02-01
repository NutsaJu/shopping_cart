import { Button } from "react-bootstrap";
import emptyCart from "../assets/emptycart.png";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "../components/CartItem";
import { useGetAllProductsQuery } from "../features/apiSlice";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const { cartItems, cartQuantity } = useShoppingCart();
  const { data: allProducts } = useGetAllProductsQuery({
    skip: !cartQuantity && true,
  });
  const {t} = useTranslation()

  return (
    <>
      {cartQuantity ? (
        <Container>
          <CartItemsWrapper>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </CartItemsWrapper>
          <TotalPriceWrapper>
            <h4>{t("total")}</h4>
            <span className="text-danger fs-3 ms-auto">
              ${" "}
              {cartItems.reduce((total, cartItem) => {
                const item = allProducts?.products?.find(
                  (i: any) => i.id === cartItem.id
                );
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)}
            </span>
            <Button className="w-100" variant="outline-success">
              {t("checkout")}
            </Button>
          </TotalPriceWrapper>
        </Container>
      ) : (
        <Container className="d-flex justify-content-center align-items-center">
          <Wrapper>
            <img
              src={emptyCart}
              style={{ width: "100%", height: "100%", objectFit: "scale-down" }}
            />
            <h3>{t("cartIsEmpty")}</h3>
            <p>{t("haven't_made_choice")}</p>
            <NavLink to="/">
              <Button>{t("shopNow")}</Button>
            </NavLink>
          </Wrapper>
        </Container>
      )}
    </>
  );
};

export default CartPage;

const Wrapper = styled.div`
  max-width: 536px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  text-align: center;
`;

const CartItemsWrapper = styled.div`
  width: 75%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  height: 150px;
  @media (max-width: 1200px) {
    width: 100%;
    height: auto;
  }
`;

const TotalPriceWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  border-radius: 15px;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  @media (max-width: 1200px) {
    width: 280px;
    margin-top: 20px;
    margin-right: 20px;
    align-self: flex-end;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
`;
