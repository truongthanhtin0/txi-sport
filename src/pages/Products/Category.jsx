import React from "react";
import "./style.css";

function Category({ categoryList, handleChangeCategory }) {
  const handleClickCategory = (category) => {
    if (handleChangeCategory)
      handleChangeCategory(category.id, category.trademark, category.isSale);
  };

  return (
    <>
      <h5 className="text-start category__title">DANH MỤC SẢN PHẨM</h5>
      <ul className="ps-0 list-unstyled text-start">
        {categoryList &&
          categoryList.map((category) => (
            <li
              key={category.id}
              className="my-1 py-1 category__item"
              onClick={() => {
                handleClickCategory(category);
              }}
            >
              {category.name}
            </li>
          ))}
      </ul>
    </>
  );
}

export default Category;
