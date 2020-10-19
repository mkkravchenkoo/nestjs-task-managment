import {Injectable, NotFoundException} from '@nestjs/common';
import {Task, TaskStatuses} from "./tasks.model";
import { v4 as uuidv4 } from 'uuid';
import {CreateTaskDto} from "./dto/create-task-dto";
import {GetTaskFilterDto} from "./dto/get-task-filter-dto";

@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks():Task[]{
        return this.tasks;
    }

    getTasksWithFilter(filterDto:GetTaskFilterDto):Task[]{
        const {status, search} = filterDto;

        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter((task) => task.status === status);
        }
        if(search){
            tasks = tasks.filter((task) => task.title.includes(search) || task.description.includes(search));
        }


        return tasks

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
        const found = this.tasks.find((task) => task.id===id);

        if(!found){
            throw new NotFoundException("Task not found");
        }

        return found
    }

    updateTaskStatus(id:string, status:TaskStatuses):Task{

        const task = this.getTaskById(id);
        task.status = status;

        return task
    }
}
