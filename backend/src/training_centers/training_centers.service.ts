import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, DataSource, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { TrainingCentersEntity } from './training_centers.entity';
import { QualificationsEntity, TrainingCentersTypeEntity, UserEntity, UserProfileEntity } from 'src/entities';
import * as ExcelJS from 'exceljs';
import * as path from 'path';
import * as fs from 'fs-extra';

@Injectable()
export class TrainingCentersService {
    constructor(
        @InjectRepository(TrainingCentersEntity)
        private readonly i_repository: Repository<TrainingCentersEntity>,
        @InjectRepository(QualificationsEntity)
        private readonly q_repository: Repository<QualificationsEntity>,
        private dataSource: DataSource
    ) { }

    async getAll(){

        return await this.i_repository.createQueryBuilder("training_centers")
        .orderBy('training_centers.datetime_added', 'DESC')
        .getMany();
    }

    async getCount(){

        const total_cnt = await this.i_repository.createQueryBuilder("training_centers")
        .select("COUNT(training_centers.id)", "cnt")
        .getRawOne();
    
        return {
          total_cnt : total_cnt.cnt,
        };
    }

    async findItem(id : number){

        return await this.i_repository.createQueryBuilder("training_centers")
        .leftJoinAndMapOne('training_centers.administrator_id',UserEntity,'admin_id','training_centers.administrator_id = admin_id.id')
        .leftJoinAndMapOne('admin_id.user_info',UserProfileEntity,'admin_info','admin_id.id = admin_info.user_id')
        .leftJoinAndMapOne('training_centers.sc_focal_id',UserEntity,'focal_id','training_centers.sc_focal_id = focal_id.id')
        .leftJoinAndMapOne('focal_id.user_info',UserProfileEntity,'focal_info','focal_id.id = focal_info.user_id')
        .where("training_centers.id = :id", {id : id})
        .getOne();
    }

    async addItem(user: TrainingCentersEntity) : Promise<TrainingCentersEntity>{

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try{

        const res = this.i_repository.save(user);
        await queryRunner.commitTransaction();
        return res;
        
        } catch (err) {
        await queryRunner.rollbackTransaction();
        } finally {
        await queryRunner.release();
        }
    
    }

    async editItem(data:any){

        return await this.i_repository.update(data.id, { 
        description : data.description,
        abbre : data.abbre,
        address : data.address,
        province : data.province,
        region : data.region,
        administrator_id : data.administrator_id,
        sc_focal_id : data.sc_focal_id,
        list_q_id : data.list_q_id,
        list_sc_id : data.list_sc_id
        });

      }


      async deleteItem(data:any){

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try{

        const res = this.i_repository.delete(data.id);
        await queryRunner.commitTransaction();
        return res;
        
        } catch (err) {
        await queryRunner.rollbackTransaction();
        } finally {
        await queryRunner.release();
        }

        
        }

        async searchName(name : string){

            return await this.i_repository.createQueryBuilder("training_centers")
            .where("training_centers.name LIKE :name OR training_centers.abbre LIKE :name", {name : `%${name}%`})
            .getMany();
        }

        async getAllByPage(page: number, limit : number, search_data: { value: string; type: string }){
        
            var start_from = (page-1) * limit;

            const query = this.i_repository.createQueryBuilder('training_centers');
        
            query.leftJoinAndMapOne('training_centers.tc_type_id',TrainingCentersTypeEntity,'tc_type','training_centers.tc_type_id = tc_type.id')
            .leftJoinAndMapOne('training_centers.administrator_id',UserEntity,'admin_id','training_centers.administrator_id = admin_id.id')
            .leftJoinAndMapOne('admin_id.user_info',UserProfileEntity,'admin_info','admin_id.id = admin_info.user_id')
            .leftJoinAndMapOne('training_centers.sc_focal_id',UserEntity,'focal_id','training_centers.sc_focal_id = focal_id.id')
            .leftJoinAndMapOne('focal_id.user_info',UserProfileEntity,'focal_info','focal_id.id = focal_info.user_id')

         
        
            const results = await query
            .orderBy('training_centers.datetime_added', 'DESC')
            .skip(start_from)
            .take(limit);

                 // 🔍 Apply SEARCH if provided
        if (search_data?.value && search_data?.type === 'search') {
            query.andWhere('(training_centers.abbre LIKE :value OR training_centers.description LIKE :value)', {
                value: `%${search_data.value}%`
            });
        }

            
        
            return results.getManyAndCount();
        }


    async generateSummaryTrainingCenters(file_data: any): Promise<Buffer> {
    const puppeteer = require('puppeteer');
    const fs = require('fs-extra');
    const hbs = require('handlebars');
    const path = require('path');

    let summaryData;

    // 1️⃣ Fetch summary data
    summaryData = await this.getTrainingCenterSummaryData();

    // Attach data to file_data for template rendering
    file_data.summaryData = summaryData;

    // 2️⃣ Helper function to compile Handlebars template
    const compile = async (templateName: string, data: any): Promise<string> => {
        const filePath = path.join(process.cwd(), '../templates', `${templateName}.hbs`);
        const html = await fs.readFile(filePath, 'utf-8');

        // Register helpers if needed (optional / extendable)
        hbs.registerHelper('eq', function (a, b, options) {
            return a === b ? options.fn(this) : options.inverse(this);
        });

        return hbs.compile(html)(data);
    };

    try {
        // 3️⃣ Launch Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Compile Handlebars template
        const content = await compile('summary_training_centers', file_data);

        // Set HTML content
        await page.setContent(content, { waitUntil: 'networkidle0' });

        // Ensure output directory exists
        const outputFolder = path.join(process.cwd(), '../summary_training_centers');
        await fs.ensureDir(outputFolder);

        const filePath = path.join(outputFolder, file_data.file_name);

        // 4️⃣ Generate PDF
        const buffer = await page.pdf({
            path: filePath,
            format: 'letter',
            landscape: false,
            printBackground: true,
            margin: {
                top: '20mm',
                bottom: '20mm',
                left: '15mm',
                right: '15mm',
            },
        });

        await browser.close();

        return buffer;
    } catch (e) {
        console.error('Error generating summary training centers PDF:', e);
        throw new Error('Error generating PDF report');
    }
}


   /** Fetch training centers and their qualifications from list_q_id array */
async getTrainingCenterSummaryData(): Promise<any[]> {
  const centers = await this.i_repository.find();
  const result = [];

  for (const center of centers) {
    if (!center.list_q_id) continue; // skip if null or empty

    // Convert list_q_id string to array of numbers
    const qIds = center.list_q_id
      .split(',')
      .map(id => parseInt(id.trim()))
      .filter(id => !isNaN(id)); // remove invalid numbers

    if (qIds.length === 0) continue;

    // Fetch qualifications for this center
    const qualifications = await this.q_repository
      .createQueryBuilder('q')
      .where('q.id IN (:...ids)', { ids: qIds })
      .getMany();

    const formattedQualifications = qualifications.map(q => ({
      qualification: q.description,
      duration: `${q.hrs}hrs`,
    }));

    result.push({
      trainingCenter: center.description,
      qualifications: formattedQualifications,
    });
  }

  return result;
}






}
