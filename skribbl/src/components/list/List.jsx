import React from "react";

function List({ dataSource, renderItem }) {
  console.group({ dataSource });
  return <div>{dataSource.map(renderItem)}</div>;
}

export default List;
