"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthsController = void 0;
const common_1 = require("@nestjs/common");
const auths_service_1 = require("./auths.service");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const local_auth_guard_1 = require("./passport/local-auth.guard");
const customize_1 = require("../decorator/customize");
const mailer_1 = require("@nestjs-modules/mailer");
let AuthsController = class AuthsController {
    authsService;
    mailerService;
    constructor(authsService, mailerService) {
        this.authsService = authsService;
        this.mailerService = mailerService;
    }
    login(req) {
        return this.authsService.login(req.user);
    }
    register(registerDto) {
        return this.authsService.register(registerDto);
    }
    checkCode(codeAuthDto) {
        return this.authsService.checkCode(codeAuthDto);
    }
    retryCodeId(email) {
        return this.authsService.retryCodeId(email);
    }
    changePassword(changePassword) {
        return this.authsService.changePassword(changePassword);
    }
    forgotPassword(email) {
        return this.authsService.forgotPassword(email);
    }
    sendEmail() {
        this.mailerService.sendMail({
            to: 'vanphuongvip29@gmail.com',
            subject: 'Testing Nest MailerModule ✔',
            text: 'welcome',
            template: 'register',
            context: {
                name: 'VP',
                activationCode: 123456789,
            },
        });
        return 'OKi';
    }
};
exports.AuthsController = AuthsController;
__decorate([
    (0, common_1.Post)('login'),
    (0, customize_1.Public)(),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthsController.prototype, "login", null);
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", void 0)
], AuthsController.prototype, "register", null);
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Post)('check-code'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CodeAuthDto]),
    __metadata("design:returntype", void 0)
], AuthsController.prototype, "checkCode", null);
__decorate([
    (0, common_1.Post)('retry-code'),
    (0, customize_1.Public)(),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthsController.prototype, "retryCodeId", null);
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Patch)('change-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.ChangePassword]),
    __metadata("design:returntype", void 0)
], AuthsController.prototype, "changePassword", null);
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Patch)('forgot-password'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthsController.prototype, "forgotPassword", null);
__decorate([
    (0, customize_1.Public)(),
    (0, common_1.Get)('email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthsController.prototype, "sendEmail", null);
exports.AuthsController = AuthsController = __decorate([
    (0, common_1.Controller)('auths'),
    __metadata("design:paramtypes", [auths_service_1.AuthsService,
        mailer_1.MailerService])
], AuthsController);
//# sourceMappingURL=auths.controller.js.map