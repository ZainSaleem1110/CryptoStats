export interface SmartContract {
  id: string,
  name: string,
  address: string,
  symbol: string;
  profileImage?: string;
}

export interface SmartContractPage {
  success: boolean;
  pageCount: number;
  datas: SmartContract[];
}

export interface SmartContractResponse {
  sucess: boolean;
  data: SmartContract;
}