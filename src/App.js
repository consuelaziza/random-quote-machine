import React, { useState, useEffect } from "react";
import "typeface-roboto";
import { random } from "lodash";
import QuoteMachine from "./components/QuoteMachine";
import { Grid, withStyles } from "@material-ui/core";

const styles = {
  container: {
    alignItems: "center",
    display: "flex",
    height: "100vh",
  },
};

function App({ classes }) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     quotes: [],
  //     selectedQuoteIndex: null,
  //   };
  //   this.assignNewQuoteIndex = this.assignNewQuoteIndex(this);
  //   this.selectQuoteIndex = this.generateNewQuoteIndex(this);
  // }
  const [quotes, setQuotes] = useState([]);
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(null);

  useEffect(async () => {
    const data = await fetch(
      "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"
    );
    const quotes = await data.json();
    setQuotes(quotes);
    setSelectedQuoteIndex(random(0, quotes.length - 1));
  }, []);

  function getSelectedQuote() {
    if (!quotes.length || !Number.isInteger(selectedQuoteIndex)) {
      return undefined;
    }
    return quotes[selectedQuoteIndex];
  }
  function generateNewQuoteIndex() {
    if (!quotes.length) {
      return undefined;
    }
    return random(0, quotes.length - 1);
  }

  function assignNewQuoteIndex() {
    setSelectedQuoteIndex(generateNewQuoteIndex());
  }

  return (
    <Grid
      className={classes.container}
      id="quote-box"
      justify="center"
      container
    >
      <Grid xs={11} lg={8} item>
        {getSelectedQuote() ? (
          <QuoteMachine
            selectedQuote={getSelectedQuote()}
            assignNewQuoteIndex={assignNewQuoteIndex}
          />
        ) : null}
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(App);
