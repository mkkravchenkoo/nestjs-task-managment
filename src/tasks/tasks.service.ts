import { Injectable } from '@nestjs/common';
import {Task, TaskStatuses} from "./tasks.model";
import { v4 as uuidv4 } from 'uuid';
import {CreateTaskDto} from "./dto/create-task-dto";

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks():Task[]{
        return this.tasks;
    }
    createTask(createTaskDto:CreateTaskDto):Task{
        const {title, description} = createTaskDto;

        const task:Task = {
            id:uuidv4(),
            title,
            description,
            status:TaskStatuses.OPEN
        }

        this.tasks.push(task);

        return task

    }

    deleteTask(id:string){
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    getTaskById(id:string):Task{
        return this.tasks.find((task) => task.id===id)
    }
}
