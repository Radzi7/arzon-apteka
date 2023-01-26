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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtUserGuard } from 'src/common/guards/user.guard';
import { Roles } from 'src/common/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './users.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.signup(createUserDto);
  // }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 201,
    type: Users,
  })
  @Roles('USER', 'ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 201,
    type: Users,
  })
  @Roles('USER', 'ADMIN')
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 201,
    description: 'Update user by id by user and admin',
  })
  @Roles('USER', 'ADMIN')
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 201,
    description: 'Delete user by id by user and admin',
  })
  @Roles('USER', 'ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: 201,
    description: 'Registration a new user',
  })
  @Post('/signup')
  singup(@Body() CreateUserDto: CreateUserDto) {
    return this.usersService.signup(CreateUserDto);
  }

  @ApiOperation({ summary: 'Signin the user' })
  @ApiResponse({
    status: 201,
    description: 'Entering to site by using a new informations from signup',
  })
  @Post('/signin')
  signin(@Body() loginDto: CreateUserDto) {
    return this.usersService.singin(loginDto);
  }

  @ApiOperation({ summary: 'Log uot' })
  @ApiResponse({
    status: 201,
    description: 'Log uot from site',
  })
  @UseGuards(JwtUserGuard)
  @Post('/logout/:id')
  logout(@Param('id') id: number) {
    return this.usersService.logout(id);
  }
}
