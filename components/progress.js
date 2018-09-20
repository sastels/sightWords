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

import { NUM_CORRECT_NEEDED } from "../utils/constants";

export const styles = () => ({
  root: {
    maxWidth: "500px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  },
  buttonBar: {
    marginTop: "20px"
  },
  button: {
    textTransform: "none",
    marginLeft: "20px",
    marginRight: "20px",
    marginBottom: "10px"
  },
  expansionGroup: {
    marginTop: "20px",
    marginBottom: "20px"
  }
});

export class Progress extends Component {
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
                            .filter(
                              w =>
                                w.correct >= NUM_CORRECT_NEEDED &&
                                w.level === level
                            )
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
                            .filter(
                              w =>
                                w.correct !== NUM_CORRECT_NEEDED &&
                                w.level === level
                            )
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

        <div className={classes.buttonBar}>
          <Button className={classes.button} onClick={this.props.clearProgress}>
            Clear all progress
          </Button>

          <Button
            className={classes.button}
            onClick={this.props.switchToFlashCards}
          >
            Back to the Flash Cards
          </Button>
        </div>
      </div>
    );
  }
}

Progress.propTypes = {
  classes: PropTypes.object.isRequired,
  words: PropTypes.array.isRequired,
  switchToFlashCards: PropTypes.func.isRequired,
  clearProgress: PropTypes.func.isRequired
};

export default withStyles(styles)(Progress);
