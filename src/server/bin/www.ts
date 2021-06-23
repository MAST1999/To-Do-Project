import fs from "fs";
import http from "http";
import path from "path/posix";
import { getTodo, ToDoList } from "../security/getTodo.js";
import { getTodoList } from "../security/getTodoList.js";
import { getUsers } from "../security/getUsers.js";
import { login } from "../security/login.js";

export interface User {
  username: string;
  password: string;
}

export type Users = User[];

const port = process.env.PORT || 3000;
const contentType = "Content-Type";

const mimeTypes: Record<string, string> = {
  ".js": "application/javascript",
  ".html": "text/html",
  ".css": "text/css",
  ".json": "application/json",
  ".map": "application/json",
};

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  let filePath = "." + req.url;
  let check = "";

  if (req.url) {
    if (!~req.url.indexOf("?")) {
      check = req.url;
    } else {
      check = req.url.slice(0, req.url.indexOf("?"));
    }
  }

  console.log(req.method, req.url, check);

  switch (check) {
    case "/user/download": {
      try {
        const users = await getUsers();
        const username = login(req, users);

        if (username) {
          const todos = await getTodo(username);

          res.setHeader(contentType, mimeTypes[".json"]);
          res.statusCode = 200;
          res.end(JSON.stringify(todos), "utf-8");
        } else {
          res.statusCode = 500;
          res.setHeader(contentType, mimeTypes[".html"]);
          res.end("Invalid user name!");
        }
      } catch (err) {
        console.error("Error in /user/download", err);
      }
      break;
    }
    case "/user/upload": {
      try {
        const users = await getUsers();
        const username = login(req, users);
        if (username) {
          let uploadData = "";

          req.on("data", (chunk) => {
            uploadData += chunk;
          });

          req.on("end", async () => {
            const newTodos: ToDoList[] = JSON.parse(uploadData);

            const todos = await getTodoList();
            todos[username] = newTodos;
            fs.writeFile(
              "./public/server/data/listModel.json",
              JSON.stringify(todos),
              (err) => {
                if (err) throw err;

                res.setHeader(contentType, mimeTypes[".json"]);
                res.statusCode = 201;
                res.end(JSON.stringify(newTodos), "utf-8");
              }
            );
          });
        } else {
          res.statusCode = 500;
          res.setHeader(contentType, mimeTypes[".html"]);
          res.end("Invalid user name!");
        }
      } catch (err) {
        console.error("error in upload", err);
      }
      break;
    }
    case "/user/login": {
      try {
        const users = await getUsers();
        const username = login(req, users);
        if (username) {
          const todos = await getTodo(username);
          res.setHeader(contentType, mimeTypes[".json"]);
          res.statusCode = 200;
          res.end(JSON.stringify(todos));
        } else {
          res.statusCode = 500;
          res.setHeader(contentType, mimeTypes[".html"]);
          res.end("Invalid user name!");
        }
      } catch (err) {
        console.log(err);
      }
      break;
    }

    case "/user/create": {
      const users = await getUsers();
      const reqURL = `http://localhost:3000${req.url}`;
      const newURL = new URL(reqURL);
      const username = newURL.searchParams.get("username");
      const password = newURL.searchParams.get("password");

      for (const user of users) {
        if (user.username === username) {
          res.setHeader(contentType, mimeTypes[".json"]);
          res.statusCode = 400;
          res.end(JSON.stringify({ message: "username already exists!" }));
          return;
        }
      }

      if (username && password) {
        users.push({ username, password });
        fs.readFile(
          "./public/server/data/listModel.json",
          { encoding: "utf-8" },
          (err, content) => {
            if (err) throw err;

            const listModel = JSON.parse(content);
            listModel[username] = [];
            fs.writeFile(
              "./public/server/data/listModel.json",
              JSON.stringify(listModel),
              (err) => {
                if (err) throw err;
              }
            );
          }
        );
        fs.writeFile(
          "./public/server/data/users.json",
          JSON.stringify(users),
          (err) => {
            if (err) throw err;

            res.setHeader(contentType, mimeTypes[".json"]);
            res.statusCode = 201;
            res.end(JSON.stringify({ message: "Username Created" }));
          }
        );
      }

      break;
    }

    default: {
      if (req.url === "/") {
        filePath = "./index.html";
      }

      const extname = String(path.extname(filePath)).toLowerCase();

      const contentName = mimeTypes[extname];

      if (!contentName) {
        fs.readFile(
          "./public/app/view/404.html",
          { encoding: "utf-8" },
          (err, content) => {
            if (err) throw err;

            res.setHeader(contentType, "text/html");
            res.statusCode = 404;
            res.end(content);
          }
        );
        break;
      }

      fs.readFile(filePath, { encoding: "utf-8" }, (err, fileData) => {
        if (err && err.code === "ENOENT") {
          fs.readFile(
            "./public/app/view/404.html",
            { encoding: "utf-8" },
            (err, content) => {
              if (err) throw err;

              res.setHeader(contentType, "text/html");
              res.statusCode = 404;
              res.end(content);
            }
          );
        } else if (err) {
          res.setHeader(contentType, contentName);
          res.statusCode = 500;
          res.end("There has been an error with code: " + err.code);
        } else {
          res.setHeader(contentType, contentName);
          res.statusCode = 200;
          res.end(fileData);
        }
      });
    }
  }
});

server.listen(port);
console.log("Listening on port: ", port);
