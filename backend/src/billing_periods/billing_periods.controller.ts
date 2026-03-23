import { BadRequestException, Body, Controller, Delete, Query, Get, HttpStatus, Param, Post, Put, Res, UploadedFile, UseInterceptors, Response, StreamableFile, Logger } from "@nestjs/common";
import { BillingPeriodsService } from "./billing_periods.service";
import { BillingPeriodsEntity } from "./billing_periods.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { createReadStream, existsSync  } from "fs";
import * as path from 'path';
import { join, extname, basename } from "path";
import { diskStorage } from "multer";
import * as mime from 'mime-types';
import * as fs from 'fs';
import { Response as ExpressResponse } from 'express'; // Import Express Response


@Controller('billing_periods')
export class BillingPeriodsController {

    constructor(private i_service: BillingPeriodsService) {

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
    async addItem(@Body() createUserOto: BillingPeriodsEntity){
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
    async getAllByPage(@Param('page') page: number, @Param('limit') limit: number) {
        const response = await this.i_service.getAllByPage(page,limit);
        return response;
    }
    
    @Get("find_by_ctrl_num/:ctrl_num")
    async findCtrlNum(@Param('ctrl_num') ctrl_num: string) {
        const response = await this.i_service.findCtrlNum(ctrl_num);
        return response;
    }

    @Post('upload_file')
    @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
        destination: '../uploads_billing/',

        filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        // Convert filename to UTF-8 explicitly (fixes mojibake)
        const rawName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        const originalName = path.basename(rawName, ext);

        // Remove unsafe filesystem characters but preserve original filename
        const safeBaseName = originalName
            .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')  // Remove any unsafe characters for filesystem

        // Save file using the original name (without appending timestamp)
        const finalName = `${safeBaseName}${ext}`;
        cb(null, finalName);
        },
    }),

    // fileFilter to accept images, pdf, and excel files
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel', // .xls
        'image/jpeg', // .jpg, .jpeg
        'image/png',  // .png
        'image/gif',  // .gif
        ];

        if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new BadRequestException('Only PDF, Excel, and image files are allowed'), false);
        }

        cb(null, true);
    },
    }))
    async uploadDocument(@UploadedFile() file) {
    if (!file) {
        throw new BadRequestException("No file uploaded");
    }

    return {
        message: "Файл успешно загружен",         // File uploaded successfully
        savedFilename: file.filename,             // Final saved filename
        originalFilename: file.originalname,      // Original uploaded name (Cyrillic included)
    };
    }

        @Get('get_file/:filename')
        // @UseGuards(JwtAuthGuard)
        getDocument(
        @Param('filename') filename: string,
        @Response({ passthrough: true }) res
        ): StreamableFile {
        const filePath = join(process.cwd(), '../uploads_billing/', filename);

        if (!existsSync(filePath)) {
            throw new BadRequestException('File not found');
        }

        const fileStream = createReadStream(filePath);

        // Determine MIME type based on file extension
        const mimeType = mime.lookup(filename) || 'application/octet-stream';

        // URL encode the filename to handle special characters and Cyrillic characters
        const encodedFilename = encodeURIComponent(filename);

        // Set appropriate headers to handle content disposition and the encoded filename
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `inline; filename*=UTF-8''${encodedFilename}`,
        });

        return new StreamableFile(fileStream);
        }

        @Post("update_status")
        async updateStatus(@Body() data:any) {
            const response = await this.i_service.updateStatus(data);
            return response;
        }

        @Get("get_statistics/:tc_id/:fiscal_yr")
        async getStatistics(@Param('tc_id') tc_id: number, @Param('fiscal_yr') fiscal_yr: string) {
            const response = await this.i_service.getStatistics(tc_id, fiscal_yr);
            return response;
        }

        @Get("get_all_by_month/:month")
        async getAllByMonth(@Param('month') month: number) {
            const response = await this.i_service.getAllByMonth(month);
            return response;
        }
        
        @Get("get_all_by_month_tc/:month/:tc_id")
        async getAllByMonthByTC(@Param('month') month: number, @Param('tc_id') tc_id: number) {
            const response = await this.i_service.getAllByMonthByTC(month,tc_id);
            return response;
        }

        @Get("chart_get_dropped_by_tc_month/:fiscal_yr/:tc_id")
        async chartGetDroppedStudentsMonth(@Param('fiscal_yr') fiscal_yr: string, @Param('tc_id') tc_id: number) {
            const response = await this.i_service.chartGetDroppedStudentsMonth(fiscal_yr,tc_id);
            return response;
        }

        @Get("chart_get_dropped_by_tc/:fiscal_yr/:tc_id")
        async chartGetDroppedStudents(@Param('fiscal_yr') fiscal_yr: string, @Param('tc_id') tc_id: number) {
            const response = await this.i_service.chartGetDroppedStudents(fiscal_yr,tc_id);
            return response;
        }

        @Get("chart_get_billing_submission_by_tc/:fiscal_yr")
        async chartGetBillingSubmissions(@Param('fiscal_yr') fiscal_yr: string) {
            const response = await this.i_service.chartGetBillingSubmissions(fiscal_yr);
            return response;
        }

        @Get("performance_scores/:fiscal_yr") 
        async computePerformanceScores(@Param('fiscal_yr') fiscal_yr: string) {
            const response = await this.i_service.computePerformanceScores(fiscal_yr);
            return response;
        }

        @Get("performance_scores_by_sc/:fiscal_yr") 
        async computePerformanceScoresByScholarships(@Param('fiscal_yr') fiscal_yr: string) {
            const response = await this.i_service.computePerformanceScoresByScholarships(fiscal_yr);
            return response;
        }

        @Get("performance_scores_by_tc/:fiscal_yr") 
        async computePerformanceScoresByTrainingCenters(@Param('fiscal_yr') fiscal_yr: string) {
            const response = await this.i_service.computePerformanceScoresByTrainingCenters(fiscal_yr);
            return response;
        }

        @Get("performance_scores_by_q/:fiscal_yr") 
        async computePerformanceScoresByQualifications(@Param('fiscal_yr') fiscal_yr: string) {
            const response = await this.i_service.computePerformanceScoresByQualifications(fiscal_yr);
            return response;
        }

        @Post('generate_report_billing')
        async generateReportBilling(@Body() file_data: any) {
            const response = await this.i_service.generateReportBilling(file_data);
            return response;
        }

        @Get('get_report_file/:filename')
        getReportFile(@Param('filename') filename: string, @Response({ passthrough: true }) res: ExpressResponse): StreamableFile {
            const filePath = path.join(process.cwd(), '../report_files', filename);

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
        
        @Post('generate_excel_billing')
        async generateExcelBilling(@Body() file_data: any) {
            const response = await this.i_service.generateExcelBilling(file_data);
            return response;
        }

        @Get('get_excel_file/:filename')
        getExcelFile(
            @Param('filename') filename: string,
            @Response({ passthrough: true }) res: ExpressResponse,
        ): StreamableFile {
            const filePath = path.join(process.cwd(), '../report_files', filename);

            if (!existsSync(filePath)) {
            throw new BadRequestException('File not found');
            }

            const fileStream = createReadStream(filePath);

            const mimeType =
            mime.lookup(filename) ||
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            const encodedFilename = encodeURIComponent(filename);

            res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `attachment; filename*=UTF-8''${encodedFilename}`,
            });

            return new StreamableFile(fileStream);
        }

        @Get("assessment_rates/:fiscal_yr")
        async getAssessmentRates(@Param('fiscal_yr') fiscal_yr: string) {
            return this.i_service.getAssessmentRates(fiscal_yr);
        }

        @Post('export_excel')
        async exportExcel(@Body() file_data: any) {
            const response = await this.i_service.exportExcel(file_data);
            return response;
        }

        
        @Get('get_exported_excel_file/:filename')
        getExportedExcelFile(
        @Param('filename') filename: string,
        @Response({ passthrough: true }) res: ExpressResponse,
        ): StreamableFile {
        const filePath = path.join(process.cwd(), '../exported_billing_periods', filename);

        if (!existsSync(filePath)) {
            throw new BadRequestException('File not found');
        }

        const fileStream = createReadStream(filePath);

        const mimeType =
            mime.lookup(filename) ||
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        // Encode the filename for Content-Disposition
        const encodedFilename = encodeURIComponent(filename);
        // Fallback ASCII-safe filename for older browsers
        const asciiFilename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');

        res.set({
            'Content-Type': mimeType,
            // RFC 5987 compliant
            'Content-Disposition': `attachment; filename="${asciiFilename}"; filename*=UTF-8''${encodedFilename}`,
        });

        return new StreamableFile(fileStream);
        }



}
