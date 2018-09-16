import React from "react";
import { mount } from "enzyme";
import { Progress, styles } from "../../components/progress";
import wordsFixure from "../fixtures/words_fixture";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Progress screen", () => {
  let props;
  let _mounted;
  const mounted = () => {
    if (!_mounted) {
      _mounted = mount(<Progress {...props} />);
    }
    return _mounted;
  };

  beforeEach(() => {
    props = {
      classes: {},
      words: wordsFixure,
      switchToFlashCards: jest.fn()
    };
    _mounted = undefined;
  });

  it("passes axe tests", async () => {
    let html = mounted().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a correct styles function", () => {
    expect(styles()).not.toBeUndefined();
  });
});
