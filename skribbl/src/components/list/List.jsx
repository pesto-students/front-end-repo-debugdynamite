import React from "react";

function List({ dataSource, renderItem }) {
  return <div>{dataSource.map(renderItem)}</div>;
}

export default List;
