import { getConnection, Repository } from "typeorm";
import { Product } from '../../src/models/entities/product.entity';
import * as request from "supertest";
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ProductModule } from '../../src/modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tax } from '../../src/models/entities/tax.entity';
import EnumHttpStatusCode from '../../src/enums/http-status-code.enum';
import { User } from '../../src/models/entities/user.entity';
import { AuthModule } from "../../src/modules/auth/auth.module";
import { Role } from "../../src/models/entities/role.entity";

describe('Product integration test suite', () => {
    let app: INestApplication;
    let productRepository: Repository<Product>;
    let taxRepository: Repository<Tax>;
    let userRepository: Repository<User>;
    let roleRepository: Repository<Role>;


    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [ProductModule, AuthModule,
                TypeOrmModule.forRoot({
                    type: "sqlite",
                    database: ":memory:",
                    dropSchema: true,
                    entities: [Product, Tax, Role, User],
                    synchronize: true,
                    logging: false
                }),
            ]
        }).compile();
        app = moduleRef.createNestApplication();
        await app.init();

        taxRepository = moduleRef.get('TaxRepository');
        productRepository = moduleRef.get('ProductRepository');
        userRepository = moduleRef.get('UserRepository');
        roleRepository = moduleRef.get('RoleRepository');

        await roleRepository.insert({
            id: 1,
            name: "admin",
            description: "administrador de la plataforma"
        });

        await userRepository.insert({
            id: 1,
            email: "test@test.com",
            token: "OgBLkXaiWXZEkwh5tyQfQZt+W4jp4qpuD5e7RYyGSmQ=",
            roleId: 1,
            password: "secret123" //secret123
        });


    });

    afterEach(async () => {
        let conn = getConnection();
        await productRepository.query(`DELETE FROM product;`);
        await taxRepository.query(`DELETE FROM tax;`);
        await userRepository.query(`DELETE FROM user;`);
        await roleRepository.query(`DELETE FROM role;`);
        return conn.close();
    });

    test('POST /products with valid request should register in database', async () => {
        await taxRepository.insert({
            id: 1,
            name: "IVA 21%",
            value: 21
        });

        const requestProduct = {
            "name": "test",
            "price": 100,
            "taxId": 1,
            "description": "test producto"
        };

        await request(app.getHttpServer()).post('/products')
            .set('Authorization', 'Bearer OgBLkXaiWXZEkwh5tyQfQZt+W4jp4qpuD5e7RYyGSmQ=')
            .send(requestProduct)
        expect(201);

        const response: Product[] = await productRepository.find();

        expect(response.length).toBe(1);
        expect(response[0].totalPrice).toBe(121);
        expect(response[0].name).toBe('test');
        expect(response[0].price).toBe(100);
        expect(response[0].description).toBe('test producto');

    });

    test('POST /product with not existence tax should return 404 and not create product', async () => {
        const requestProduct = {
            "name": "test",
            "price": 100,
            "taxId": 1,
            "description": "test producto"
        };

        await request(app.getHttpServer())
            .post('/products')
            .set('Authorization', 'Bearer OgBLkXaiWXZEkwh5tyQfQZt+W4jp4qpuD5e7RYyGSmQ=')
            .send(requestProduct)
            .expect(EnumHttpStatusCode.NOT_FOUND)
            .expect('{"statusCode":404,"message":"El tipo de impuesto 1 no existe.","error":"Not Found"}');
            
        let response = await productRepository.find();
        expect(response).toStrictEqual([]);
    });
});