import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './admin.model';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'src/types/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private adminRepository: typeof Admin,
    private readonly jwtService: JwtService,
  ) {}

  // async create(createDoriDto: CreateAdminDto) {
  //   const newAdmin = await this.adminRepository.create(createDoriDto);
  //   return newAdmin;
  // }

  async signup(adminDto: CreateAdminDto) {
    const condidate = await this.adminRepository.findOne({
      where: { email: adminDto.email },
    });
    if (condidate) {
      throw new HttpException('This user is exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(adminDto.password, 7);
    const user = await this.adminRepository.create(adminDto);
    user.password = hashedPassword;
    const tokens = await this.generateToken(
      user.email,
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

  // async activateApteka(activateAdminDto: ActivateAdminDto) {
  //   const { email } = activateAdminDto;
  //   const admin = await this.adminRepository.findOne({
  //     where: { email: email },
  //   });
  //   if (!admin) {
  //     throw new HttpException('Pharmacy is not exists', HttpStatus.NOT_FOUND);
  //   }
  //   if (admin.is_active === true) {
  //     throw new UnauthorizedException({
  //       message: 'Pharmacy is already active',
  //     });
  //   }
  //   admin.is_active = true;
  //   await admin.save();
  //   return admin;
  // }

  // async deActivateApteka(activateAdminDto: ActivateAptekaDto) {
  //   const { phone } = activateAdminDto;
  //   const admin = await this.aptekaRepository.findOne({
  //     where: { phone: phone },
  //   });
  //   if (!admin) {
  //     throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
  //   }
  //   if (admin.is_active === false) {
  //     throw new UnauthorizedException({
  //       message: 'Admin is already deactivated',
  //     });
  //   }
  //   admin.is_active = false;
  //   await admin.save();
  //   return admin;
  // }

  async signin(loginDto: loginDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new HttpException('Admin is not exists', HttpStatus.NOT_FOUND);
    }
    return this.generateToken(user.email, user.id, user.is_active,user.role);
  }

  private async validateUser(adminDto: loginDto) {
    const user = await this.adminRepository.findOne({
      where: {
        email: adminDto.email,
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

  async logout(userId: number) {
    const result = await this.adminRepository.update(
      { hashed_refresh_token: null },
      { where: { id: userId } },
    );
    if (!result) throw new ForbiddenException('Acces Denied');
    return true;
  }

  async findAll() {
    const data = await this.adminRepository.findAll({
      include: { all: true },
    });
    return data;
  }

  async findOne(id: number) {
    const data = await this.adminRepository.findOne({ where: { id } });
    return data;
  }

  async update(id: number, data: UpdateAdminDto) {
    const newAdmin = await this.adminRepository.update(data, {
      where: { id },
    });
    if (!data) {
      throw new HttpException('Dori is not exists', HttpStatus.NOT_FOUND);
    }
    return { message: 'Dori is updated' };
  }

  async remove(id: number) {
    const data = await this.adminRepository.destroy({ where: { id } });
    if (!data) {
      throw new HttpException('Admin is not exists', HttpStatus.NOT_FOUND);
    }
    return { message: 'Admin is deleted' };
  }
}
