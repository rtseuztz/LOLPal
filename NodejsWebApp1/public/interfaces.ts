
//Props & states
export interface Props {

}
export interface State {
    name: string;
    inputName: string;
    level: number;
    games: Array<object>;
    champions: Array<object>;
    user: Object;
}
export default State;


/*----------Objects--------*/

//tools
export interface Req {
    query: Query
}
export interface Query {
    action: string;
    name?: string;
    puuid?: string;
}