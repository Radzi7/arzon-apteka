import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './users.model';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types/jwt-payload';
import { UserJwtPayload } from 'src/types/user-jwt-payload';
import { loginUserDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private userRepository: typeof Users,
    private readonly jwtService: JwtService,
  ) {}

  // async create(createUserDto: CreateUserDto) {
  //   const data = await this.userRepository.create(createUserDto);
  //   return data;
  // }

  async signup(userDto: CreateUserDto) {
    const condidate = await this.userRepository.findOne({
      where: { user_phone: userDto.user_phone },
    });
    if (condidate) {
      throw new HttpException('This user is exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.userRepository.create(userDto);
    user.password = hashedPassword;
    const tokens = await this.generateToken(
      user.user_phone,
      user.id,
      user.is_admin,
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
    is_admin: boolean,
    role: string,
  ) {
    const jwtPayload: UserJwtPayload = {
      sub: id,
      phone: phone,
      is_admin: is_admin,
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

  async singin(loginDto: loginUserDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new HttpException('Admin is not exists', HttpStatus.NOT_FOUND);
    }
    return this.generateToken(user.user_phone, user.id, user.is_admin, user.role);
  }

  async logout(userId: number) {
    const result = await this.userRepository.update(
      { hashed_refresh_token: null },
      { where: { id: userId } },
    );
    if (!result) throw new ForbiddenException('Acces Denied');
    return true;
  }

  private async validateUser(adminDto: loginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        user_phone: adminDto.user_phone,
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

  async findAll() {
    const data = await this.userRepository.findAll({
      include: { all: true },
    });
    return data;
  }

  async findOne(id: number) {
    const data = await this.userRepository.findOne({ where: { id } });
    return data;
  }

  async update(id: number, data: UpdateUserDto) {
    const newUser = await this.userRepository.update(data, {
      where: { id },
    });
    if (!data) {
      throw new HttpException('User is not exists', HttpStatus.NOT_FOUND);
    }
    return { message: 'User is updated' };
  }

  async remove(id: number) {
    const data = await this.userRepository.destroy({ where: { id } });
    if (!data) {
      throw new HttpException('User is not exists', HttpStatus.NOT_FOUND);
    }
    return { message: 'User is deleted' };
  }
}
