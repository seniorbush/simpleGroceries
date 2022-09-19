//declare UI variables
const itemForm = document.querySelector("#list-form");
const itemList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-list");

const itemInput = document.querySelector("#item");
const qtyInput = document.querySelector("#qty");
// const weightOption = document.getElementsByClassName("browser-default");

const grams = document.querySelector("#grams");
const tsp = document.querySelector("#tsp");
const tbsp = document.querySelector("#tbsp");
const milli = document.querySelector("#milli");
const cup = document.querySelector("#cup");
const single = document.querySelector("#single");

//create event listeners function
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
  //Add task event
  // itemForm.addEventListener("submit", addItem);
  itemForm.addEventListener("submit", newRow);
  //search table rows for duplicates and sum qty
  itemForm.addEventListener("submit", searchSum);
}

//new row
function newRow(e) {
  //get table element
  const table = document.getElementById("table-body");

  //create a new table row and table data elements
  const tableRow = document.createElement("tr");
  let tr = table.getElementsByTagName("tr");
  const tableData1 = document.createElement("td");
  const tableData2 = document.createElement("td");

  //set table data to input values
  tableData1.innerHTML = document.getElementById("item").value;
  const qty = document.getElementById("qty").value;
  const weightSelection = document.querySelector(".selection").value;

  //concat qty + weight
  tableData2.innerHTML = `${qty}`;
  // tableData2.innerHTML = `${qty}${weightSelection}`;

  //append data to row
  tableRow.appendChild(tableData1);
  tableRow.appendChild(tableData2);

  //append row to table
  table.appendChild(tableRow);

  //clear inputs
  itemInput.value = "";
  qtyInput.value = qtyInput.defaultValue;

  //prevent default submit behaviour
  e.preventDefault();
}

// function to search for duplicates rows and sum qty
function searchSum(e) {
  const table = document.getElementById("table-body");

  if (table.rows.length > 1) {
    //Iterate through the table rows backwards
    for (let i = table.rows.length - 1; i >= 1; i--) {
      for (let j = table.rows.length - 2; j >= 0; j--) {
        // Table row variable
        let tr = table.getElementsByTagName("tr");

        //Current first Table cell element in the search
        let td = tr[i].getElementsByTagName("td")[0];
        //Previous first Table cell element in the search
        let tdp = tr[j].getElementsByTagName("td")[0];
        //Previous first table element in the search
        // let tdp =
        //   td.parentElement.previousElementSibling.getElementsByTagName("td")[0];
        // console.log(td, tdp);
        // Check td vs previous Table Row, First cell
        if (td.innerHTML === tdp.innerHTML) {
          tdp.nextElementSibling.innerHTML = `${
            parseInt(td.nextElementSibling.innerHTML) +
            parseInt(tdp.nextElementSibling.innerHTML)
          }`;
          td.parentElement.remove();
          console.log(td.nextElementSibling.innerHTML);

          // console.log(`${i} is in the table`);
        }
      }
    }
  }

  e.preventDefault();
}

// for (let i = table.rows.length - 1; i >= 1; i--) {
//   for (let j = table.rows.length - 2; j >= 1; j--) {

// for (let i = 0; i < table.rows.length; i++) {
//   for (let j = i + 1; j < table.rows.length; i++) {
