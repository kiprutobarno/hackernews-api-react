import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import App, { Search, Button, Table } from "./App";

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  //implement snapshot test
  test("has valid snapshot", () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Search", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Search>Search</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test("has a valid snapshot", () => {
    const component = renderer.create(<Search>Search</Search>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Button", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button>Give me more</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  test("has a valid snapshot", () => {
    const component = renderer.create(<Button>Give me more</Button>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Table", () => {
  const props = {
    list: [
      { title: "Metaphysics", author: "Barno", num_comments: 6, objectID: "B" },
      {
        title: "Biosystems",
        author: "Kimberly",
        num_comments: 2,
        objectID: "X"
      }
    ]
  };

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Table {...props} />, div);
  });

  test("has a valid snapshot", () => {
    const component = renderer.create(<Table {...props} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
