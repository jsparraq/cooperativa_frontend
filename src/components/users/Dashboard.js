import React, { Fragment } from "react";
import Form from "./Form";
import Users from "./Users";

export default function Dashboard() {
  return (
    <div>
      <Fragment>
        <Form />
        <Users />
      </Fragment>
    </div>
  );
}