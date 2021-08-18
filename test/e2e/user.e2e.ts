import { getConnection, Repository } from "typeorm";
import { Role } from '../../src/models/entities/role.entity';
import { User } from '../../src/models/entities/user.entity';
import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { UserModule } from '../../src/modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

describe('user integration test suite', () => {
    let app: INestApplication;
    let userRepository: Repository<User>;
    let roleRepository: Repository<Role>;
    const adminRole = {
        id: 1,
        name: "admin",
        description: "administrador de la plataforma"
    }

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [UserModule,
                TypeOrmModule.forRoot({
                    type: "sqlite",
                    database: ":memory:",
                    dropSchema: true,
                    entities: [User, Role],
                    synchronize: true,
                    logging: false
                }),
            ]
        }).compile();
        app = moduleRef.createNestApplication();
        await app.init();

        roleRepository = moduleRef.get('RoleRepository');
        userRepository = moduleRef.get('UserRepository');
    });

    afterEach(async () => {
        let conn = getConnection();
        await userRepository.query(`DELETE FROM user;`);
        await roleRepository.query(`DELETE FROM role;`);
        return conn.close();
    });

    test('POST /users/admin/register should register a user in db', async ()=>{
        await roleRepository.insert(adminRole);

        const requestRegister = {
            email: 'test@test.com',
            password: '123secret',
        }

        await request(app.getHttpServer()).post('/users/admin/register')
            .send(requestRegister)
        expect(201);
        const response: User[] = await userRepository.find();

        expect(response.length).toBe(1);
        expect(response[0].email).toBe(requestRegister.email);
    });

    test('POST /users/admin/register with an existence email should not register a user in db', async ()=>{
        await roleRepository.insert(adminRole);
        userRepository.insert({
            email: 'test@test.com',
            password: '123aserc',
            roleId: 1,
            token: 'TEST-TOKEN'
        });

        const requestRegister = {
            email: 'test@test.com',
            password: '123secret',
        }

        await request(app.getHttpServer()).post('/users/admin/register')
            .send(requestRegister)
        expect(400);
        const response: User[] = await userRepository.find();

        expect(response.length).toBe(1);
    });
});