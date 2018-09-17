import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { NUM_CORRECT_NEEDED } from "../utils/constants";

export const styles = () => ({
  word: {
    margin: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  button: {
    marginLeft: "10%",
    marginRight: "10%",
    textTransform: "none",
    marginTop: "20px",
    marginBottom: "30px",
    fontSize: "30px"
  },
  topBar: {
    textAlign: "center"
  },
  bottomBar: {
    width: "100%",
    marginLeft: -10,
    padding: 0,
    position: "fixed",
    bottom: "0px"
  }
});

export class FlashCards extends Component {
  state = { count: 0 };

  drawAlreadyKnown = (words, minWordsNeeded) => {
    const known = words.filter(w => w.correct === NUM_CORRECT_NEEDED);
    if (known.length < minWordsNeeded) {
      return undefined;
    }
    return known[Math.floor(Math.random() * known.length)];
  };

  drawNotKnownYet = words => {
    let totalScore = 0;
    const notKnown = words.filter(w => w.correct !== NUM_CORRECT_NEEDED);
    if (notKnown.length === 0) {
      return undefined;
    }
    notKnown.forEach(w => {
      w.startScore = totalScore;
      totalScore += w.score;
      w.endScore = totalScore;
    });
    const randomScore = Math.random() * totalScore; // note that Math.random() < 1
    for (let i = 0; i < notKnown.length; i++) {
      if (notKnown[i].endScore > randomScore) {
        return notKnown[i];
      }
    }
  };

  drawWord = (words, pickKnownProbability) => {
    if (words.length === 0) {
      return undefined;
    }
    let picked;
    if (Math.random() < pickKnownProbability) {
      picked = this.drawAlreadyKnown(words, 5);
      if (picked !== undefined) {
        return picked;
      }
    }
    picked = this.drawNotKnownYet(words);
    if (picked !== undefined) {
      return picked;
    }
    return this.drawAlreadyKnown(words, 0);
  };

  answer = (text, isCorrect) => {
    const newCount = this.state.count + 1;
    this.setState({ count: newCount });
    this.props.handleGuess(text, isCorrect);
  };

  render() {
    const { classes } = this.props;

    if (this.props.words.length === 0) {
      return null;
    }
    const w = this.drawWord(this.props.words, 0.75);
    const text = w.text;
    return (
      <div id="flash_cards">
        <Button
          className={classes.button}
          onClick={this.props.switchToProgress}
        >
          See Progress
        </Button>

        <Typography id="word" variant="display4" className={classes.word}>
          {text}
        </Typography>

        <div className={classes.bottomBar}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.answer(text, false)}
          >
            Try again
          </Button>

          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.answer(text, true)}
          >
            Correct!
          </Button>
        </div>
      </div>
    );
  }
}

FlashCards.propTypes = {
  classes: PropTypes.object.isRequired,
  words: PropTypes.array.isRequired,
  handleGuess: PropTypes.func.isRequired,
  switchToProgress: PropTypes.func.isRequired
};

export default withStyles(styles)(FlashCards);
