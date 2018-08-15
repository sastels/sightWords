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
  state = {
    shuffledWords: [],
    wordIndex: 0,
    word: ""
  };

  componentDidMount = () => {
    const shuffledWords = this.shuffleWords(this.props.words);
    this.setState({
      shuffledWords: shuffledWords,
      wordIndex: 0,
      word: shuffledWords[0]
    });
  };

  shuffleWords = words => {
    let wordsReturn = [].concat(words);
    wordsReturn.sort(() => {
      return 0.5 - Math.random();
    });
    return wordsReturn;
  };

  addToWordIndex = n => {
    const newWordIndex =
      (this.state.shuffledWords.length + this.state.wordIndex + n) %
      this.state.shuffledWords.length;
    this.setState({
      wordIndex: newWordIndex,
      word: this.state.shuffledWords[newWordIndex]
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.topBar}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.addToWordIndex(-1)}
          >
            Previous
          </Button>
        </div>

        <Typography id="word" variant="display4" className={classes.word}>
          {this.state.word}
        </Typography>

        <div className={classes.bottomBar}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.addToWordIndex(1)}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
}

FlashCards.propTypes = {
  classes: PropTypes.object.isRequired,
  words: PropTypes.array.isRequired
};

export default withStyles(styles)(FlashCards);
