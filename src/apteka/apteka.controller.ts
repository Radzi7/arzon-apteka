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
import { JwtAptekaGuard } from 'src/common/guards/apteka.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Apteka } from './apteka.model';
import { AptekaService } from './apteka.service';
import { ActivateAptekaDto } from './dto/activate-apteka.dto';
import { CreateAptekaDto } from './dto/create-apteka.dto';
import { UpdateAptekaDto } from './dto/update-apteka.dto';

@ApiTags('Aptekalar')
@Controller('apteka')
export class AptekaController {
  constructor(private readonly aptekaService: AptekaService) {}

  @ApiOperation({ summary: 'Get all pharmacys' })
  @ApiResponse({
    status: 201,
    type: Apteka,
  })
  @Roles('APTEKA', 'ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.aptekaService.findAll();
  }

  @ApiOperation({ summary: 'Get pharmacy by id' })
  @ApiResponse({
    status: 201,
    type: Apteka,
  })
  @Roles('APTEKA', 'ADMIN')
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aptekaService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update the pharmacy by id' })
  @ApiResponse({
    status: 201,
    type: Apteka,
  })
  @Roles('APTEKA', 'ADMIN')
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAptekaDto: UpdateAptekaDto) {
    return this.aptekaService.update(+id, updateAptekaDto);
  }

  @ApiOperation({ summary: 'Delete the pharmacy by id' })
  @ApiResponse({
    status: 201,
    type: Apteka,
  })
  @Roles('APTEKA', 'ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aptekaService.remove(+id);
  }

  @ApiOperation({ summary: 'Pharmacy register' })
  @ApiResponse({
    status: 201,
    description: 'Registration a new pharmacy',
  })
  @Post('/signup')
  singup(@Body() CreateUserDto: CreateAptekaDto) {
    return this.aptekaService.singup(CreateUserDto);
  }

  @ApiOperation({ summary: 'Signin the pharmacy' })
  @ApiResponse({
    status: 201,
    description: 'Entering to site by using a new informations from signup',
  })
  @Post('/signin')
  signin(@Body() loginDto: ActivateAptekaDto) {
    return this.aptekaService.singin(loginDto);
  }

  @ApiOperation({ summary: 'Activation the pharmacy' })
  @ApiResponse({
    status: 201,
    description: 'Activation the pharmacy by phone number',
  })
  @Roles('APTEKA', 'ADMIN')
  @UseGuards(RolesGuard)
  @Post('/activate')
  activateUser(@Body() activateAptekaDto: ActivateAptekaDto) {
    return this.aptekaService.activateApteka(activateAptekaDto);
  }

  @ApiOperation({ summary: 'Deactivation the pharmacy' })
  @ApiResponse({
    status: 201,
    description: 'Deactivation the pharmacy by phone number',
  })
  @Roles('APTEKA', 'ADMIN')
  @UseGuards(RolesGuard)
  @Post('/deactivate')
  deActivateUser(@Body() activateUserDto: ActivateAptekaDto) {
    return this.aptekaService.deActivateApteka(activateUserDto);
  }

  @ApiOperation({ summary: 'Log uot' })
  @ApiResponse({
    status: 201,
    description: 'Log uot from site',
  })
  @UseGuards(JwtAptekaGuard)
  @Post('/logout/:id')
  logout(@Param('id') id: number) {
    return this.aptekaService.logout(id);
  }
}
