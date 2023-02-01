import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  useGetProductByCategoryQuery,
  useGetSingleProductQuery,
} from "../features/apiSlice";
import { useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import StoreItem from "../components/StoreItem";

const SingleProductPage = () => {
  //  for single Product
  const params = useParams();
  const { productId } = params;
  const { data: singleProduct, isLoading } = useGetSingleProductQuery(
    productId,
    { skip: !productId && true }
  );

  //  for category products
  const categTitle = singleProduct?.category;
  const { data: category_Products } = useGetProductByCategoryQuery(categTitle, {
    skip: !categTitle && true,
  });

  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
  } = useShoppingCart();
  const quantity = getItemQuantity(singleProduct?.id);
  const [index, setIndex] = useState<number>(0);
  const imgCounter: number = singleProduct?.images?.length;

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
        <>
          <Container>
            <ImgWrapper>
              <BigImgContainer>
                <Img src={singleProduct.images[index]} />
              </BigImgContainer>
              <SmallImgContainer $imgCounter={imgCounter}>
                {singleProduct?.images?.map((item: string, i: number) => (
                  <Img key={i} src={item} onMouseEnter={() => setIndex(i)} />
                ))}
              </SmallImgContainer>
            </ImgWrapper>
            <DetailsWrapper>
              <h3>{singleProduct.title}</h3>
              <h5 className="text-muted">{singleProduct.brand}</h5>
              <p>{singleProduct.description}</p>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <RatingCircle>{singleProduct.rating}</RatingCircle>
                <h5 className="text-primary">${singleProduct.price}</h5>
              </div>
              {quantity === 0 ? (
                <Button
                  className="w-100"
                  onClick={() => increaseItemQuantity(singleProduct.id)}
                >
                  +Add to Cart
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
                    <Button
                      onClick={() => decreaseItemQuantity(singleProduct.id)}
                    >
                      -
                    </Button>
                    <div>
                      <span className="fs-3">{quantity}</span>
                      in a cart
                    </div>
                    <Button
                      onClick={() => increaseItemQuantity(singleProduct.id)}
                      disabled={quantity >= singleProduct.stock ? true : false}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => removeItem(singleProduct.id)}
                  >
                    remove
                  </Button>
                </div>
              )}
            </DetailsWrapper>
          </Container>
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <RelatedWrapper>
              <h4 className="mb-3" >Related Products</h4>
              <Row md={2} xs={1} lg={4} className="g-3 mb-2">
                {category_Products?.products?.map((item: any) => (
                  <Col key={item.id}>
                    <StoreItem {...item}/>
                  </Col>
                ))}
              </Row>
            </RelatedWrapper>
          )}
        </>
      )}
    </>
  );
};

export default SingleProductPage;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ImgWrapper = styled.div`
  max-width: 500px;
`;
const BigImgContainer = styled.div`
  height: 250px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 10px;
`;
const SmallImgContainer = styled.div<{ $imgCounter: number }>`
  width: 100%;
  display: grid;
  height: 150px;
  --num-cols: ${(props) => (props.$imgCounter === 1 ? 3 : props.$imgCounter)};
  grid-template-columns: repeat(var(--num-cols), 1fr);
  grid-gap: 10px;
`;
const Img = styled.img`
  width: inherit;
  height: inherit;
  object-fit: scale-down;
`;
const DetailsWrapper = styled.div`
  max-width: 500px;
  width: 100%;
`;
const RatingCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: #d89f0f;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: white;
`;

const RelatedWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 40px;
  `