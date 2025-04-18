"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthsModule = void 0;
const common_1 = require("@nestjs/common");
const auths_service_1 = require("./auths.service");
const auths_controller_1 = require("./auths.controller");
const users_module_1 = require("../users/users.module");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const local_strategy_1 = require("./passport/local.strategy");
const jwt_strategy_1 = require("./passport/jwt.strategy");
let AuthsModule = class AuthsModule {
};
exports.AuthsModule = AuthsModule;
exports.AuthsModule = AuthsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            jwt_1.JwtModule.register({
                global: true,
                secret: 'jwtConstants.secret',
                signOptions: { expiresIn: '60h' },
            }),
            passport_1.PassportModule,
        ],
        controllers: [auths_controller_1.AuthsController],
        providers: [auths_service_1.AuthsService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
    })
], AuthsModule);
//# sourceMappingURL=auths.module.js.map