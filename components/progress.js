import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export const styles = () => ({
  root: {
    maxWidth: "500px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  },
  button: {
    marginLeft: "10%",
    marginRight: "10%",
    textTransform: "none",
    marginTop: "20px",
    marginBottom: "30px"
  },
  expansionGroup: {
    marginTop: "20px",
    marginBottom: "20px"
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
    let levels = [];
    words.forEach(w => {
      if (!levels.includes(w.level)) {
        levels.push(w.level);
      }
    });
    return (
      <div id="progress_screen" className={classes.root}>
        <h1> Progress </h1>

        <div className={classes.expansionGroup}>
          {levels.map(level => {
            return (
              <ExpansionPanel key={level}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  Level {level}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Known</TableCell>
                        <TableCell>
                          {words
                            .filter(w => w.correct === 3 && w.level === level)
                            .map(w => w.text)
                            .sort((a, b) =>
                              a.localeCompare(b, undefined, {
                                sensitivity: "base"
                              })
                            )
                            .join(" ")}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>Not Yet</TableCell>
                        <TableCell>
                          {words
                            .filter(w => w.correct !== 3 && w.level === level)
                            .map(w => w.text)
                            .sort((a, b) =>
                              a.localeCompare(b, undefined, {
                                sensitivity: "base"
                              })
                            )
                            .join(" ")}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </div>

        <Button
          className={classes.button}
          onClick={this.props.switchToFlashCards}
        >
          Back to the Flash Cards
        </Button>
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
