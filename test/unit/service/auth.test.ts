import { UnauthorizedException } from '@nestjs/common';
import AuthAdminService from '../../../src/services/auth.service';
describe('auth service suite', () => {
    const userDaoMock = {
        getUserByToken: jest.fn()
    };
    let authService: AuthAdminService;

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
        authService = new AuthAdminService(userDaoMock as any);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('if user dao return undefined should return exception', async () => {
        userDaoMock.getUserByToken.mockReturnValueOnce(undefined);

        try {
            await authService.validateAdminToken('invalidtoken');
        } catch (error) {
            expect(error).toBeInstanceOf(UnauthorizedException)
        }
    });

    test('if token does not have Bearer should return exception', async () => {
        userDaoMock.getUserByToken.mockReturnValueOnce(responseDao);
        try {
            await authService.validateAdminToken("$2b$10$bUQY.qisaZXjXNHKX5lo7.c.dtInfZ7BZpWYJyRx5yYng8JiRTM2q");
        } catch (error) {
            expect(error).toBeInstanceOf(UnauthorizedException)
        }
    });
});