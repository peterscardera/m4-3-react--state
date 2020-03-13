import React from "react";
import Filter from "./Filter";
import styled from "styled-components";
import books from "../data";
// onChange={(ev) =>
//   setAgreed(!agreed)
// }

const Typehead = ({ suggestions, handleSelect }) => {
  const [value, setValue] = React.useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(
    0
  );

  let matchedBooks = suggestions.filter(book => {
    if (
      value.length >= 2 &&
      book.title.toLowerCase().includes(value.toLowerCase())
    ) {
      return book;
    }
  });

  //console.log(matchedBooks);
  //chosen book
  const selectedBook = matchedBooks[selectedSuggestionIndex]
  //console.log(selectedBook)

  return (
    <Container>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          switch (e.key) {
            case "Enter": {
              handleSelect(selectedBook.title);
              return;
            }
            case "ArrowUp": {
              if (selectedSuggestionIndex > 0) {
                setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
              }
              break;
            }
            case "ArrowDown": {
              if (selectedSuggestionIndex < matchedBooks.length -1) {
                setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
              }

              break;
            }
          }
        }}
      />

      <StyledButton
        onClick={() => {
          setValue("");
        }}
      >
        {" "}
        Clear
      </StyledButton>
      <StyledPreview>
        <Filter
          match={matchedBooks}
          handler={handleSelect}
          userTyped={value}
          suggestions={suggestions}
          selectedSuggestionIndex={selectedSuggestionIndex}
          setSelectedSuggestionIndex={setSelectedSuggestionIndex}

        ></Filter>
      </StyledPreview>
    </Container>
  );
};

const StyledButton = styled.button`
  background-color: purple;
  color: white;
  margin-left: 8px;
`;

const Container = styled.div`
  width: 60vw;
  margin: auto;
`;

const StyledPreview = styled.div`
  box-shadow: -1px 9px 24px 0px rgba(0, 0, 0, 0.75);
  ul {
    padding: 0px;
    list-style-type: none;
  }
`;

export default Typehead;
