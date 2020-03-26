export enum CreditScoreFilter {
    All = "All",
    Good = "Good",
    Bad = "Bad",
    Neutral = "Neutral",
    Ascending = "Ascending",
    Descending = "Descending"
}


export interface applicant  {
    id: string,
    first_name: string,
    last_name: string,
    credit_indicator: number

}
  
export interface filter  {
    name: string 
    credit: CreditScoreFilter
}











