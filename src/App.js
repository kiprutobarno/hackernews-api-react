import React, { Component } from "react";

const list = [
  {
    title: "React",
    url: "https://facebook.github.io/react",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

/**Search function that returns ONLY the searched term in the list */
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { list, searchTerm: "" };
  }

  /**Dismiss expression to delete a list item */
  onDismiss = id => {
    const idToDelete = item => {
      return item.objectID !== id;
    };
    const updatedList = this.state.list.filter(idToDelete);
    this.setState({ list: updatedList });
  };

  /** OnChange handler for the input field */
  onSearchChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
        <Search searchTerm={searchTerm} onSearchChange={this.onSearchChange} />
        <Table searchTerm={searchTerm} list={list} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

class Search extends Component {
  render() {
    const { searchTerm, onSearchChange } = this.props;
    return (
      <div className="form">
        <form>
          <input
            type="text"
            onChange={onSearchChange}
            value={searchTerm}
          ></input>
        </form>
      </div>
    );
  }
}

class Table extends Component {
  render() {
    const { searchTerm, list, onDismiss } = this.props;
    return (
      <div className="table">
        <table>
          <TableHead />
          <TableBody
            searchTerm={searchTerm}
            list={list}
            onDismiss={onDismiss}
          />
        </table>
      </div>
    );
  }
}

class TableHead extends Component {
  render() {
    return (
      <thead>
        <th>ID</th>
        <th>Title</th>
        <th>Author</th>
        <th>Comments</th>
        <th>Points</th>
      </thead>
    );
  }
}

class TableBody extends Component {
  render() {
    const { searchTerm, list, onDismiss } = this.props;
    return (
      <tbody>
        {list.filter(isSearched(searchTerm)).map(item => {
          return (
            <tr key={item.objectID}>
              <td>{item.objectID}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>{item.num_comments}</td>
              <td>{item.points}</td>
              <td>
                <Button onClick={() => onDismiss(item.objectID)}>
                  Dismiss
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }
}

class Button extends Component {
  render() {
    const { onClick, children } = this.props;
    return (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default App;
