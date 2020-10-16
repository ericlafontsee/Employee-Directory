import React, { Component } from "react";
import API from "../utils/API";
import TableRow from "../components/TableRow";
import Fuse from 'fuse.js';

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
      .then(res => {
        const data = res.data.results;
        const employeeRecords = [];
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
        // this.setState({ employee: res.data.results }); 
      })
      .catch((err) => console.log(err));
  }
  
   searchEmployee = event => {
      const value = event.target.value;
      this.setState({searchField: value});
      // const employeeList = [];
      // const currentEmployees = this.state.employee;
      // for(var i = 0; i < currentEmployees.length; i++){
      //   if (currentEmployees[i].firstName.indexOf(value) > -1){
      //     employeeList.push(currentEmployees[i]);
      //   }
      // }
      // const filtered = currentEmployees.filter(res =>  value === `${res.firstName} ${res.lastName}` );
      const fuse = new Fuse(this.state.employee, {
        keys: [
          'name.first',
          'name.last',
          'email',
          'phone'

        ]
      })
      
      // this.setState({employee: employeeList});
      this.setState({
        results: fuse.search(event).map(el => el.item)
      });
      
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
            {this.state.employee.map((record, key) => {
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
