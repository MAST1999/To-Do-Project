const http = require("http");
const fs = require("fs");
const auth = require("./auth");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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

    case "/API/signupPage.js":
      res.setHeader("Content-Type", "text/javascript");
      path += "API/signupPage.js";
      break;

    case "/API/signinPage.js":
      res.setHeader("Content-Type", "text/javascript");
      path += "API/signinPage.js";
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

    case "/upload": {
      const { username, password } = auth.checkUser(req);

      fs.readFile("./server/userList.json", "utf-8", (err, userFile) => {
        if (err) throw err;

        let users = JSON.parse(userFile);

        for (let user of users) {
          if (user.username === username && user.password === password) {
            req.on("data", (chunk) => {
              data += chunk;
            });

            req.on("end", () => {
              const newData = JSON.parse(data);

              fs.readFile(
                "./server/listModel.json",
                "utf-8",
                (err, listModelFile) => {
                  if (err) throw err;

                  let listModel = JSON.parse(listModelFile);

                  for (let list in listModel) {
                    if (list === username) {
                      listModel[username] = newData;
                      fs.writeFile(
                        "./server/listModel.json",
                        JSON.stringify(listModel),
                        (err) => {
                          if (err) throw err;
                          console.log("Updated the list model");
                        }
                      );
                      res.end(JSON.stringify({ message: "Upload Successful" }));
                      return;
                    }
                  }
                }
              );
            });
          }
        }
      });
      return;
    }

    case "/download": {
      const { username, password } = auth.checkUser(req);

      if (!username) {
        res.statusCode = 404;
        res.end();
        return;
      }
      fs.readFile("./server/userList.json", "utf-8", (err, fileData) => {
        if (err) throw err;

        let users = JSON.parse(fileData);

        for (let user of users) {
          if (user.username === username && user.password === password) {
            fs.readFile("./server/listModel.json", (err, dataFile) => {
              if (err) {
                console.log(err);
                res.end(err);
              } else {
                let allLists = JSON.parse(dataFile);
                for (let prop in allLists) {
                  if (prop === username) {
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify(allLists[prop]));
                    return;
                  }
                }
                res.statusCode = 404;
                res.end();
              }
            });
          }
        }
      });

      return;
    }

    case "/users/post":
      auth.signUp(req, res);
      return;

    case "/users/get":
      auth.signIn(req, res);
      return;

    default:
      path += "404.html";
      break;
  }
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
