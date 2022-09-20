class NewItem {
  constructor(ingredient, quantity, weight) {
    this.ingredient = ingredient;
    this.quantity = quantity;
    this.weight = weight;
  }
}

class UI {
  addItemToTable(item) {
    //GET TABLE ELEMENT
    const table = document.getElementById("table-body");
    //CREATE NEW TABLE ROW
    const tableRow = document.createElement("tr");
    //CREATE COLUMNS
    tableRow.innerHTML = `
    <td>${item.ingredient}</td>
    <td>${item.quantity}</td>
    <td>${item.weight}</td>
    <td><a href="#" class="delete">X<a></td>
  `;

    //CHECK UNIT CONERVERSION BEFORE APPENDING

    if (table.rows.length === 0) {
      //APPEND NEW ROW TO TABLE
      table.appendChild(tableRow);
    } else {
      //GET TABLE ROW VARIABLE
      let tr = table.getElementsByTagName("tr");
      //  ITTERATE ROWS
      for (let i = 0; i < table.rows.length; i++) {
        //TABLE ROW, 2ND & 3RD CELLS, i
        let weightCell = tr[i].getElementsByTagName("td")[2];

        if (weightCell.innerHTML !== "g") {
          unitConversion();
          //APPEND NEW ROW TO TABLE
          table.appendChild(tableRow);
        } else {
          //APPEND NEW ROW TO TABLE
          table.appendChild(tableRow);
        }
      }
    }
  }

  searchTableForDuplicate() {
    //GET TABLE ELEMENT
    const table = document.getElementById("table-body");
    if (table.rows.length > 1) {
      //ITERATE THROUGH TABLE BACKWARDS
      for (let i = table.rows.length - 1; i >= 1; i--) {
        for (let j = i - 1; j >= 0; j--) {
          // GET TABLE ROW VARIABLE
          let tr = table.getElementsByTagName("tr");
          //TABLE ROW, 1ST CELL, i
          let td = tr[i].getElementsByTagName("td")[0];
          //TABLE ROW, 1ST CELL, j
          let tdp = tr[j].getElementsByTagName("td")[0];

          //CHECK FOR EQUALITY
          if (tdp.innerHTML === td.innerHTML) {
            tdp.nextElementSibling.innerHTML = `${
              parseInt(td.nextElementSibling.innerHTML) +
              parseInt(tdp.nextElementSibling.innerHTML)
            }`;

            td.parentElement.remove();
            break;
          }
        }
      }
    }
  }

  clearFields() {
    //CLEAR FORM
    document.getElementById("item").value = "";
    document.getElementById("qty").value = "";
    //CLEAR WEIGHT
  }

  deleteItem(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
}
//EVENT LISTENER FOR ADD
const itemForm = document.querySelector("#list-form");
itemForm.addEventListener("submit", function (e) {
  //ADD ITEM
  const ingredient = document.getElementById("item").value;
  const quantity = document.getElementById("qty").value;
  const weight = document.querySelector(".selection").value;

  //INSTANTIATE ITEM
  const item = new NewItem(ingredient, quantity, weight);

  //INSTANTIATE NEW UI
  const ui = new UI();

  //ADD ITEM TO TABLE
  ui.addItemToTable(item);

  //SEARCH TABLE FOR DUPLICATES
  ui.searchTableForDuplicate();

  //CLEAR FIELDS
  ui.clearFields();

  //PREVENT DEFAULT SUBMIT BEHAVIOUR
  e.preventDefault();
});

// EVENT LISTENER FOR DELETE
document.getElementById("table-body").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();

  // Delete book
  ui.deleteItem(e.target);

  e.preventDefault();
});

//UNIT CONVERSION BUTTON
function unitConversion() {
  //GET TABLE ELEMENT
  const table = document.getElementById("table-body");
  //GET TABLE ROW ELEMENT
  let tr = table.getElementsByTagName("tr");
  //ITTERATE ROWS
  for (let i = 0; i < table.rows.length; i++) {
    //TABLE ROW, 2ND & 3RD CELLS, i
    let qtyCell = tr[i].getElementsByTagName("td")[1];
    let weightCell = tr[i].getElementsByTagName("td")[2];

    // TOGGLE WEIGHT CONVERSION
    if (weightCell.innerHTML !== "g" && qtyCell.innerHTML > 0.9) {
      qtyCell.innerHTML = Math.ceil(parseInt(qtyCell.innerHTML) * 1000).toFixed(
        0
      );
      weightCell.innerHTML = "g";
    } else {
      if (weightCell.innerHTML === "g" && qtyCell.innerHTML < 999) {
      } else {
        qtyCell.innerHTML = Math.ceil(
          parseInt(qtyCell.innerHTML) / 1000
        ).toFixed(1);
        weightCell.innerHTML = "kg";
      }
    }
  }
}
