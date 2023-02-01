import { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Spinner from "react-bootstrap/esm/Spinner";
import StoreItem from "../components/StoreItem";
import {
  useGetAllProductsLimitQuery,
  useGetSearchedProductsQuery,
} from "../features/apiSlice";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import searchIcon from "../assets/search.png";

const StorePage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [limit, setLimit] = useState(8);
  const { data: all_Products, isLoading } = useGetAllProductsLimitQuery(limit, {
    skip: !limit && true,
  });
  const { data: search_Products } = useGetSearchedProductsQuery(searchValue, {
    skip: !searchValue && true,
  });
  
  return (
    <>
      {isLoading ? (
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <Spinner animation="border" variant="primary" />
        </Container>
      ) : (
        <Container>
          <SearchWrapper>
            <Input
              value={searchValue || ""}
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <IconBtn>
              <img
                src={searchIcon}
                style={{ width: "inherit", height: "inherit" }}
              />
            </IconBtn>
          </SearchWrapper>
          <div>
            {searchValue ? (
              <Row md={2} xs={1} lg={4} className="g-3 mb-2">
                {search_Products?.products?.map((i: any) => (
                  <Col key={i.id}>
                    <StoreItem {...i} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Row md={2} xs={1} lg={4} className="g-3 mb-2">
                {all_Products.products?.map((item: any) => (
                  <Col key={item.id}>
                    <StoreItem {...item} />
                  </Col>
                ))}
              </Row>
            )}
          </div>
          <Button
            variant="outline-primary"
            onClick={() => setLimit(limit + 8)}
            disabled={all_Products.products.length < limit ? true : false}
            hidden={
              all_Products.products.length < limit || searchValue ? true : false
            }
            className="mt-1 mb-2"
          >
            More Items
          </Button>
        </Container>
      )}
    </>
  );
};

export default StorePage;

const SearchWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  height: 50px;
  position: relative;
  margin-bottom: 20px;
`;
const Input = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  outline: none;
  border-radius: 50px;
  padding-left: 20px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;
const IconBtn = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 20px;
  z-index: 1;
  border: none;
  outline: none;
  background-color: inherit;
  bottom: 11px;
`;
