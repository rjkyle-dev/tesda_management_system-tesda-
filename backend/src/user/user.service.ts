import { Column, DataSource, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import { UserTypesEntity } from "src/user_types/user_types.entity";
import { TrainingCentersEntity, UserProfileEntity } from "src/entities";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private i_repository: Repository<UserEntity>,
        private dataSource: DataSource


    ) { }

    async getAll(){

      return await this.i_repository.createQueryBuilder("user")
      .leftJoinAndMapOne('user.id',UserProfileEntity,'user_profile','user.id = user_profile.user_id')
      .orderBy('user_profile.lname', 'ASC')
      .getMany();
  }

  async getAllByType(isActive : number){

    return await this.i_repository.createQueryBuilder("user")
    .where('user.isActive = :isActive',{isActive : isActive})
    .orderBy('user.lname', 'ASC')
    .getMany();
}

  async getCount(){

    const total_cnt = await this.i_repository.createQueryBuilder("user")
    .select("COUNT(user.id)", "cnt")
    .getRawOne();

    return {
      total_cnt : total_cnt.cnt,
    };
}

  async getAllByPage(type: number, page: number, limit : number, search_data: { value: string; type: string }){

    var start_from = (page-1) * limit;

    const query = this.i_repository.createQueryBuilder('user');

    query.leftJoinAndMapOne('user.ut_id',UserTypesEntity,'user_type','user.ut_id = user_type.id')
    .leftJoinAndMapOne('user.user_profile',UserProfileEntity,'up','user.id = up.user_id')

    const results = await query
    .where('user.ut_id = :type',{type : type})
    .orderBy('user.datetime_added', 'DESC')
    .skip(start_from)
    .take(limit);

    if (search_data?.value && search_data?.type === 'search') {
        query.andWhere('(up.fname LIKE :value OR up.mname LIKE :value OR up.lname LIKE :value OR user.email LIKE :value OR up.phone_number LIKE :value)', {
            value: `%${search_data.value}%`
        });
    }

    return results.getManyAndCount();

}

async getAllByPageType(ut_id: number, page: number, limit : number){

  var start_from = (page-1) * limit;

  const query = this.i_repository.createQueryBuilder('user');

  query.leftJoinAndMapOne('user.ut_id',UserTypesEntity,'user_type','user.ut_id = user_type.id')
  .leftJoinAndMapOne('user.user_profile',UserProfileEntity,'up','user.id = up.user_id')
  .where('user.ut_id = :ut_id',{ut_id : ut_id})

  const results = await query
  .orderBy('user.datetime_added', 'DESC')
  .skip(start_from)
  .take(limit) 
  .getManyAndCount();

  return results;

}
  
  async findUser(id : number){

      return await this.i_repository.createQueryBuilder("user")
      .leftJoinAndMapOne('user.ut_id',UserTypesEntity,'user_type','user.ut_id = user_type.id')
      .leftJoinAndMapOne('user.user_profile',UserProfileEntity,'up','user.id = up.user_id')
      .where("user.id = :id", {id : id})
      .getOne();
  }

  async searchNameByPage(page: number, limit : number, name : string){

    var start_from = (page-1) * limit;

    const query = this.i_repository.createQueryBuilder('user');

    query.leftJoinAndMapOne('user.ut_id',UserTypesEntity,'user_type','user.ut_id = user_type.id')
    .where("user.lname LIKE :name OR user.fname LIKE :name", {name : `%${name}%`})

    const results = await query
    .orderBy('user.datetime_added', 'DESC')
    .skip(start_from)
    .take(limit) 
    .getManyAndCount();

    return results;
}

async searchName(name : string){

  return await this.i_repository.createQueryBuilder("user")
    .leftJoinAndMapOne('user.ut_id',UserTypesEntity,'user_type','user.ut_id = user_type.id')
    .where("user.lname LIKE :name OR user.fname LIKE :name AND user.isActive = 1", {name : `%${name}%`})
    .getMany();

}

  async findTypeofUser(name : string){

    return await this.i_repository.createQueryBuilder("user")
    .leftJoinAndMapOne('user.ut_id',UserTypesEntity,'user_type','user.ut_id = user_type.id')
    .where("user.isActive = 1 AND user_type.description = :name", {name : name})
    .getOne();
}

 async registerUser(user: UserEntity): Promise<UserEntity> {
    const password = encodePassword(user.password);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
        // Make sure to await the save
        const savedUser = await this.i_repository.save({ ...user, password });

        await queryRunner.commitTransaction();

        // savedUser now contains the generated ID
        return savedUser;

    } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err; // re-throw the error so frontend knows
    } finally {
        await queryRunner.release();
    }
}

    checkEmailExisted(email:string): Promise<UserEntity>{
        // const response = this.i_repository.findOneBy({email});
        // return response;

        return this.i_repository.createQueryBuilder("user")
        .leftJoinAndMapOne('user.ut_id',UserTypesEntity,'user_type','user.ut_id = user_type.id')
        .leftJoinAndMapOne('user.user_info',UserProfileEntity,'user_profile','user.id = user_profile.user_id')
        .leftJoinAndMapOne('user.tc_id',TrainingCentersEntity,'training_center','user.tc_id = training_center.id')
        .where("user.email  = :email", {email : email})
        .getOne();
      }

      async checkIfApproved(email : string){
        //return this.todoRepository.findBy(id);
        
        return await this.i_repository.createQueryBuilder("user")
        .select(["user"])
        .where("user.email  = :email AND user.isApproved = :isApproved", {email : email, isApproved : 1})
        .getOne();
    }
    
      async checkIfActive(email : string){
        //return this.todoRepository.findBy(id);
        
        return await this.i_repository.createQueryBuilder("user")
        .select(["user"])
        .where("user.email  = :email AND user.isActive = :isActive", {email : email, isActive : 1})
        .getOne();
      }

      async updateProfilePic(data:any){

        return await this.i_repository.update(data.id, { 
          profile_pic: data.profile_pic,
        });
    
      }

      async editUser(data:any){

        return await this.i_repository.update(data.id, { 
          tc_id: data.tc_id,
          email: data.email,
        });
    
      }

      async saveEsign(userId: number, filename: string) {
      const user = await this.i_repository.findOneBy({ id: userId });
      if (!user) throw new NotFoundException();

      user.e_sign = filename;
      return this.i_repository.save(user);
    }

    async saveProfPic(userId: number, filename: string) {
      const user = await this.i_repository.findOneBy({ id: userId });
      if (!user) throw new NotFoundException();

      user.profile_pic = filename;
      return this.i_repository.save(user);
    }

    async editEmail(data:any){

      return await this.i_repository.update(data.id, { 
        email: data.email,
      });
  
    }

    
    async editPassword(data: any) {
      const { id, old_pw, new_pw, confirm_pw } = data;

      const user = await this.i_repository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const matched = await comparePassword(old_pw, user.password);
      if (!matched) {
        throw new BadRequestException('Old password is incorrect');
      }

      if (new_pw !== confirm_pw) {
        throw new BadRequestException('Passwords do not match');
      }

      const hashedPassword = await encodePassword(new_pw);

      await this.i_repository.update(id, {
        password: hashedPassword,
      });

      return {
        message: 'Password updated successfully',
      };
    

    }


}
