class expense {
  constructor(name, amount, date) {
    this.name = name;
    this.amount = amount;
    this.date = date;
  }
}

function renderexp(exp) {
  let p = document.createElement("p");
  let q = document.createElement("p");
  let r = document.createElement("br");
  p.textContent = exp.name + " ON " + exp.date;
  q.textContent = "amount = " + exp.amount;
  document.getElementsByClassName("month")[0].appendChild(p);
  document.getElementsByClassName("month")[0].appendChild(q);
  document.getElementsByClassName("month")[0].appendChild(r);
  p.classList.add("cubes"); 
  q.classList.add("cubes");
}

fetch("/expenses")
  .then((res) => res.json())
  .then((data) => data.forEach(renderexp));

const np = document.getElementsByClassName("add-field");
np[0].addEventListener("submit", (event) => {
  event.preventDefault();
  let f = document.getElementById("fname");
  let g = document.getElementById("gname");
  let h = document.getElementById("hname");
  let ep = new expense(f.value, g.value, h.value); // using value property to get the value
  fetch("/expenses", {
    method: "POST", // default method of fetch is GET
    headers: { "Content-Type": "application/json" }, //defining the content type which is json
    body: JSON.stringify(ep), //sending the data itself by converting into JSON string
  })
    .then((res) => res.json()) // this piece of code is to not let the code silently fail
    .then((data) => {
      if (data.success) renderexp(ep); // and to also render immediately
      else console.error("failed");
    })
    .catch((err) => console.error("error posting response" + err));

  f.value = ""; // resets the input values
  g.value = "";
  h.value = "";
});
