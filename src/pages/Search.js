import React, { Component } from "react";
import API from "../utils/API";

class Search extends Component {
  state = {
    search: "",
    employee: [],
    results: [],
    error: ""
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  componentDidMount() {
    API.getUsers()
      .then(res => this.setState({ breeds: res.data.message }))
      .catch(err => console.log(err));
  }

  render() {
    return (
  
    );
  }
}

export default Search;
