import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const Item = ({ index, name, cost, value, numOwned, handlerOfBuys }) => {

const focus = useRef()

useEffect(() => {
  
  if (index === 0) {
    
    focus.current.focus();
  }
}, []);

  return (
    <Container ref={focus} onClick={handlerOfBuys}>
      <StyledItem>{name}</StyledItem>
      <div>
        Cost: {cost} Cookies. Produces {value} cookies/sec
      </div>
      <div>owned:{numOwned}</div>
    </Container>
  );
};


const Container = styled.button`

`
const  StyledItem = styled.div `
font-size: 1.5rem;
font-weight: bold;
`
export default Item;
