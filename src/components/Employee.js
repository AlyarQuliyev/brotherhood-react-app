import { Component } from "react";

export default class Employee extends Component {
  render() {
    const { name, department, role, alive } = this.props.employee;
    return (
      <div className="employee">
        <p>Name: {name}</p>
        <p>Department: {department}</p>
        <p>Role: {role}</p>
        <p>Alive: {alive.toString()}</p>
      </div>
    );
  }
}
