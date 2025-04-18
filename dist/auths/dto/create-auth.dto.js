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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePassword = exports.CodeAuthDto = exports.CreateAuthDto = void 0;
const class_validator_1 = require("class-validator");
class CreateAuthDto {
    email;
    passWord;
    userName;
    firstName;
    lastName;
    dateOfBirth;
    isActive;
    role;
    accountType;
}
exports.CreateAuthDto = CreateAuthDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'email không được để trống' }),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'password không được để trống' }),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "passWord", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "userName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], CreateAuthDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateAuthDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "accountType", void 0);
class CodeAuthDto {
    email;
    codeId;
}
exports.CodeAuthDto = CodeAuthDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'email không được để trống' }),
    __metadata("design:type", String)
], CodeAuthDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'code không được để trống' }),
    __metadata("design:type", String)
], CodeAuthDto.prototype, "codeId", void 0);
class ChangePassword {
    email;
    passWordOld;
    passWordNew;
    confirmPassword;
}
exports.ChangePassword = ChangePassword;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'email không được để trống' }),
    __metadata("design:type", String)
], ChangePassword.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'password cũ mới không được để trống' }),
    __metadata("design:type", String)
], ChangePassword.prototype, "passWordOld", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'password mới không được để trống' }),
    __metadata("design:type", String)
], ChangePassword.prototype, "passWordNew", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'confirmPassword không được để trống' }),
    __metadata("design:type", String)
], ChangePassword.prototype, "confirmPassword", void 0);
//# sourceMappingURL=create-auth.dto.js.map