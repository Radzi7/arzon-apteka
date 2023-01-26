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
import { DoriService } from './dori.service';
import { CreateDoriDto } from './dto/create-dori.dto';
import { UpdateDoriDto } from './dto/update-dori.dto';

@ApiTags('Dori')
@Controller('dori')
export class DoriController {
  constructor(private readonly doriService: DoriService) {}

  @ApiOperation({ summary: 'Adding a new medicine' })
  @ApiResponse({
    status: 201,
    description: 'Adding a new medicine by pharmacy',
  })
  @Roles('APTEKA')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAptekaGuard)
  @Post()
  create(@Body() createDoriDto: CreateDoriDto) {
    return this.doriService.create(createDoriDto);
  }

  @ApiOperation({ summary: 'Get all drugs' })
  @ApiResponse({
    status: 201,
    description: 'Get all drugs from all pharmacys',
  })
  @Get()
  findAll() {
    return this.doriService.findAll();
  }

  @ApiOperation({ summary: 'Get drug by id' })
  @ApiResponse({
    status: 201,
    description: 'Get drug by id from all pharmacys',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doriService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update information about drug by id' })
  @ApiResponse({
    status: 201,
    description: 'Update information about drug by ID from pharmacy',
  })
  @Roles('APTEKA')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAptekaGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoriDto: UpdateDoriDto) {
    return this.doriService.update(+id, updateDoriDto);
  }

  @ApiOperation({ summary: 'Delete drug by ID' })
  @ApiResponse({
    status: 201,
    description: 'Delete drug by ID from pharmacy',
  })
  @Roles('APTEKA', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAptekaGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doriService.remove(+id);
  }
}
