import fs from "fs";
import { ToDoList } from "./getTodo";

export const getTodoList = (): Promise<Record<string, ToDoList[]>> => {
  return new Promise<Record<string, ToDoList[]>>((res, rej) => {
    fs.readFile(
      "./public/server/data/listModel.json",
      { encoding: "utf-8" },
      (err, content) => {
        if (err) rej(err);

        const listModel = JSON.parse(content);

        res(listModel);
      }
    );
  });
};
