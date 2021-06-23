import fs from "fs";

export type ToDoList = {
  listId: number;
  title: string;
  toDos: [];
};

export const getTodo = async (username: string): Promise<ToDoList[]> => {
  return new Promise<ToDoList[]>((resolve, reject) => {
    fs.readFile(
      "./public/server/data/listModel.json",
      { encoding: "utf-8" },
      (err, content) => {
        if (err) reject(err);

        const listModel: Record<string, ToDoList[]> = JSON.parse(content);

        if (username) {
          const singleUser: ToDoList[] = listModel[username];
          resolve(singleUser);
        }
      }
    );
  });
};
