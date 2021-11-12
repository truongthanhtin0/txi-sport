import React from "react";
import { Pagination } from "react-bootstrap";

function PaginationProduct({ count, filters, handleChangePagination }) {
  const handleOnclick = (newPage) => {
    if (handleChangePagination) handleChangePagination(newPage);
  };

  let items = [];
  for (let number = 1; number <= Math.ceil(count / filters._limit); number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === filters._page}
        onClick={() => handleOnclick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination className="d-flex justify-content-center">
        <Pagination.Prev
          disabled={filters._page <= 1}
          onClick={() => handleOnclick(filters._page - 1)}
        />
        {items}
        <Pagination.Next
          disabled={filters._page >= Math.ceil(count / filters._limit)}
          onClick={() => handleOnclick(filters._page + 1)}
        />
      </Pagination>
    </div>
  );
}

export default PaginationProduct;
