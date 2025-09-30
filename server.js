const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
app.use(express.json()); // parses the json requests for convenience
app.use(express.static(path.join(__dirname)));
const port = 3000;
    
app.get("/expenses", (req, res) => {
  /* theory:
        Input must be a JSON string (i.e. text that follows JSON format).
        Examples of valid JSON strings:
        "123"
        "\"hello\"" (represents the string "hello")
        "[1,2,3]"
        '{"a":1,"b":2}'

        JSON.parse converts JSON string → actual JS value
        "123" → 123 (JS number)
        "\"hello\"" → "hello" (JS string)
        "[1,2,3]" → [1, 2, 3] (JS array)
        '{"a":1,"b":2}' → { a: 1, b: 2 } (JS object)
    */
  const data = fs.readFileSync("./expenses.json", "utf-8"); // the json array is in string format
  const newdata = JSON.parse(data); // the json array is relieved of the string format and now its just json array
  res.json(newdata); // converting to json string again, we are converting again because this is json value that is converted, we cant just do res.(data) because its raw data and not json validated.
});

app.post("/expenses", (req, res) => {
  const data1 = fs.readFileSync("./expenses.json", "utf-8");
  const expenses = JSON.parse(data1);
  expenses.push(req.body);
  fs.writeFileSync("./expenses.json", JSON.stringify(expenses, null, 2));
  res.json({ success: true, expense: req.body });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
