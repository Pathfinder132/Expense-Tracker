class expense {
  constructor(name, amount, date) {
    this.name = name;
    this.amount = amount;
    this.date = date;
  }
}
const np = document.getElementsByClassName("add-field");
let ET = [];
let i = 0;
ET = JSON.parse(localStorage.getItem("value")) || [];
function renderexp(exp) {
  let p = document.createElement("p");
  let q = document.createElement("p");
  p.textContent = exp.name + " on " + exp.date;
  q.textContent = exp.amount;
  document.getElementsByClassName("month")[0].appendChild(p);
  document.getElementsByClassName("month")[0].appendChild(q);
  p.classList.add("cubes");
  q.classList.add("cubes");
}
ET.forEach((element) => {
  renderexp(element);
});
np[0].addEventListener("submit", (event) => {
  event.preventDefault(); //prevents from reloading and wiping data
  let f = document.getElementById("fname");
  let g = document.getElementById("gname");
  let h = document.getElementById("hname");
  ET.push(new expense(f.value, g.value, h.value));
  localStorage.setItem("value", JSON.stringify(ET)); // using localstorage concept to store values
  renderexp(ET[ET.length - 1]);
  f.value = ""; // resets the input values
  g.value = "";
  h.value = "";
});
