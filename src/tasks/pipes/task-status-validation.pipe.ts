import {BadRequestException, PipeTransform} from "@nestjs/common";
import {TaskStatuses} from "../tasks.model";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        TaskStatuses.OPEN,
        TaskStatuses.IN_PROGRESS,
        TaskStatuses.DONE
    ]
    transform(value: any): any {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException("Invalid status")
        }

        return value
    }

    private isStatusValid(status:any){
        const idx = this.allowedStatuses.indexOf(status);

        return idx !== -1;
    }
}