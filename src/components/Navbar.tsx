import { Navbar as NavbarBs, Nav } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { TiShoppingCart } from "react-icons/ti";
import styled from "styled-components";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart();
  return (
    <NavbarBs sticky="top" className="bg-light shadow-sm mb-3">
      <Container>
        <Nav>
          <NavLink to="/" className="fs-4" style={{textDecoration: "none", color: "grey"}}>Store</NavLink>
        </Nav>
        <NavLink to="/cart">
            <Button
              style={{ width: "3rem", height: "3rem", position: "relative" }}
              onClick={openCart}
            >
              <TiShoppingCart style={{ width: "1.5rem", height: "1.5rem" }} />
              {cartQuantity ? (
                <CircleCounter className="bg-danger rounded-circle">
                  {cartQuantity}
                </CircleCounter>
              ) : null}
            </Button>
          </NavLink>
      </Container>
    </NavbarBs>
  );
};

export default Navbar;

const CircleCounter = styled.div`
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(25%, 25%);
  display: flex;
  justify-content: center;
  align-items: center;
`;
