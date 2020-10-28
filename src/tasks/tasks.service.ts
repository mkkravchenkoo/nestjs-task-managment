import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task-dto";
import {TaskRepository} from "./task.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./task.entity";
import {TaskStatus} from "./task-status.enum";
import {GetTaskFilterDto} from "./dto/get-task-filter-dto";
import {User} from "../auth/user.entity";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository:TaskRepository
    ) {
    }

    getTasks(filterDto:GetTaskFilterDto, user:User):Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto, user);

    }

    async createTask(createTaskDto:CreateTaskDto, user:User):Promise<Task>{
        return this.taskRepository.createTask(createTaskDto, user)
    }

    async deleteTask(id:number):Promise<void>{
        const result =  await this.taskRepository.delete(id);
        if(result.affected === 0){
            throw new NotFoundException("Task not found");
        }
    }

    async getTaskById(id:number):Promise<Task>{
        const found = await this.taskRepository.findOne(id);
        if(!found){
            throw new NotFoundException("Task not found");
        }
        return found
    }

    async updateTaskStatus(id:number, status:TaskStatus):Promise<Task>{

        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();

        return task
    }
}
