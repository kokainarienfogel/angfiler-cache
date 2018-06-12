export class Tree {
  children: File2;
  name: string;
}

export class File2 {
  pinned: boolean;
  actualFile: string;
  hash: string;
  name: string;
  size: number;
}
