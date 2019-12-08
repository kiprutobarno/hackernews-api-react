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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { list };
  }

  onDismiss = id => {
    const idToDelete = item => {
      return item.objectID !== id;
    };
    const updatedList = this.state.list.filter(idToDelete);
    this.setState({ list: updatedList });
  };

  render() {
    return (
      <div className="App">
        <table>
          <thead>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Comments</th>
            <th>Points</th>
          </thead>
          <tbody>
            {this.state.list.map(item => {
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
    );
  }
}

export default App;
