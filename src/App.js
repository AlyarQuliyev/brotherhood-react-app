import "./styles.css";
import React, { Component } from "react";
import Employee from "./components/Employee";

export default class App extends Component {
  state = {
    employees: [],
    filteredList: [],
    filter: "All",
    searchText: ""
  };
  fetchList = async () => {
    try {
      const request = await fetch(
        "https://5ea5ca472d86f00016b4626d.mockapi.io/brotherhood"
      );
      const response = await request.json();
      let list = response.map((emp) => {
        return { ...emp, alive: Math.random() < 0.5 };
      });
      this.setState({ employees: list, filteredList: list });
    } catch (error) {
      console.log(error);
    }
  };
  clickHandle = (e) => {
    const condition = e.target.dataset.filter;
    const { employees } = this.state;
    let result = [];
    switch (condition) {
      case "true":
        result = employees.filter((emp) => emp.alive === true);
        break;
      case "false":
        result = employees.filter((emp) => emp.alive === false);
        break;
      case "Management":
        result = employees.filter((emp) => emp.department === "Management");
        break;
      case "Recruitment":
        result = employees.filter((emp) => emp.department === "Recruitment");
        break;
      case "Security":
        result = employees.filter((emp) => emp.department === "Security");
        break;
      default:
        result = employees;
        break;
    }
    this.setState({ filteredList: result });
  };
  searchHandle = (e) => {
    const condition = e.target.value;
    const { employees } = this.state;
    let result = [];
    result = employees.filter((emp) =>
      emp.name.toLowerCase().includes(condition.toLocaleLowerCase())
    );
    this.setState({ filteredList: result });
  };
  componentDidMount() {
    this.fetchList();
  }
  render() {
    const { filteredList } = this.state;
    return (
      <div className="App">
        <div className="filter-bar">
          <button onClick={this.fetchList}>Refresh data</button>
          <button onClick={this.clickHandle}>All</button>
          <button onClick={this.clickHandle} data-filter="true">
            Alive
          </button>
          <button onClick={this.clickHandle} data-filter="false">
            Not Alive
          </button>
        </div>
        <div className="search-bar">
          <label>
            Search :
            <input type="text" name="query" onChange={this.searchHandle} />
          </label>
        </div>
        <div className="filter-bar">
          <button onClick={this.clickHandle}>All</button>
          <button onClick={this.clickHandle} data-filter="Management">
            Management
          </button>
          <button onClick={this.clickHandle} data-filter="Recruitment">
            Recruitment
          </button>
          <button onClick={this.clickHandle} data-filter="Security">
            Security
          </button>
        </div>
        <div className="list-employees">
          {filteredList.length > 0
            ? filteredList.map((employee) => {
                return <Employee key={employee.id} employee={employee} />;
              })
            : "No data found..."}
        </div>
      </div>
    );
  }
}
