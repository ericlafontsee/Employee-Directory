import React, { Component } from "react";
import API from "../utils/API";
import TableRow from "../components/TableRow";
import Container from "../components/Container";
import Row from "../components/Row";

class Search extends Component {
  state = {
    searchField: "",
    employees: [],
    filtered: [],
    error: ""
  };

  componentDidMount() {
    API.getUsers()
      .then((res) => {
        const data = res.data.results;
        const employees = data.map((o) => ({
          firstName: o.name.first,
          lastName: o.name.last,
          email: o.email,
          picture: o.picture.thumbnail,
          phone: o.cell
        }));

        this.setState({ employees: employees, filtered: employees });
      })
      .catch((err) => console.log(err));
  }

  searchEmployee = (event) => {
    const value = event.target.value.toLowerCase();
    this.setState({
      searchField: value,
      filtered: this.state.employees.filter(o => {
          const name = o.firstName.toLowerCase().trim() + o.lastName.toLowerCase().trim();
        return (name.includes(value));
      })
    });
  };

  render() {
    return (
      <Container style={{ minHeight: "80%" }}>
        <Row style={{ width: "100%" }}>
          <input
            name="searchField"
            value={this.state.searchField}
            onChange={this.searchEmployee}
          />
        </Row>
        <Row>
          <table style={{ width: "100%" }}>
            <thead>
              <tr style={{ color: "white", fontSize: "25px" }}>
                <th></th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filtered.map((record, key) => {
                return (
                  <TableRow
                    firstName={record.firstName}
                    lastName={record.lastName}
                    email={record.email}
                    phone={record.phone}
                    picture={record.picture}
                    key={key}
                  />
                );
              })}
            </tbody>
          </table>
        </Row>
      </Container>
    );
  }
}

export default Search;
