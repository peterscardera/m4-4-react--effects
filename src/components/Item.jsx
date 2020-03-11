import React from "react";
import styled from "styled-components";

const Item = ({ name, cost, value, numOwned, handlerOfBuys }) => {



  return (
    <Container onClick={handlerOfBuys}>
      <StyledItem>{name}</StyledItem>
      <div>
        Cost: {cost} Cookies. Produces {value} cookies/sec
      </div>
      <div>owned:{numOwned}</div>
    </Container>
  );

  
};


const Container = styled.div`

`
const  StyledItem = styled.div `
font-size: 1.5rem;
font-weight: bold;
`
export default Item;
