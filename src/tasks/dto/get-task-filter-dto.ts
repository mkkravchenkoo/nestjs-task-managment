
import {IsIn, IsNotEmpty, IsOptional} from "class-validator";
import {TaskStatus} from "../task-status.enum";

export class GetTaskFilterDto {
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    @IsOptional()
    status:TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search:string;
}