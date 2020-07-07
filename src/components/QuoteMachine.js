import Button from "./Button";
import React from "react";

const QuoteMachine = (props) => (
  <>
    {props.selectedQuote
      ? `"${props.selectedQuote.quote}" - ${props.selectedQuote.author}`
      : ""}
    <Button
      buttonDisplayName="Next Quote"
      clickHandler={props.assignNewQuoteIndex}
    />
  </>
);

export default QuoteMachine;
