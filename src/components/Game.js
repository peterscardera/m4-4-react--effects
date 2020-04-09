import React, { useEffect } from "react";
import styled from "styled-components";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";

import cookieSrc from "../cookie.svg";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 }
];

const Game = () => {
  const [numCookies, setNumCookies] = React.useState(100);
  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0
  });
const handleSpace = (e) => {
if (e.code === "Space") {

  setNumCookies(numCookies+1)
}

}

React.useEffect(()=> {
document.title = `${numCookies} cookies`;

return () => {
  document.title = `cookies`
}
},[numCookies])


React.useEffect(()=> {
  window.addEventListener('keydown', handleSpace)

return () => {
  window.removeEventListener('keydown', handleSpace)
}

})
  const calculateCookiesPerTick = purchasedItems => {
    //console.log(purchasedItems);

    let cookieFactory = 0;

    items.forEach(item => {
    cookieFactory += purchasedItems[item.id] * item.value
    });             

    return cookieFactory;
  };
  //---------------INTERVAL HOOK---------------//
  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(purchasedItems);

    return setNumCookies(numOfGeneratedCookies + numCookies);

    // Add this number of cookies to the total
  }, 1000);
  //---------------------------------------------

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          {/*WHY NOT THE VARIABLE numOfGeneratedCookies*/}
          <strong>{calculateCookiesPerTick(purchasedItems)}</strong> cookies per
          second
        </Indicator>
        <Button onClick={()=> {
          setNumCookies(numCookies+1)
        }}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((eachItem, i) => {
          return (
            <Item

              index={i}
              name={eachItem.name}
              cost={eachItem.cost}
              value={eachItem.value}
              numOwned={purchasedItems[eachItem.id]}
              handlerOfBuys={() => {
                if (numCookies < eachItem.cost) {
                  alert("Cannot afford item");
                  return;
                } else {
                  setNumCookies(numCookies - eachItem.cost);
                  setPurchasedItems({
                    ...purchasedItems,
                    [eachItem.id]: purchasedItems[eachItem.id] + 1
                  });
                }
              }}
            />
          );
        })}
      </ItemArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

export default Game;
