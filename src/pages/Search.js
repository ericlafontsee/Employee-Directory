import React, { Component } from "react";
import API from "../utils/API";
import TableRow from "../components/TableRow";

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
      .then((res) => {
        console.log(res);
        const data = res.data.results;
        var employeeRecords = [];
        for (var i = 0; i < data.length; i++) {
          employeeRecords.push({
            firstName: data[i].name.first,
            lastName: data[i].name.last,
            email: data[i].email,
            picture: data[i].picture.thumbnail,
            phone: data[i].cell
          });
        }
        this.setState({ employee: employeeRecords });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <input />
        <button>Search</button>
        <table>
          <thead>
            <tr>
            <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employee.map((record, key)=> {
              return (<TableRow 
                firstName = {record.firstName}
                lastName = {record.lastName}
                email = {record.email}
                phone = {record.phone}
                picture = {record.picture}
                key = {key}
                />
                );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Search;
