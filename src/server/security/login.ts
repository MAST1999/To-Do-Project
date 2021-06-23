import { IncomingMessage } from "http";
import { URL } from "url";
import { Users } from "../bin/www.js";
export const login = (req: IncomingMessage, users: Users): string => {
  const reqURL = `http://localhost:3000${req.url}`;
  const newURL = new URL(reqURL);
  const username = newURL.searchParams.get("username");
  const password = newURL.searchParams.get("password");

  if (users) {
    for (const user of users) {
      if (user.username === username && user.password === password) {
        return username;
      }
    }
    return "";
  } else {
    return "";
  }
};
