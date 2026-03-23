import { BadRequestException, Body, Controller, Delete, Query, Get, HttpStatus, Param, Post, Put, Res, UploadedFile, UseInterceptors, Response, StreamableFile, Logger } from "@nestjs/common";
import { TrainingCentersService } from "./training_centers.service";
import { TrainingCentersEntity } from "./training_centers.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { createReadStream, existsSync  } from "fs";
import * as path from 'path';
import { join, extname, basename } from "path";
import { diskStorage } from "multer";
import * as mime from 'mime-types';
import * as fs from 'fs';
import { Response as ExpressResponse } from 'express'; // Import Express Response


@Controller('training_centers')
export class TrainingCentersController {

    constructor(private i_service: TrainingCentersService) {

    }

    @Get("get_all")
    async getAll() {
        const response = await this.i_service.getAll();
        return response;
    }

    @Get("get_count")
    async getCount() {
        const response = await this.i_service.getCount();
        return response;
    }

    @Get("find/:id")
    async findItem(@Param('id') id: number) {
        const response = await this.i_service.findItem(id);
        return response;
    }

    @Post('add')
    async addItem(@Body() createUserOto: TrainingCentersEntity){
        const response = await this.i_service.addItem(createUserOto);
        return response;
    }

    @Post("edit")
    async editItem(@Body() data:any) {
        const response = await this.i_service.editItem(data);
        return response;
    }

    @Post("delete")
    async deleteItem(@Body() data:any) {
        const response = await this.i_service.deleteItem(data);
        return response;
    }

    @Get("search/:name")
    async searchName(@Param('name') name: string) {
        const response = await this.i_service.searchName(name);
        return response;
    }

     @Get("get_all_by_page/:page/:limit")
        async getAllByPageTypeUser(
            @Param('page') page: number, 
            @Param('limit') limit: number,
            @Query('value') search_value: string,
            @Query('type') search_type: string,) {
            const response = await this.i_service.getAllByPage(page,limit, { value: search_value, type: search_type });
            return response;
        }

    
        @Post('generate_summary')
        async generateSummaryTrainingCenters(@Body() file_data: any) { 
            const response = await this.i_service.generateSummaryTrainingCenters(file_data);
            return response;
        }

        @Get('get_summary/:filename')
        getSummaryFile(@Param('filename') filename: string, @Response({ passthrough: true }) res: ExpressResponse): StreamableFile { 
            const filePath = path.join(process.cwd(), '../summary_training_centers', filename); 

            // Check if the file exists
            if (!existsSync(filePath)) {
                throw new BadRequestException('File not found');
            }

            const fileStream = createReadStream(filePath);

            // Get MIME type for PDF file
            const mimeType = mime.lookup(filename) || 'application/pdf';

            // URL encode the filename to handle special characters and Cyrillic characters
            const encodedFilename = encodeURIComponent(filename);

            // Set appropriate headers to handle content disposition and the encoded filename
            res.set({
                'Content-Type': mimeType,
                'Content-Disposition': `inline; filename*=UTF-8''${encodedFilename}`,  // Ensure filename is URL-encoded
            });

            // Return the file as a StreamableFile
            return new StreamableFile(fileStream);
        }

}
