import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Head from "../components/head";
import FlashCards from "../components/flash_cards";
import { prePrimer, primer, grade1 } from "../data/dolch";

/*
Word object: {
  text
  level (0 know it already, 1 current, 2, 3, ..
  startScore
  endScore
}
scoreFunction: 0 -> 0, n -> 2^n
totalScore
 */

const styles = theme => ({
  app: {
    textAlign: "center",
    padding: "10px"
  },
  title: {
    marginBottom: 4 * theme.spacing.unit
  }
});

class App extends Component {
  state = {
    section: "flash cards",
    words: []
  };

  componentDidMount = () => {
    let words = [];
    words = words.concat(
      prePrimer.map(w => {
        return { text: w, level: 1 };
      })
    );
    words = words.concat(
      primer.map(w => {
        return { text: w, level: 2 };
      })
    );
    words = words.concat(
      grade1.map(w => {
        return { text: w, level: 3 };
      })
    );

    words.forEach(w => {
      w.correct = 0;
      w.score = this.scoreFunction(w.level);
    });
    this.setState({ words: words });
  };

  scoreFunction = level => 1.0 / Math.pow(2, level);

  handleGuess = (words, text, isCorrect) => {
    let w = words.filter(w => w.text === text)[0];
    w.correct += isCorrect ? 1 : -1;
    if (w.correct >= 3) {
      w.level = 0;
    }
    if (isCorrect === false && w.level === 0) {
      w.level = 1;
    }
    w.correct = Math.max(w.correct, 0);
    w.correct = Math.min(w.correct, 3);

    console.log(isCorrect, w);
  };

  sectionToDisplay = section => {
    switch (section) {
      case "start":
        return <div>Start section</div>;
      case "flash cards":
        return (
          <FlashCards
            words={this.state.words}
            handleGuess={(text, isCorrect) =>
              this.handleGuess(this.state.words, text, isCorrect)
            }
          />
        );
    }
  };

  render() {
    const { classes } = this.props;

    console.log("index words", this.state.words);
    //
    return (
      <div className={classes.app}>
        <Head title="Sight Words" />
        {this.sectionToDisplay(this.state.section)}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
