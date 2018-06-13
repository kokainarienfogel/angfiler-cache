export type TreeChild = Tree | File2;

export class Tree {
  children: TreeChild[];
  name: string;
}

export class File2 {
  pinned: boolean;
  actualFile: string;
  hash: string;
  name: string;
  size: number;
}
