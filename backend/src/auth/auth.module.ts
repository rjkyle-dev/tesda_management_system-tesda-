import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([UserEntity]), JwtModule.register({
    secret: 'SECRET', //put in env vars
    signOptions: { expiresIn: '60s' },
  })],
  providers: [
    AuthService,
    JwtStrategy,
  {
    provide: 'USER_SERVICE',
    useClass: UserService
  }],
  exports : [AuthService],
  controllers: [AuthController]
})

export class AuthModule {}
