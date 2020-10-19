import {Body, Controller, Get, Post, Param, Delete, Patch, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import {TasksService} from './tasks.service'
import {Task, TaskStatuses} from "./tasks.model";
import {CreateTaskDto} from "./dto/create-task-dto";
import {GetTaskFilterDto} from "./dto/get-task-filter-dto";


@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService) {}

    @Get()
    getTasks(@Query() filterDto:GetTaskFilterDto):Task[]{
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilter(filterDto);
        }else{
            return this.tasksService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param("id") id:string):Task{
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param("id") id:string):void{
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param("id") id:string,
        @Body("status") status:TaskStatuses
    ):Task{
        return this.tasksService.updateTaskStatus(id, status)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto:CreateTaskDto):Task{
        return this.tasksService.createTask(createTaskDto)
    }
}
