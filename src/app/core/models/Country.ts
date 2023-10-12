import { Participation } from "./Participation";
import { Statistics } from "./Statistics";

export interface Country{
    name : string;
    value : number;
    series : Statistics[];
}                           