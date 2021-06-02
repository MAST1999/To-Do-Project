const http = require("http");
const fs = require("fs");
const auth = require("./auth");

const server = http.createServer((req, res) => {
  let want = "";
  if (req.url.indexOf("?") !== -1) {
    want = req.url.slice(0, req.url.indexOf("?"));
  } else {
    want = req.url;
  }
  console.log(want, req.method);
  console.log("request made");

  let path = "./";
  let data = "";
  switch (want) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      res.setHeader("Access-Control-Allow-Origin", "*");
      path += "index.html";
      break;

    case "/API/app.js":
      res.setHeader("Content-Type", "text/javascript");
      res.setHeader("Access-Control-Allow-Origin", "*");
      path += "API/app.js";
      console.log("success");
      break;

    case "/API/controller.js":
      res.setHeader("Content-Type", "text/javascript");
      res.setHeader("Access-Control-Allow-Origin", "*");
      path += "API/controller.js";
      break;

    case "/API/signupPage.js":
      res.setHeader("Content-Type", "text/javascript");
      res.setHeader("Access-Control-Allow-Origin", "*");
      path += "API/signupPage.js";
      break;

    case "/API/model.js":
      res.setHeader("Content-Type", "text/javascript");
      res.setHeader("Access-Control-Allow-Origin", "*");
      path += "API/model.js";
      break;

    case "/API/view.js":
      res.setHeader("Content-Type", "text/javascript");
      res.setHeader("Access-Control-Allow-Origin", "*");
      path += "API/view.js";
      break;

    case "/style.css":
      res.setHeader("Content-Type", "text/css");
      res.setHeader("Access-Control-Allow-Origin", "*");
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
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(data);
      });
      return;

    case "/download": {
      console.log("HERE");

      const reqURL = `http://localhost:3000${req.url}`;
      let user = new URL(reqURL).searchParams.get("user");

      fs.readFile("./server/listModel.json", (err, dataFile) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          let allLists = JSON.parse(dataFile);
          for (let prop in allLists) {
            if (prop === user) {
              res.setHeader("Content-Type", "application/json");
              res.setHeader("Access-Control-Allow-Origin", "*");
              res.end(JSON.stringify(allLists[prop]));
              return;
            }
          }
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.statusCode = 404;
          res.end();
        }
      });
      return;
    }

    case "/users/post":
      auth.signUp(req, res);
      return;

    default:
      path += "404.html";
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
      return;
  }
});

server.listen(3000, "localhost", () => {
  console.log("listening for request on port ", 3000);
});
