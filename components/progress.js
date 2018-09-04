import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export const styles = () => ({
  button: {
    marginLeft: "10%",
    marginRight: "10%",
    textTransform: "none",
    marginTop: "20px",
    marginBottom: "30px"
  }
});

export class Progress extends Component {
  wordStatus = numCorrect => {
    if (numCorrect === 3) {
      return "Know";
    }
    if (numCorrect === 0) {
      return "Not Yet";
    }
    return "Learning";
  };

  render() {
    const { classes, words } = this.props;

    return (
      <div id="progress_screen">
        <h1> Progress </h1>

        <Button
          className={classes.button}
          onClick={this.props.switchToFlashCards}
        >
          Flash Cards
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Word</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {words.map(w => {
              return (
                <TableRow key={w.text}>
                  <TableCell>{this.wordStatus(w.correct)} </TableCell>
                  <TableCell>{w.text}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Progress.propTypes = {
  classes: PropTypes.object.isRequired,
  words: PropTypes.array.isRequired,
  switchToFlashCards: PropTypes.func.isRequired
};

export default withStyles(styles)(Progress);
