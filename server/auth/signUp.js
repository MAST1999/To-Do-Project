const path = require("path");
const fs = require("fs");

const signUp = (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", () => {
    const absolutePath = path.resolve("./server/userList.json");
    const jsonData = JSON.parse(data);
    fs.readFile(absolutePath, "utf-8", (err, fileData) => {
      if (err) throw err;

      let obj = JSON.parse(fileData);
      console.log("HERE", obj);

      for (let user in obj) {
        if (obj[user].username === jsonData.username) {
          res.setHeader("Content-Type", "text/html");
          res.statusCode = 400;
          res.end("<p>User Already Exists</p>");
          return;
        }
      }

      jsonData.id = Object.keys(obj).length + 1;
      obj.push(jsonData);

      fs.writeFile(absolutePath, JSON.stringify(obj), "utf-8", (err) => {
        if (err) throw err;
        console.log("The user Was Saved!");
      });

      fs.readFile("./server/listModel.json", "utf-8", (err, listModelFile) => {
        if (err) throw err;

        const listModel = JSON.parse(listModelFile);

        listModel[jsonData.username] = [];

        fs.writeFile(
          "./server/listModel.json",
          JSON.stringify(listModel),
          (err) => {
            if (err) throw err;

            console.log("Added the user to the list model.");
          }
        );
      });

      res.setHeader("Content-type", "application/json");
      res.end(
        JSON.stringify({
          message: `User ${jsonData.username} Created Successfully!`,
        })
      );
      return;
    });
  });
};

module.exports = signUp;
