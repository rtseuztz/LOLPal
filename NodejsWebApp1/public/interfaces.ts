




/*----------Objects--------*/
export interface Req {
    query: Query
}
export interface Query {
    action: string;
    name?: string;
    puuid?: string;
}