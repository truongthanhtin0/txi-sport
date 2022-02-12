import React from "react";
import {Pagination} from "react-bootstrap";
import "./style.css";

function Paging({total, currentPage, setCurrentPage, limit}) {
  let items = [];
  for (let number = 1; number <= Math.ceil(total / limit); number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div>
      <Pagination>
        <Pagination.Prev />
        {items}
        <Pagination.Next />
      </Pagination>
    </div>
  );
}

export default Paging;
