import React from "react";
import '../css/pagination.css';

const Pagination = ({ elementsPerPage, totalElements, paginate}) => {
    const pageNumbers = []
    for(let i = 2; i <= Math.ceil(totalElements / elementsPerPage); i++) {
        pageNumbers.push(i)
    }
    // alert(totalElements);

    function changePage(e) {
      var currentElementId = e.target.id;
      var elements = document.querySelectorAll(".pages a");
      elements.forEach(element => {
        element.className = "disabled"; // Удаляем active у всех элементов
    });
    var currentElement = document.getElementById(currentElementId)
    currentElement.classList = "active"
     paginate(currentElementId);
    }

    // alert(pageNumbers);
    
    return (
      <div id="pagesDiv">
        <div class="pages">
            <a class="active" id ="1" onClick={changePage} href="#">1</a>
          {
            pageNumbers.map(number => 
              <a class="disabled" id ={number} onClick={changePage} href="#">{number}</a>
              )
          }
          
        </div>
      </div>
    )
}

export default Pagination;