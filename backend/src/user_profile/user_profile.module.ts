import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfileEntity } from "./user_profile.entity";
import { UserProfileController } from "./user_profile.controller";
import { UserProfileService } from "./user_profile.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserProfileEntity])],
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}
