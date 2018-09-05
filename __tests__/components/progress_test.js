import React from "react";
import { mount, shallow } from "enzyme";
import { Progress, styles } from "../../components/progress";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Progress screen", () => {
  let props;
  let _mounted, _shallowMounted;
  const mounted = () => {
    if (!_mounted) {
      _mounted = mount(<Progress {...props} />);
    }
    return _mounted;
  };
  const shallowMounted = () => {
    if (!_shallowMounted) {
      _shallowMounted = shallow(<Progress {...props} />);
    }
    return _shallowMounted;
  };

  beforeEach(() => {
    props = {
      classes: {},
      switchToFlashCards: jest.fn()
    };
    _mounted = undefined;
    _shallowMounted = undefined;
  });

  it("passes axe tests", async () => {
    let html = mounted().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a correct styles function", () => {
    expect(styles()).not.toBeUndefined();
  });
});
