import React from "react";
import { useParams } from "react-router-dom";

function DollById() {
  let { id } = useParams();
  console.log("id", id);
  return <div>DollById {id}</div>;
}

export default DollById;
    