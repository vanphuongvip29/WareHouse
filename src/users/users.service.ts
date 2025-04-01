import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dto/respone-user.dto';
import { hashPasswordUtil } from 'src/utils/bcrypt';
import { CreateAuthDto } from 'src/auths/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly mailerService: MailerService,
  ) {}

  // trả về true nếu email đã tồn tại và false ngược lại.
  async checkEmailExists(email: string): Promise<boolean> {
    return this.usersRepository.exists({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { userName, email, passWord, firstName, lastName } = createUserDto;

    //check email
    const isExist = await this.checkEmailExists(email);
    if (isExist) {
      throw new BadRequestException(`Email đã tồn tại: ${email}`);
    }

    // hash password
    const hashPass = await hashPasswordUtil(passWord);
    const user = await this.usersRepository.create({
      userName,
      email,
      passWord: hashPass,
      firstName,
      lastName,
    });

    const savedUser = await this.usersRepository.save(user);

    // Tạo đối tượng UserResponseDto với các trường mong muốn
    const userResponse = new UserResponseDto();
    userResponse.id = savedUser.id;
    userResponse.userName = savedUser.userName;
    userResponse.email = savedUser.email;

    return userResponse;
  }

  async findAll() {
    const user = await this.usersRepository.find();
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(` User with ID ${id} not found`);
    }
    // Toán tử spread (...) được sử dụng để sao chép tất cả các thuộc tính của user và updateUserDto vào một đối tượng mới.
    // Nếu có các thuộc tính trùng tên, các thuộc tính từ updateUserDto sẽ ghi đè các thuộc tính từ user.
    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async removeUser(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(` User with ID ${id} not found`);
    }
    const result = await this.usersRepository.remove(user);
    return { status: HttpStatus.NOT_FOUND, 'đã xóa thành công': result };
  }

  async registerUser(registerDto: CreateAuthDto) {
    const { userName, email, passWord, firstName, lastName } = registerDto;

    //check email
    const isExist = await this.checkEmailExists(email);
    if (isExist) {
      throw new BadRequestException(`Email đã tồn tại: ${email}`);
    }

    // hash password
    const hashPass = await hashPasswordUtil(passWord);

    const codeId = uuidv4();

    const user = await this.usersRepository.save({
      userName,
      email,
      passWord: hashPass,
      firstName,
      lastName,
      isActive: false,
      codeId: codeId,
      // codeExpired: dayjs().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
      codeExpired: dayjs().add(30, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
    });

    // send email
    this.mailerService.sendMail({
      to: user.email, // list of receivers
      // from: 'noreply@nestjs.com', // sender address
      subject: 'Acctive your account at @VP✔', // Subject line
      template: 'register',
      context: {
        name: user?.userName ?? user.email,
        activationCode: codeId,
      },
    });

    // Tạo đối tượng UserResponseDto với các trường mong muốn
    const userResponse = new UserResponseDto();
    userResponse.id = user.id;
    userResponse.userName = user.userName;
    userResponse.email = user.email;

    return userResponse;
  }
}
