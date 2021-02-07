import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Head from "../components/head";
import FlashCards from "../components/flash_cards";
import Progress from "../components/progress";
import { prePrimer, primer, grade1 } from "../data/dolch";
import { NUM_CORRECT_NEEDED } from "../utils/constants";

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

export const styles = theme => ({
  app: {
    textAlign: "center",
    padding: "10px"
  },
  title: {
    marginBottom: theme.spacing(4)
  }
});

export class Index extends Component {
  state = {
    section: "flash cards",
    words: []
  };

  componentDidMount = () => {
    let words = JSON.parse(localStorage.getItem("sightWordsData"));
    if (words) {
      console.log("using localStorage"); // eslint-disable-line no-console
    } else {
      console.log("no localStorage found, starting from scratch"); // eslint-disable-line no-console
      words = [];
      words = words.concat(
        prePrimer.map(w => {
          return { text: w, level: 1, correct: 0 };
        })
      );
      words = words.concat(
        primer.map(w => {
          return { text: w, level: 2, correct: 0 };
        })
      );
      words = words.concat(
        grade1.map(w => {
          return { text: w, level: 3, correct: 0 };
        })
      );
    }

    words.forEach(w => {
      w.score = this.scoreFunction(w.level);
    });
    this.setState({ words: words });
    localStorage.setItem("sightWordsData", JSON.stringify(words));
  };

  scoreFunction = level => 1.0 / Math.pow(3, level);

  handleGuess = (words, text, isCorrect) => {
    let w = words.filter(w => w.text === text)[0];
    if (w === undefined) {
      return undefined;
    }
    w.correct += isCorrect ? 1 : -1;
    w.correct = Math.max(w.correct, 0);
    w.correct = Math.min(w.correct, NUM_CORRECT_NEEDED);
    this.setState({ words: words });
    localStorage.setItem("sightWordsData", JSON.stringify(words));
  };

  clearProgress = () => {
    let words = this.state.words;
    words.forEach(w => {
      w.correct = 0;
    });
    this.setState({ words: words });
    localStorage.removeItem("sightWordsData");
  };

  sectionToDisplay = section => {
    switch (section) {
      case "start":
        return <div id="Start">Start section</div>;
      case "progress":
        return (
          <Progress
            words={this.state.words}
            switchToFlashCards={() => this.setState({ section: "flash cards" })}
            clearProgress={this.clearProgress}
          />
        );
      case "flash cards":
        return (
          <FlashCards
            words={this.state.words}
            handleGuess={(text, isCorrect) =>
              this.handleGuess(this.state.words, text, isCorrect)
            }
            switchToProgress={() => this.setState({ section: "progress" })}
          />
        );
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.app}>
        <Head title="Sight Words" />
        {this.sectionToDisplay(this.state.section)}
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
