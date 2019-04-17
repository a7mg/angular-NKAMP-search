export interface Criteria {
  id: string;
  aName: string;
  eName: string;
  fName: string;
  dataSourceType: string;
}

export interface CriteriaSearch {
  general: string;
  search: AllCriteriaSearch[];
}

export interface AllCriteriaSearch {
  field: string;
  containes: string;
  operator: string;
  SeachText: string;
}

export interface searchKeyword{
  id: string;
  aName: string;
  eName: string;
  fName: string;
  displayOrderNumber:number;
  isGeneral:boolean,
  materialTypeId:string
  allowedSearchOperations:Criteria[];
}


export interface allowedSearchOperationsobj{
  index:number;
  allowedSearchOperations:Criteria[];
}









