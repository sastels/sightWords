import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  word: {
    margin: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  button: {
    textTransform: "none",
    marginTop: "20px",
    marginBottom: "30px"
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

  drawAlreadyKnown = words => {
    const known = words.filter(w => w.level === 0);
    if (known.length === 0) {
      return undefined;
    }
    return known[Math.floor(Math.random() * known.length)].text;
  };

  drawWord = (words, pickKnownProbability) => {
    if (words.length === 0) {
      return 0;
    }
    if (Math.random() < pickKnownProbability) {
      const picked = this.drawAlreadyKnown(words);
      if (picked !== undefined) {
        return picked;
      }
    }

    let totalScore = 0;
    words.forEach(w => {
      if (w.level !== 0) {
        w.startScore = totalScore;
        totalScore += w.score;
        w.endScore = totalScore;
      }
    });
    const randomScore = Math.random() * totalScore; // note that Math.random() < 1
    for (let i = 0; i < words.length; i++) {
      if (words[i].level !== 0 && words[i].endScore > randomScore) {
        return words[i].text;
      }
    }
  };

  answer = (text, isCorrect) => {
    this.setState({ count: this.state.count + 1 });
    this.props.handleGuess(text, isCorrect);
  };

  render() {
    const { classes } = this.props;

    if (this.props.words.length === 0) {
      return <div>No Words</div>;
    }

    const text = this.drawWord(this.props.words, 0);

    return (
      <div>
        <div className={classes.topBar}>{this.state.count}</div>

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
  handleGuess: PropTypes.func.isRequired
};

export default withStyles(styles)(FlashCards);
