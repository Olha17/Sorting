let lists =  [
  {"Индия":1423662000, "Китай":1407799000, "США": 336023460, "Индонезия": 280488501},
  {"Япония":126351069, "Эстония": 1328360, "Швейцария": 8570146, "Хорватия": 4076246}
];


//Выводит данные из объекта на экран

let htmlString = "";
     for (let key in lists) {
        for (let item in lists[key]) {
          htmlString += "<tr>";
            htmlString +=  "<td>" + item + "</td>" + "<td>" + lists[key][item] + "</td>";
            htmlString += "</tr>";
        }
     }
    
    document.getElementById("Table").innerHTML = htmlString;



//Фильтр по названию

function searchItems() {

  let input = document.getElementById("Input"),
      filter = input.value.toUpperCase(),
      table = document.getElementById("tableName"),
      tr = table.getElementsByTagName("tr");

  
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}



//Сортировка по названию и значению

document.addEventListener('DOMContentLoaded', () => {

  const getSort = ({ target }) => {
      const order = (target.dataset.order = -(target.dataset.order || -1));
      const index = [...target.parentNode.cells].indexOf(target);
      const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
      const comparator = (index, order) => (a, b) => order * collator.compare(
          a.children[index].innerHTML,
          b.children[index].innerHTML
      );
      
      for(const tBody of target.closest('table').tBodies)
          tBody.append(...[...tBody.rows].sort(comparator(index, order)));

      for(const cell of target.parentNode.cells)
          cell.classList.toggle('sorted', cell === target);
  };
  
  document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));
  
});