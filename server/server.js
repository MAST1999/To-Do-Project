const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  console.log("request made");

  let path = "./";
  let data = "";
  switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      path += "index.html";
      break;
    case "/API/app.js":
      res.setHeader("Content-Type", "text/javascript");
      path += "API/app.js";
      console.log("success");
      break;
    case "/API/controller.js":
      res.setHeader("Content-Type", "text/javascript");
      path += "API/controller.js";
      break;
    case "/API/model.js":
      res.setHeader("Content-Type", "text/javascript");
      path += "API/model.js";
      break;
    case "/API/view.js":
      res.setHeader("Content-Type", "text/javascript");
      path += "API/view.js";
      break;
    case "/style.css":
      res.setHeader("Content-Type", "text/css");
      path += "style.css";
      console.log("success");
      break;
    case "/upload":
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        fs.writeFile("listModel.json", data, (err) => {
          if (err) return console.log(err);
          console.log("file was saved!");
        });
        res.setHeader("Content-Type", "application/json");
        res.end(data);
      });
      break;
    case "/download":
      console.log("HERE");
      res.setHeader("Content-Type", "application/json");
      fs.readFile("./listModel.json", (err, data) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          res.end(data);
        }
      });
      break;
    default:
      // eslint-disable-next-line no-unused-vars
      path += "404.html";
      break;
  }

  //* set header for the response

  //* send the html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end("<h1>Something Went Wrong</h2>");
    } else {
      console.log(path);
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for request on port ", 3000);
});
