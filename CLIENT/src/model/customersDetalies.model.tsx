import { DochSnati } from "../enums/dochSnati.enum";
import { Status } from "../enums/typeCustemers.enum";

export class customersDetalies {
    id!: string;
    name!: string;
    phone!: string;
    status!: Status;
    dateOpenTik!:Date;
    dochSnati!:DochSnati
    note!:string
}
