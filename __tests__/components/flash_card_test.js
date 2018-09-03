import React from "react";
import { mount, shallow } from "enzyme";

import { FlashCards } from "../../components/flash_cards";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("FlashCards", () => {
  let props;
  let _mounted, _shallowMounted;
  const mounted = () => {
    if (!_mounted) {
      _mounted = mount(<FlashCards {...props} />);
    }
    return _mounted;
  };
  const shallowMounted = () => {
    if (!_shallowMounted) {
      _shallowMounted = shallow(<FlashCards {...props} />);
    }
    return _shallowMounted;
  };

  beforeEach(() => {
    props = {
      classes: {},
      words: [
        { text: "cat", level: 1, score: 1, correct: 0 },
        { text: "dog", level: 2, score: 0.5, correct: 0 }
      ],
      handleGuess: jest.fn()
    };

    _mounted = undefined;
    _shallowMounted = undefined;
  });

  it("passes axe tests", async () => {
    let html = mounted().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains the word", () => {
    expect(shallowMounted().find("#word").length).toEqual(1);
  });
});
