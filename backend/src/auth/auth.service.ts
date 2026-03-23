import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { comparePassword } from 'src/utils/bcrypt';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        @Inject('USER_SERVICE') private readonly usersService: UserService, 
        private jwtService: JwtService,
        private dataSource: DataSource) {}

    async validateUser(email: string, password: string, isGoogleLogin: boolean): Promise<any> {
        const user = await this.usersService.checkEmailExisted(email);
        //console.log(user, email, password);

        if(isGoogleLogin){
            if(user){
                return true;
            }
            else{
                return false;
            }    
        }
        else{
            const matched = comparePassword(password, user.password);
            if (user && matched){
                return true;
            }
            else{
                return false;
            }
        }
        
    }

    async loginUser(userdata: any) {

        const userdetails = await this.usersService.checkEmailExisted(userdata.email);
        const checkIfActive = await this.usersService.checkIfActive(userdata.email);
        const checkApproved = await this.usersService.checkIfApproved(userdata.email);
        
        
        if(userdetails){
            
            if(checkApproved){

                if(checkIfActive){

                    const isMatched = await this.validateUser(userdata.email,userdata.password,userdata.isGoogleLogin);
                    
                    if(isMatched){
                    
                        const payload = { user: userdetails };
                        
                        return {
                            token: this.jwtService.sign(payload),
                            user: userdetails,
                            status: HttpStatus.FOUND
                        };
        
                    }
                    else{
                        return new HttpException('Password do not match', HttpStatus.NOT_FOUND);
                    }
                }
                else{
                    return new HttpException('Account deactivated', HttpStatus.NOT_FOUND);
                }

            }
            else{
                return new HttpException('Account not yet approved', HttpStatus.NOT_FOUND);
            }

            

            

            

        }
        else{
            return new HttpException('User not registered', HttpStatus.NOT_FOUND);
        }
        
    }

}
