import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { result: null, searchTerm: "" };
  }

  setSearchTopStories = result => {
    const { hits, page } = result;
    const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({ result: { hits: updatedHits, page } });
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

  fetchSearchTopStories = (searchTerm, page = 0) => {
    const url = `https://hn.algolia.com/api/v1/search?query=${searchTerm}&page=${page}&hitsPerPage=${100}`;
    axios(url)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && error);
  };
  onSearchSubmit = event => {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  };

  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0;

    return (
      <div className="App">
        <div className="interactions">
          <Search
            value={searchTerm}
            onSearchChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          />
        </div>

        {result && (
          <Table
            searchTerm={searchTerm}
            list={result.hits}
            onDismiss={this.onDismiss}
          />
        )}
        <div className="interactions">
          <Button
            onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}
          >
            More
          </Button>
        </div>
      </div>
    );
  }
}

class Search extends Component {
  render() {
    const { value, onSearchChange, onSubmit } = this.props;
    return (
      <div className="form">
        <form onSubmit={onSubmit}>
          <input type="text" onChange={onSearchChange} value={value}></input>
          <button type="submit">Search</button>
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
    const { list, onDismiss } = this.props;
    return (
      <tbody>
        {list.map(item => {
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
export { Button, Search, TableHead, TableBody, Table };
