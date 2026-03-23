import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, StreamableFile, UploadedFiles, UseInterceptors, Response, Query, UploadedFile, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./user.entity";
import { FilesHelper } from "src/helper";
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { createReadStream } from "fs";
import { join } from "path";
import { lookup } from 'mime-types';

@Controller('user')
export class UserController {

    constructor(private i_service: UserService) {

    }

    @Get("get_users")
    async getAll() {
        const response = await this.i_service.getAll();
        return response;
    }

    @Get("get_users_by_type/:isActive")
    async getAllByType(@Param('isActive') isActive: number) {
        const response = await this.i_service.getAllByType(isActive);
        return response;
    }

    @Get("get_count")
    async getCount() {
        const response = await this.i_service.getCount();
        return response;
    }
 
    @Get("get_users_by_page/:type/:page/:limit")
        async getAllByPageTypeUser(
            @Param('type') type: number, 
            @Param('page') page: number, 
            @Param('limit') limit: number,
            @Query('value') search_value: string,
            @Query('type') search_type: string,) {
            const response = await this.i_service.getAllByPage(type,page,limit, { value: search_value, type: search_type });
            return response;
        }

    @Get("get_users_by_page_type/:ut_id/:page/:limit")
    async getAllByPageType(@Param('ut_id') ut_id: number, @Param('page') page: number, @Param('limit') limit: number) {
        const response = await this.i_service.getAllByPageType(ut_id,page,limit);
        return response;
    }


    @Get("find_user/:user_id")
    async findUser(@Param('user_id') user_id: number) {
        const response = await this.i_service.findUser(user_id);
        return response;
    }

    @Get("search_page/:page/:limit/:name")
    async searchNameByPage(@Param('page') page: number, @Param('limit') limit: number, @Param('name') name: string) {
        const response = await this.i_service.searchNameByPage(page,limit,name);
        return response;
    }

    @Get("search/:name")
    async searchName(@Param('name') name: string) {
        const response = await this.i_service.searchName(name);
        return response;
    }

    @Get("find_type_of_user/:name")
    async findTypeofUser(@Param('name') name: string) {
        const response = await this.i_service.findTypeofUser(name);
        return response;
    }

    @Post('register')
    async registerUser(@Body() createUserOto: UserEntity){
        return await this.i_service.registerUser(createUserOto);
    }


  @Post('upload_esign/:id')
    @UseInterceptors(
    FileInterceptor('file', {
        storage: diskStorage({
        destination: '../e_signatures',
        filename: FilesHelper.customFileName,
        }),
    }),
    )
    async uploadEsign(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Req() req,
    ) {
    return this.i_service.saveEsign(id, file.filename);
    }

  @Post('upload_pic/:id')
    @UseInterceptors(
    FileInterceptor('file', {
        storage: diskStorage({
        destination: '../images',
        filename: FilesHelper.customFileName,
        }),
    }),
    )
    async uploadPic(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
    @Req() req,
    ) {
    return this.i_service.saveProfPic(id, file.filename);
    }


  @Post('update_profile_pic')
    async updateProfilePic(@Body() createUserOto: UserEntity){
        const response = await this.i_service.updateProfilePic(createUserOto);
        return response;
    }

    // @Get("get_img/:filename/:filetype")
    // getFile(@Param('filename') filename: string, @Param('filetype') filetype: string, @Response({ passthrough: true }) res): StreamableFile {


    //     if(filetype == "esign"){
    //         const file = createReadStream(join(process.cwd(), '../esignatures/' + filename));
    //         res.set({
    //             'Content-Type': 'image/webp',
    //             'Content-Disposition': 'inline; filename=' + filename,
    //         });
    //         file.on('error', (err) => { console.error(err); });
    //         return new StreamableFile(file);
    //     }
    //     else{
    //         const file = createReadStream(join(process.cwd(), '../images/' + filename));
    //         res.set({
    //             'Content-Type': 'image/webp',
    //             'Content-Disposition': 'inline; filename=' + filename,
    //         });
    //         file.on('error', (err) => { console.error(err); });
    //         return new StreamableFile(file);
    //     }
        
        
    // }

@Get("get_img/:filename/:filetype")
getFile(@Param('filename') filename: string, @Param('filetype') filetype: string, @Response({ passthrough: true }) res): StreamableFile {
    let filePath: string;

    if (filetype === "esign") {
        filePath = join(process.cwd(), '../e_signatures/', filename);
    } else {
        filePath = join(process.cwd(), '../images/', filename);
    }

    const mimeType = lookup(filePath) || 'application/octet-stream'; // Default to a binary stream if MIME type is unknown
    const file = createReadStream(filePath);

    res.set({
        'Content-Type': mimeType,
        'Content-Disposition': 'inline; filename="' + filename + '"',
    });

    file.on('error', (err) => { console.error(err); });
    return new StreamableFile(file);
}


    @Post('edit')
    async editUser(@Body() createUserOto: UserEntity){
        const response = await this.i_service.editUser(createUserOto);
        return response;
    }

    @Post('edit_email')
    async editEmail(@Body() createUserOto: UserEntity){
        const response = await this.i_service.editEmail(createUserOto);
        return response;
    }

    @Post('edit_password')
    async editPassword(@Body() createUserOto: UserEntity){
        const response = await this.i_service.editPassword(createUserOto);
        return response;
    }

}
