import { Navbar as NavbarBs, Nav } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { TiShoppingCart } from "react-icons/ti";
import styled from "styled-components";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const Navbar = () => {
  const { cartQuantity } = useShoppingCart();
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState<string>("");
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <NavbarBs sticky="top" className="bg-light shadow-sm mb-3">
      <Container>
        <Nav>
          <NavLink
            to="/"
            className="fs-4"
            style={{ textDecoration: "none", color: "grey" }}
          >
            {t("store")}
          </NavLink>
        </Nav>
        <FormControl sx={{ m: 1, minWidth: 80 }} size="small" className="ms-auto">
          <InputLabel id="demo-select-small">{t("lang")}</InputLabel>
          <Select
            defaultValue="eng"
            labelId="demo-select-small"
            id="demo-select-small"
            label="Lang"
            onChange={handleChange}
          >
            <MenuItem value="eng" onClick={() => i18n.changeLanguage("en")}>
              Eng
            </MenuItem>
            <MenuItem value="ka" onClick={() => i18n.changeLanguage("ka")}>
              ქარ
            </MenuItem>
          </Select>
        </FormControl>
        <NavLink to="/cart">
          <Button
            style={{ width: "3rem", height: "3rem", position: "relative" }}
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
