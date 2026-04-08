import { StreamableFile } from "@nestjs/common";
import { BillingPeriodsService } from "./billing_periods.service";
import { BillingPeriodsEntity } from "./billing_periods.entity";
import { Response as ExpressResponse } from 'express';
export declare class BillingPeriodsController {
    private i_service;
    constructor(i_service: BillingPeriodsService);
    getAll(): Promise<BillingPeriodsEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<BillingPeriodsEntity>;
    addItem(createUserOto: BillingPeriodsEntity): Promise<BillingPeriodsEntity>;
    editItem(data: any): Promise<{
        message: string;
    }>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<BillingPeriodsEntity[]>;
    getAllByPage(page: number, limit: number): Promise<[BillingPeriodsEntity[], number]>;
    findCtrlNum(ctrl_num: string): Promise<BillingPeriodsEntity[]>;
    uploadDocument(file: any): Promise<{
        message: string;
        savedFilename: any;
        originalFilename: any;
    }>;
    getDocument(filename: string, res: any): StreamableFile;
    updateStatus(data: any): Promise<{
        message: string;
    }>;
    getStatistics(tc_id: number, fiscal_yr: string): Promise<{
        total_unutilized: any;
        total_utilized: any;
        total_payment: any;
        total_pending: any;
        total_submitted: any;
        total_implemented: any;
        pqm_codes: string[];
        pending_pqm_codes: string[];
        pqm_breakdown: {
            ctrl_num: string;
            allocated_budget: number;
            utilized_budget: number;
        }[];
    }>;
    getAllByMonth(month: number): Promise<BillingPeriodsEntity[]>;
    getAllByMonthByTC(month: number, tc_id: number): Promise<BillingPeriodsEntity[]>;
    chartGetDroppedStudentsMonth(fiscal_yr: string, tc_id: number): Promise<{
        scholarship: any;
        total_dropped: any;
        months: {
            month: string;
            total_dropped: number;
            number_of_qualifications: number;
            qualifications: any[];
        }[];
    }[]>;
    chartGetDroppedStudents(fiscal_yr: string, tc_id: number): Promise<{
        scholarship: any;
        total_dropped: any;
        number_of_qualifications: any;
        qualifications: unknown[];
    }[]>;
    chartGetBillingSubmissions(fiscal_yr: string): Promise<any[]>;
    computePerformanceScores(fiscal_yr: string): Promise<{
        trainingCenter: any;
        allocatedBudget: number;
        utilizedBudget: number;
        totalBillableSubmissions: number;
        onTimeCorrectSubmissions: number;
        BUR: number;
        BSC: number;
        WPS: number;
    }[]>;
    computePerformanceScoresByScholarships(fiscal_yr: string): Promise<{
        scholarshipDescription: any;
        allocatedBudget: number;
        numberOfTrainingCenters: number;
        numberOfTrainingsImplemented: number;
        numberOfQualifications: number;
        numberOfApprovedSlots: number;
        utilizedBudget: number;
        unUtilizedBudget: number;
        BUR: number;
    }[]>;
    computePerformanceScoresByTrainingCenters(fiscal_yr: string): Promise<{
        trainingCenter: any;
        allocatedBudget: number;
        numberOfTrainingsImplemented: number;
        numberOfQualifications: number;
        numberOfApprovedSlots: number;
        utilizedBudget: number;
        unUtilizedBudget: number;
        BUR: number;
    }[]>;
    computePerformanceScoresByQualifications(fiscal_yr: string): Promise<{
        qualification: any;
        allocatedBudget: number;
        utilizedBudget: number;
        totalBillableSubmissions: number;
        onTimeCorrectSubmissions: number;
        BUR: number;
        BSC: number;
        WPS: number;
    }[]>;
    generateReportBilling(file_data: any): Promise<Buffer<ArrayBufferLike>>;
    getReportFile(filename: string, res: ExpressResponse): StreamableFile;
    generateExcelBilling(file_data: any): Promise<{
        fileName: string;
    }>;
    getExcelFile(filename: string, res: ExpressResponse): StreamableFile;
    getAssessmentRates(fiscal_yr: string): Promise<{
        trainingCenter: any;
        competent: number;
        rateCompetent: number;
        nyc: number;
        rateNyc: number;
        absent: number;
        rateAbsent: number;
    }[]>;
    exportExcel(file_data: any): Promise<{
        fileName: string;
    }>;
    getExportedExcelFile(filename: string, res: ExpressResponse): StreamableFile;
}
