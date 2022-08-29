import { UserInfo } from './user.type';
import { CollectionInfo } from './collection.type';

export interface Nft {
  id: string;
  name: string;
  description: string;
  image: string;
  currency: string | null;
  User?: UserInfo;
  Collection: CollectionInfo;
  percentChange: number | null;
  result: result;
  tokenId: string;
  price: number;
  theoreticalPrice: number;
}

interface result {
  ETH: number;
  USD: number;
}

export interface NftPage {
  success: boolean;
  countPage: number;
  datas: Nft[];
}

export interface NftResponse {
  item: Nft;
  sucess: boolean;
}
