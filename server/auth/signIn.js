const fs = require("fs");
const checkUser = require("./checkUser");

const signIn = (req, res) => {
  const { username, password } = checkUser(req);

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
      }
    }
  });
};

module.exports = signIn;
