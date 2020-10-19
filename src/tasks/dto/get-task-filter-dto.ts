import {TaskStatuses} from "../tasks.model";
import {IsIn, IsNotEmpty, IsOptional} from "class-validator";

export class GetTaskFilterDto {
    @IsIn([TaskStatuses.OPEN, TaskStatuses.IN_PROGRESS, TaskStatuses.DONE])
    @IsOptional()
    status:TaskStatuses;

    @IsOptional()
    @IsNotEmpty()
    search:string;
}