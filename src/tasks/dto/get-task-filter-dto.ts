import {TaskStatuses} from "../tasks.model";

export class GetTaskFilterDto {
    status:TaskStatuses;
    search:string;
}