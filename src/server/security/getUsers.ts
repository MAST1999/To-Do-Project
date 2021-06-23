import fs from "fs";
import { Users } from "../bin/www";

export const getUsers = (): Promise<Users> => {
  return new Promise<Users>((res, rej) => {
    fs.readFile(
      "./public/server/data/users.json",
      { encoding: "utf-8" },
      (err, content) => {
        if (err) rej(err);

        const users: Users = JSON.parse(content);

        res(users);
      }
    );
  });
};
