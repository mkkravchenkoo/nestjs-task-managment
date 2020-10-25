import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Delete,
    Patch,
    Query,
    UsePipes,
    ValidationPipe,
    ParseIntPipe
} from '@nestjs/common';
import {TasksService} from './tasks.service'
import {CreateTaskDto} from "./dto/create-task-dto";
import {GetTaskFilterDto} from "./dto/get-task-filter-dto";
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import {Task} from "./task.entity";


@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService) {}

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto:GetTaskFilterDto):Task[]{
    //     if(Object.keys(filterDto).length){
    //         return this.tasksService.getTasksWithFilter(filterDto);
    //     }else{
    //         return this.tasksService.getAllTasks();
    //     }
    // }
    //
    @Get('/:id')
    getTaskById(@Param("id", ParseIntPipe) id:number):Promise<Task>{
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param("id", ParseIntPipe) id:number):Promise<void>{
        return this.tasksService.deleteTask(id);
    }
    //
    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param("id") id:string,
    //     @Body("status", TaskStatusValidationPipe) status:TaskStatuses
    // ):Task{
    //     return this.tasksService.updateTaskStatus(id, status)
    // }
    //
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto:CreateTaskDto):Promise<Task>{
        return this.tasksService.createTask(createTaskDto)
    }
}
