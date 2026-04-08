import { DataSource, Repository } from "typeorm";
import { BillingPeriodsEntity } from './billing_periods.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationsRecipientsService } from 'src/notifications_recipients/notifications_recipients.service';
export declare class BillingPeriodsService {
    private readonly i_repository;
    private readonly i_notification;
    private readonly i_notificationRecipients;
    private dataSource;
    constructor(i_repository: Repository<BillingPeriodsEntity>, i_notification: NotificationsService, i_notificationRecipients: NotificationsRecipientsService, dataSource: DataSource);
    getAll(): Promise<BillingPeriodsEntity[]>;
    getCount(): Promise<{
        total_cnt: any;
    }>;
    findItem(id: number): Promise<BillingPeriodsEntity>;
    addItem(user: BillingPeriodsEntity): Promise<BillingPeriodsEntity>;
    editItem(data: any): Promise<{
        message: string;
    }>;
    deleteItem(data: any): Promise<import("typeorm").DeleteResult>;
    searchName(name: string): Promise<BillingPeriodsEntity[]>;
    getAllByPage(page: number, limit: number): Promise<[BillingPeriodsEntity[], number]>;
    findCtrlNum(ctrl_num: string): Promise<BillingPeriodsEntity[]>;
    private mapStatus;
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
    chartGetDroppedStudents(fiscal_yr: string, tc_id: number): Promise<{
        scholarship: any;
        total_dropped: any;
        number_of_qualifications: any;
        qualifications: unknown[];
    }[]>;
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
    private formatDate;
    private getStatusLabel;
    getBillingReportData(year: string, tc_id?: number): Promise<any>;
    getUtilizationReportData(year: string, tc_id: number | null): Promise<any>;
    getComplianceReportData(year: string, tc_id: number | null): Promise<any>;
    getPerformanceEvaluationData(year: string): Promise<any>;
    getScholarshipAllocationReport(year: string): Promise<any>;
    calculateUtilizationRate(allocated: string, utilized: string): string;
    getAssessmentRatesReportData(year: string, tc_id: number | null): Promise<any>;
    getDroppedTraineesReport(year: string, tc_id: number | null): Promise<any>;
    generateReportBilling(file_data: any): Promise<Buffer>;
    generateExcelBilling(file_data: any): Promise<{
        fileName: string;
    }>;
    getBillingReportDataForExcel(year: string, tc_id?: number): Promise<any[]>;
    getUtilizationReportDataForExcel(year: string, tc_id: number | null): Promise<any[]>;
    getComplianceReportDataForExcel(year: string, tc_id: number | null): Promise<any[]>;
    getPerformanceEvaluationDataForExcel(year: string): Promise<any[]>;
    getScholarshipAllocationReportForExcel(year: string): Promise<any[]>;
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
    private sanitizeFileName;
    private diffInHours;
    private diffInBusinessDays;
}
