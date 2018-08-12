import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    maxWidth: "500px",
    display: "inline-block"
  },
  title: {
    marginBottom: 4 * theme.spacing.unit
  },
  word: {
    // fontSize: "100px",
    marginTop: "100px",
    marginBottom: "100px"
  },
  button: {
    textTransform: "none",
    margin: theme.spacing.unit,
    marginBottom: 4 * theme.spacing.unit
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
      <div style={{ textAlign: "center" }}>
        <div className={classes.root}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => this.addToWordIndex(-1)}
          >
            Previous
          </Button>

          <Typography id="word" variant="display4" className={classes.word}>
            {this.state.word}
          </Typography>

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
