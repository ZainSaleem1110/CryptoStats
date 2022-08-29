import { CollectionInfo } from "./collection.type";

interface nftItem {
  id: string;
  name: string;
  image: string;
  description: string;
  tokenId: string;
}

interface UserMin {
  id: string;
  username: string;
  address: string;
}

export interface SearchbarData {
  users: UserMin[];
  items: nftItem[];
  collections: CollectionInfo[];
}

export interface SearchBarResponse {
  sucess:boolean;
  datas: SearchbarData;
}