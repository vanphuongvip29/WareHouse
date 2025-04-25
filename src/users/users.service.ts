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
import { comparePasswordUtil, hashPasswordUtil } from 'src/utils/bcrypt';
import {
  ChangePassword,
  CodeAuthDto,
  CreateAuthDto,
} from 'src/auths/dto/create-auth.dto';
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
    const { userName, email, password, firstName, lastName } = createUserDto;

    //check email
    const isExist = await this.checkEmailExists(email);
    if (isExist) {
      throw new BadRequestException(`Email đã tồn tại: ${email}`);
    }

    // hash password
    const hashPass = await hashPasswordUtil(password);
    const user = await this.usersRepository.create({
      userName,
      email,
      password: hashPass,
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
    const { password, firstName, lastName } = updateUserDto;
    // Toán tử spread (...) được sử dụng để sao chép tất cả các thuộc tính của user và updateUserDto vào một đối tượng mới.
    // Nếu có các thuộc tính trùng tên, các thuộc tính từ updateUserDto sẽ ghi đè các thuộc tính từ user.
    const hashPass = await hashPasswordUtil(password);
    const userUpdate = await this.usersRepository.create({
      ...user,
      password: hashPass,
      firstName,
      lastName,
    });
    return this.usersRepository.save(userUpdate);
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
    const { userName, email, password, firstName, lastName } = registerDto;

    //check email
    const isExist = await this.checkEmailExists(email);
    if (isExist) {
      throw new BadRequestException(`Email đã tồn tại: ${email}`);
    }

    // hash password
    const hashPass = await hashPasswordUtil(password);

    const codeId = uuidv4();

    const user = await this.usersRepository.save({
      userName,
      email,
      password: hashPass,
      firstName,
      lastName,
      isActive: false,
      codeId: codeId,
      // codeExpired: dayjs().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
      codeExpired: dayjs().add(60, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
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

  // active account
  async handleActive(codeAuthDto: CodeAuthDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email: codeAuthDto.email,
        codeId: codeAuthDto.codeId,
      },
    });
    if (!user) {
      throw new BadRequestException('Thông tin User không tìm thấy');
    }

    // check codeExpired code
    const isBeforeCheck = dayjs().isBefore(user.codeExpired);

    if (isBeforeCheck) {
      //valid => update user
      await this.usersRepository.save({ ...user, isActive: true });
      return { isBeforeCheck };
    } else {
      throw new BadRequestException('Mã code không hợp lệ hoặc đã hết hạn');
    }
  }

  async retryCodeId(email: string) {
    //check email
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại');
    }
    if (user.isActive) {
      throw new BadRequestException('Tài khoản đã được kích hoạt');
    }

    //send Email
    const codeId = uuidv4();

    //update user
    await this.usersRepository.save({
      ...user,
      codeId: codeId,
      codeExpired: dayjs().add(60, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
    });

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
    return { email: user.email };
  }

  changePasswordUser = async (changePassword: ChangePassword) => {
    const user = await this.usersRepository.findOne({
      where: { email: changePassword.email },
    });

    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại');
    }

    const isValidPassword = await comparePasswordUtil(
      changePassword.passWordOld,
      user.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Mật khẩu cũ không đúng');
    }

    if (changePassword.confirmPassword !== changePassword.passWordNew) {
      throw new BadRequestException(
        'Mật khẩu/xác nhận mật khẩu không chính xác.',
      );
    }
    const newPassword = await hashPasswordUtil(changePassword.passWordNew);
    await this.usersRepository.save({ ...user, passWord: newPassword });

    return 'Thay đổi mật khẩu thành công !!!';
  };

  forgetPassword = async (email: string) => {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại');
    }

    //send email
    const codeId = uuidv4();

    this.mailerService.sendMail({
      to: user.email, // list of receivers
      // from: 'noreply@nestjs.com', // sender address
      subject: 'Forgot password your account at @VP✔', // Subject line
      template: 'register',
      context: {
        name: user?.userName ?? user.email,
        activationCode: codeId,
      },
    });

    //update user
    await this.usersRepository.save({
      ...user,
      codeId: codeId,
      codeExpired: dayjs().add(60, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
    });

    return { email: user.email };
  };
}
