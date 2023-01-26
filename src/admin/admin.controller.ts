import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Admin } from './admin.model';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { loginDto } from './dto/login.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @Post()
  // create(@Body() createAdminDto: CreateAdminDto) {
  //   return this.adminService.signup(createAdminDto);
  // }

  @ApiOperation({ summary: 'Register admin' })
  @ApiResponse({
    status: 201,
    description: 'Registration a new admin',
  })
  @Post('/signup')
  singup(@Body() CreateUserDto: CreateAdminDto) {
    return this.adminService.signup(CreateUserDto);
  }

  @ApiOperation({ summary: 'Signin the admin' })
  @ApiResponse({
    status: 201,
    description: 'Entering to site by using a new informations from signup',
  })
  @Post('/signin')
  signin(@Body() loginDto: loginDto) {
    return this.adminService.signin(loginDto);
  }

  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({
    status: 201,
    type: Admin,
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get admin by id' })
  @ApiResponse({
    status: 201,
    type: Admin,
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update admin properties by id' })
  @ApiResponse({
    status: 201,
    type: Admin,
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete admin by id' })
  @ApiResponse({
    status: 201,
    type: Admin,
  })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
