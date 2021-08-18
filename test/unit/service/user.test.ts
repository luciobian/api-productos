import UserService from '../../../src/services/user.service';
import LoginRequest from '../../../src/models/requests/user-controller/user-login.request';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import RegisterResponse from '../../../src/models/responses/user-controller/register.response';
describe('user service suite', () => {
    const userDaoMock = {
        getUserByEmail: jest.fn(),
        createUser: jest.fn()
    };
    let userService: UserService;

    const responseDao = {
        id: 1,
        email: "test@test.com",
        token: "OgBLkXaiWXZEkwh5tyQfQZt+W4jp4qpuD5e7RYyGSmQ=",
        roleId: 1,
        enabled: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        password: "$2b$10$bUQY.qisaZXjXNHKX5lo7.c.dtInfZ7BZpWYJyRx5yYng8JiRTM2q" //secret123
    }

    beforeEach(() => {
        userService = new UserService(userDaoMock as any);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('GET /users/admin/token with valid credentials should return the user token', async () => {
        userDaoMock.getUserByEmail.mockReturnValueOnce(responseDao);
        const user = {
            email: "test@test.com",
            password: "secret123"
        } as LoginRequest;
        const response = await userService.getToken(user);
        expect(response.token).toBeDefined();
        expect(response.token).toBe(responseDao.token);
    });

    test('GET /users/admin/token with invalid credentials should return an exception', async () => {
        userDaoMock.getUserByEmail.mockReturnValueOnce(responseDao);
        const userInvalid = {
            email: "test@test.com",
            password: "invalidpassword"
        } as LoginRequest;
        
        try {
            await userService.getToken(userInvalid);
        } catch (error) {
            expect(error).toBeInstanceOf(UnauthorizedException);
            expect(error.message).toBe(`Email y/o contraseña inválido.`);
        }
    });

    test('POST /users/admin/register with valid data should return instance of RegisterResponse', async ()=>{
        userDaoMock.createUser.mockReturnValueOnce(responseDao);
        const registerRequest = {
            email: "test@test.com",
            password: "secret123"
        };

        let response = await userService.createUser(registerRequest);

        expect(response).toBeInstanceOf(RegisterResponse);
    });

    test('POST /users/admin/register with registered email should return exception', async ()=>{
        userDaoMock.getUserByEmail.mockReturnValueOnce(responseDao);
        const registerRequest = {
            email: "test@test.com",
            password: "secret123"
        };
        try {
            await userService.createUser(registerRequest);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error.message).toBe(`El email ${registerRequest.email} ya está en uso.`);
        }
    });
});