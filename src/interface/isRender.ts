import { IsList } from "./isList";

export interface IsRender {
  (
    model: IsList[],
    showStatus: string,
    username: string,
    isGuest: boolean
  ): void;
}
