import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Head from "../components/head";
import FlashCards from "../components/flash_cards";
import { prePrimer, primer, grade1 } from "../data/dolch";

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
    section: "flash cards"
  };

  handleTextInput = field => event => {
    this.setState({
      [field]: event.target.value
    });
  };

  sectionToDisplay = section => {
    switch (section) {
      case "start":
        return <div>Start section</div>;
      case "flash cards":
        return <FlashCards words={prePrimer.concat(primer).concat(grade1)} />;
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

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
