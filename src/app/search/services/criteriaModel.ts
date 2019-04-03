export interface Criteria {
    id:string;
    aName:string;
    eName:string;
    fName:string;
    dataSourceType:string;
}



export interface CriteriaSearch {
    general:string;
   search:AllCriteriaSearch[]
}


export interface AllCriteriaSearch {
    field:string;
    containes:string;
    SeachText:string;
}


