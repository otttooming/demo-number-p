import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Button, { ButtonProps } from "../Button";

const props: ButtonProps = {};

describe("<Button>", () => {
  let view: ShallowWrapper<ButtonProps>;
  beforeEach(() => {
    view = shallow(<Button {...props} />);
  });

  it("should match snapshot", () => {
    expect(view).toMatchSnapshot();
  });
});
