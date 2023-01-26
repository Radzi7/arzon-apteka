import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Apteka } from './apteka.model';
import { CreateAptekaDto } from './dto/create-apteka.dto';
import { UpdateAptekaDto } from './dto/update-apteka.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types/jwt-payload';
import { ActivateAptekaDto } from './dto/activate-apteka.dto';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AptekaService {
  constructor(
    @InjectModel(Apteka) private aptekaRepository: typeof Apteka,
    private readonly jwtService: JwtService,
  ) {}

  // async create(createAptekaDto: CreateAptekaDto) {
  //   const data = await this.aptekaRepository.create(createAptekaDto);
  //   return data;
  // }

  async singup(userDto: CreateAptekaDto) {
    const condidate = await this.findbyPhone(userDto.phone);
    if (condidate) {
      throw new HttpException('This user is exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.aptekaRepository.create(userDto);
    user.password = hashedPassword;
    const tokens = await this.generateToken(
      user.phone,
      user.id,
      user.is_active,
      user.role,
    );
    const refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    user.hashed_refresh_token = refresh_token;
    user.save();
    return tokens;
  }

  private async generateToken(
    phone: string,
    id: number,
    is_active: boolean,
    role: string,
  ) {
    const jwtPayload: JwtPayload = {
      sub: id,
      phone: phone,
      is_active: is_active,
      role: role,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }

  async findbyPhone(phone: string) {
    const data = await this.aptekaRepository.findOne({
      where: { phone: phone },
    });
    return data;
  }

  async findAll() {
    const data = await this.aptekaRepository.findAll({
      include: { all: true },
    });
    return data;
  }

  async activateApteka(activateAdminDto: ActivateAptekaDto) {
    const { phone } = activateAdminDto;
    const admin = await this.aptekaRepository.findOne({
      where: { phone: phone },
    });
    if (!admin) {
      throw new HttpException('Pharmacy is not exists', HttpStatus.NOT_FOUND);
    }
    if (admin.is_active === true) {
      throw new UnauthorizedException({
        message: 'Pharmacy is already active',
      });
    }
    admin.is_active = true;
    await admin.save();
    return admin;
  }

  async deActivateApteka(activateAdminDto: ActivateAptekaDto) {
    const { phone } = activateAdminDto;
    const admin = await this.aptekaRepository.findOne({
      where: { phone: phone },
    });
    if (!admin) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    if (admin.is_active === false) {
      throw new UnauthorizedException({
        message: 'Admin is already deactivated',
      });
    }
    admin.is_active = false;
    await admin.save();
    return admin;
  }

  async findOne(id: number) {
    const data = await this.aptekaRepository.findOne({ where: { id } });
    return data;
  }

  async update(id: number, data: UpdateAptekaDto) {
    const newApteka = await this.aptekaRepository.update(data, {
      where: { id },
    });
    if (!data) {
      throw new HttpException('Apteka is not exists', HttpStatus.NOT_FOUND);
    }
    return { message: 'Apteka is updated' };
  }

  async singin(loginDto: ActivateAptekaDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new HttpException('Admin is not exists', HttpStatus.NOT_FOUND);
    }
    return this.generateToken(user.phone, user.id, user.is_active,user.role);
  }

  async logout(userId: number) {
    const result = await this.aptekaRepository.update(
      { hashed_refresh_token: null },
      { where: { id: userId } },
    );
    if (!result) throw new ForbiddenException('Acces Denied');
    return true;
  }

  private async validateUser(adminDto: ActivateAptekaDto) {
    const user = await this.aptekaRepository.findOne({
      where: {
        phone: adminDto.phone,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect ');
    }
    const validPassword = await bcrypt.compare(
      adminDto.password,
      user.password,
    );
    if (user && validPassword) {
      return user;
    }
    throw new UnauthorizedException('Email or password is incorrect 2');
  }

  async remove(id: number) {
    const data = await this.aptekaRepository.destroy({ where: { id } });
    if (!data) {
      throw new HttpException('Apteka is not exists', HttpStatus.NOT_FOUND);
    }
    return { message: 'Apteka is deleted' };
  }
}
