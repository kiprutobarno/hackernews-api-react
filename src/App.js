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
        <div className="form">
          <form>
            <input
              type="text"
              onChange={this.onSearchChange}
              value={searchTerm}
            ></input>
          </form>
        </div>
        <div className="table">
          <table>
            <thead>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Comments</th>
              <th>Points</th>
            </thead>
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
                      <button
                        type="button"
                        onClick={() => this.onDismiss(item.objectID)}
                      >
                        Dismiss
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
