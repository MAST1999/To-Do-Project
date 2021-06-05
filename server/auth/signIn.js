const fs = require("fs");

const signIn = (req, res) => {
  const reqURL = `http://localhost:3000${req.url}`;
  const newURL = new URL(reqURL);
  const username = newURL.searchParams.get("username");
  const password = newURL.searchParams.get("password");

  req.on("data", (chunk) => {
    console.log(chunk);
  });
  req.on("end", () => {
    fs.readFile("./server/userList.json", "utf-8", (err, fileData) => {
      if (err) throw err;

      let users = JSON.parse(fileData);

      for (let user in users) {
        if (
          users[user].username === username &&
          users[user].password === password
        ) {
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Access-Control-Allow-Origin", "*");

          fs.readFile("./server/listModel.json", "utf-8", (err, fileData) => {
            if (err) throw err;

            let lists = JSON.parse(fileData);

            for (let list in lists) {
              if (list === username) {
                res.end(JSON.stringify(lists[list]));
                return;
              }
            }
          });
          return;
        }
      }
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.statusCode = 404;
      res.end();
      return;
    });
  });
};

module.exports = signIn;
