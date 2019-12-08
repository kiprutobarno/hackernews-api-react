import React, { Component } from "react";

/**Search function that returns ONLY the searched term in the list */
const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { result: null, searchTerm: "javascript" };
  }

  setSearchTopStories = result => {
    this.setState({ result });
  };

  /**Dismiss expression to delete a list item */
  onDismiss = id => {
    const idToDelete = item => {
      return item.objectID !== id;
    };

    const updatedHits = this.state.result.hits.filter(idToDelete);
    this.setState({ result: { ...this.state.result, hits: updatedHits } });
  };

  /** OnChange handler for the input field */
  onSearchChange = event => {
    this.setState({ searchTerm: event.target.value });
  };
  componentDidMount() {
    const { searchTerm } = this.state;
    const url = `https://hn.algolia.com/api/v1/search?query=${searchTerm}`;
    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }
  render() {
    const { searchTerm, result } = this.state;
    
    return (
      <div className="App">
        <Search searchTerm={searchTerm} onSearchChange={this.onSearchChange} />
        {result && <Table
          searchTerm={searchTerm}
          list={result.hits}
          onDismiss={this.onDismiss}
        />}
        
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
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Comments</th>
          <th>Points</th>
        </tr>
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
