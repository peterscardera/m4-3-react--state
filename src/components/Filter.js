import React from "react";
import styled from "styled-components";

const Filter = ({
  match,
  handler,
  userTyped,
  category,
  selectedSuggestionIndex,
  setSelectedSuggestionIndex
  
}) => {
  return match.map((book, index) => {
   

    console.log(index, selectedSuggestionIndex);
    let title = book.title;
    //get me the index of what the user typed.  //everything before firstPart must get blurred
    let firstPart = title.toLowerCase().indexOf(userTyped.toLowerCase());
    let secondPart = firstPart + userTyped.length; // where to start to blur
    // console.log(secondPart)
    let splittedTitle = title.split("");
    let boldLetters = splittedTitle.slice(firstPart, secondPart);
    let splitFirst = splittedTitle.slice(0, firstPart);
    let splitSecond = splittedTitle.slice(secondPart, splittedTitle.length);

    let cat = book.categoryId;

    return (
      <StyledDiv>
        <ul>
          <li 
          //onClick because if you navigate on a website using your arrows and enter, its the same as clicking on something
            onClick={() => handler(book.title)}
            style={
              index === selectedSuggestionIndex
                ? { backgroundColor: "beige" }
                : { backgroundColor: "white" }
            }
            onMouseEnter = { () => {
              setSelectedSuggestionIndex(index)
             }}
          >
            <strong>{splitFirst}</strong>
            <span>{boldLetters}</span>
            <strong>{splitSecond}</strong>
            <StyledCat>in {cat}</StyledCat>
          </li>
        </ul>
      </StyledDiv>
    );
  });
};

export default Filter;

const StyledDiv = styled.div`
  li {
    padding: 0px;
    margin: 0px;
  }

  &hover {
    opacity: 0.6;
  }
`;

const StyledCat = styled.div`
  color: purple;
  font-style: italic;
`;
