import React from "react";
import data from "../data";
import Typehead from "./Typehead";

function App(props) {
  //props for now not bringing anything from the parent

  return (
    <>
      <Typehead
        suggestions={data.books}
        handleSelect={suggestion => {
          window.alert(suggestion);
        }}
      />
    </>
  );
}

export default App;
