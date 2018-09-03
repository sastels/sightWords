import React from "react";
import { mount, shallow } from "enzyme";
import { FlashCards, styles } from "../../components/flash_cards";
import wordsFixure from "../fixtures/words_fixture";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

const numIterations = 100000;

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
      words: wordsFixure,
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

  it("contains the word", () => {
    expect(shallowMounted().find("#word").length).toEqual(1);
  });

  it("has a correct drawAlreadyKnown function", () => {
    const instance = mounted().instance();
    let wordCounts = {},
      chosenWord;

    for (let i = 0; i < numIterations; i++) {
      chosenWord = instance.drawAlreadyKnown(wordsFixure, 1).text;
      wordCounts[chosenWord] =
        1.0 + (wordCounts[chosenWord] ? wordCounts[chosenWord] : 0.0);
    }
    const wordsChosen = Object.keys(wordCounts).sort();

    expect(wordsChosen).toEqual(["w0.1", "w0.2"]);
    wordsChosen.forEach(s => {
      expect(wordCounts[s] / numIterations).toBeCloseTo(0.5, 2);
    });

    expect(instance.drawAlreadyKnown(wordsFixure, 3)).toBeUndefined();
  });

  it("has a correct drawNotKnownYet function", () => {
    const instance = mounted().instance();
    let wordCounts = {},
      chosenWord;

    for (let i = 0; i < numIterations; i++) {
      chosenWord = instance.drawNotKnownYet(wordsFixure).text;
      wordCounts[chosenWord] =
        1.0 + (wordCounts[chosenWord] ? wordCounts[chosenWord] : 0.0);
    }
    let wordsChosen = Object.keys(wordCounts).sort();

    expect(wordsChosen).toEqual(["w1.1", "w2.1", "w2.2"]);
    expect(wordCounts["w1.1"] / numIterations).toBeCloseTo(0.5, 2);
    expect(wordCounts["w2.1"] / numIterations).toBeCloseTo(0.25, 2);
    expect(wordCounts["w2.2"] / numIterations).toBeCloseTo(0.25, 2);
  });

  it("has a correct drawWord function", () => {});

  it("has a correct answer function", () => {
    const instance = mounted().instance();
    expect(instance.state.count).toEqual(0);
    instance.answer("hi", 123);
    expect(instance.state.count).toEqual(1);
    expect(props.handleGuess).toBeCalledWith("hi", 123);
  });

  it("has a correct styles function", () => {
    expect(styles()).not.toBeUndefined();
  });
});
