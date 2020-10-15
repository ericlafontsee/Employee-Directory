import React, { Component } from "react";
import API from "../utils/API";
import TableRow from "../components/TableRow";

class Search extends Component {
  state = {
    searchField: "",
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
        this.setState({ employee: employeeRecords, results: employeeRecords });
      })
      .catch((err) => console.log(err));
  }
   searchEmployee = (event) => {
      var value = event.target.value;
      this.setState({searchField: value});
      console.log(value);
      var employeeList = [];
      var currentEmployees = this.state.employee;
      for(var i = 0; i < currentEmployees.length; i++){
        if (currentEmployees[i].firstName.indexOf(value) > -1){
          employeeList.push(currentEmployees[i]);
        }
      }
      // var employeeList = this.state.employee.filter(o => {
      //   return (o.firstName == value);
      // })
      console.log(employeeList);
      this.setState({employee: employeeList});
      
   }

  render() {
    return (
      <div>
        <input name="searchField" value={this.state.searchField} onChange={this.searchEmployee}/>
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
