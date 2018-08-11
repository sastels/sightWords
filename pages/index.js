import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

require("isomorphic-fetch");
import Head from "../components/head";

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
    section: "start"
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
