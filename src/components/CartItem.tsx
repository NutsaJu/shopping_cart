import { useShoppingCart } from "../context/ShoppingCartContext";
import { useGetAllProductsQuery } from "../features/apiSlice";
import Spinner from "react-bootstrap/esm/Spinner";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity}: CartItemProps) => {
  const { data: allProducts, isLoading } = useGetAllProductsQuery({
    skip: !id && true,
  });
  const { increaseItemQuantity, decreaseItemQuantity, removeItem } =
    useShoppingCart();

  const item = allProducts?.products?.find((i: any) => i.id === id);

  if (item == null) return null;
  return (
    <>
      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <div>
          <Wrapper>
            <ItemWrapper>
              <NavLink to={`/product/${item.id}`}>
                <ImgWrapper>
                  <img src={item.images[0]} alt={item.title} />
                </ImgWrapper>
              </NavLink>
              <TextWrapper>
                <NavLink to={`/product/${item.id}`} className="text-decoration-none text-dark">
                  <h5>{item.title}</h5>
                  {item.brand}
                </NavLink>
                <div className="text-primary">${item.price}</div>
              </TextWrapper>
            </ItemWrapper>
            <QuantityWrapper>
              <Button onClick={() => decreaseItemQuantity(id)}>-</Button>
              <div>
                <span className="fs-5">{quantity}</span>
              </div>
              <Button onClick={() => increaseItemQuantity(id)} disabled={quantity >= item.stock ? true : false}>+</Button>
            </QuantityWrapper>
            <PriceWrapper>
              <div className="fs-4 text-danger">${item.price * quantity}</div>
              <Button variant="outline-danger" onClick={() => removeItem(id)}>
                x
              </Button>
            </PriceWrapper>
          </Wrapper>
        </div>
      )}
    </>
  );
};

export default CartItem;

const ImgWrapper = styled.div`
  max-width: 200px;
  width: 100%;
  display: grid;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  img {
    width: 100px;
    height: 100px;
    object-fit: scale-down;
  }
`;
const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  justify-content: space-around;
  display: flex;
  flex-direction: column;
`;
const QuantityWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const PriceWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 2fr;
  height: 150px;
  border-bottom: 1px solid #d5d2d5;
  @media (max-width: 780px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr 1fr;
    height: auto;
    justify-content: center;
    align-items: center;
  }
`;
const ItemWrapper = styled.div`
  display: flex;
  @media (max-width: 780px) {
    grid-column: 1 / 3;
  }
`;
