import React from "react";
import { mount } from "enzyme";
import { styles, Index } from "../../pages/index";
import { NUM_CORRECT_NEEDED } from "../../utils/constants";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Index", () => {
  let props;
  let _mounted;

  const mounted = () => {
    if (!_mounted) {
      _mounted = mount(<Index {...props} />);
    }
    return _mounted;
  };

  beforeEach(() => {
    props = {
      classes: {}
    };
    _mounted = undefined;
  });

  it("passes axe tests", async () => {
    const html = mounted().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("contains a proper array of word objects in state", () => {
    const instance = mounted().instance();
    const words = instance.state.words;
    expect(words).not.toBeUndefined();
    expect(words).not.toHaveLength(0);
    words.forEach(w => {
      expect(w.text).not.toBeUndefined();
      expect(w.level).not.toBeUndefined();
      expect(w.correct).toEqual(0);
      expect(w.score).not.toBeUndefined();
      expect(w.score).not.toEqual(0);
    });
  });

  it("starts on the flash cards screen", () => {
    expect(mounted().find("#flash_cards")).toHaveLength(1);
  });

  it("has a correct scoreFunction function", () => {
    const instance = mounted().instance();
    expect(instance.scoreFunction(0)).toBeCloseTo(1.0, 4);
    expect(instance.scoreFunction(1)).toBeCloseTo(0.3333, 4);
    expect(instance.scoreFunction(2)).toBeCloseTo(0.1111, 4);
  });

  describe("handleGuess function", () => {
    it("doesn't crash if can't find word", () => {
      const instance = mounted().instance();
      const words = instance.state.words;
      expect(instance.handleGuess(words, "sdfaeuiaf", true)).toBeUndefined();
    });

    it("changes word.correct appropriately", () => {
      const instance = mounted().instance();
      const words = instance.state.words;
      expect(words[0].correct).toEqual(0);

      [1, 2, 3, 4, 5, 6].forEach(n => {
        instance.handleGuess(words, words[0].text, true);
        expect(words[0].correct).toEqual(
          n < NUM_CORRECT_NEEDED ? n : NUM_CORRECT_NEEDED
        );
      });

      instance.handleGuess(words, words[0].text, false);
      expect(words[0].correct).toEqual(NUM_CORRECT_NEEDED - 1);

      [0, 1, 2, 3, 4, 5, 6].forEach(() => {
        instance.handleGuess(words, words[0].text, false);
      });
      expect(words[0].correct).toEqual(0);
    });
  });

  it("contains a correct sectionToDisplay function", () => {
    const instance = mounted().instance();
    expect(
      mount(instance.sectionToDisplay("start")).find("#Start")
    ).toHaveLength(1);
    expect(
      mount(instance.sectionToDisplay("flash cards")).find("#flash_cards")
    ).toHaveLength(1);
  });

  it("has a proper styles function", () => {
    expect(styles({ spacing: { unit: 1 } })).not.toBeUndefined();
  });
});
