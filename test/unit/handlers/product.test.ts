import ProductHandler from '../../../src/handlers/product.handler';
import { NotFoundException } from '@nestjs/common';
import { Tax } from '../../../src/models/entities/tax.entity';
import HelperFormat from '../../../dist/src/helpers/format.helper';
import { Product } from '../../../src/models/entities/product.entity';
import { QueryFilterRequest } from '../../../src/models/requests/product-controller/query-filter.request';

describe('product test suite', () => {
    let productHandler: ProductHandler;
    const taxServiceMock = {
        getTaxById: jest.fn()
    };
    const productServiceMock = {
        createProduct: jest.fn(),
        getProductsFilterByName: jest.fn(),
        getProductsFilterByDescription: jest.fn(),
        getProductsFilterByNameOrDescription: jest.fn(),
        getAllProducts: jest.fn()
    };
    const getResponseTest = {
        "products": [
            {
                "name": "test",
                "description": "test producto",
                "price": "0.00",
                "totalPrice": "0.00"
            },
            {
                "name": "test",
                "description": "test producto",
                "price": "0.00",
                "totalPrice": "0.00"
            }
        ],
        "page": 1,
        "total": 2
    };
    beforeEach(() => {
        productHandler = new ProductHandler(
            taxServiceMock as any,
            productServiceMock as any
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    test('product handler not found tax should throw NotFoundException', async () => {
        const request = {
            name: "Test",
            price: 200,
            taxId: 1,
            description: "test"
        };
        try {
            taxServiceMock.getTaxById.mockReturnValueOnce(undefined);
            await productHandler.createProduct(request);

        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error.message).toBe(`El tipo de impuesto ${request.taxId} no existe.`);
        }
    });

    test('product handler find tax should return the product id created', async () => {
        const request = {
            name: "Test",
            price: 200,
            taxId: 3,
            description: "test"
        };
        const taxEntityMock = {
            id: 3,
            name: "IVA 1%",
            value: 1
        } as Tax;

        const formatRequestToModel = jest.fn();
        formatRequestToModel.mockReturnValueOnce({
            name: "Test",
            price: 200,
            totalPrice: 202,
            taxId: 3
        } as Product);

        HelperFormat.response = formatRequestToModel;
        productServiceMock.createProduct.mockReturnValueOnce(1);
        taxServiceMock.getTaxById.mockReturnValueOnce(taxEntityMock);
        let response = await productHandler.createProduct(request);
        expect(response).not.toBeNaN();
    });

    test('product handler GET user filter by name should return especific structure', async () => {
        const queryParams = {
            name: 'test'
        } as QueryFilterRequest;

        productServiceMock.getProductsFilterByName.mockReturnValueOnce(getResponseTest);
        let response = await productHandler.getProducts(queryParams);

        expect(response.page).toBe(1);
        expect(response).toHaveProperty('total');
        expect(response).toHaveProperty('page');
        expect(response).toHaveProperty('products');

    });

    test('product handler GET user filter by description should return especific structure', async () => {
        const queryParams = {
            description: 'test'
        } as QueryFilterRequest;

        productServiceMock.getProductsFilterByDescription.mockReturnValueOnce(getResponseTest);
        let response = await productHandler.getProducts(queryParams);

        expect(response.page).toBe(1);
        expect(response).toHaveProperty('total');
        expect(response).toHaveProperty('page');
        expect(response).toHaveProperty('products');

    });

    test('product handler GET user filter by name & description should return especific structure', async () => {
        const queryParams = {
            description: 'test',
            name: 'test'
        } as QueryFilterRequest;

        productServiceMock.getProductsFilterByNameOrDescription.mockReturnValueOnce(getResponseTest);
        let response = await productHandler.getProducts(queryParams);

        expect(response.page).toBe(1);
        expect(response).toHaveProperty('total');
        expect(response).toHaveProperty('page');
        expect(response).toHaveProperty('products');

    });

    test('product handler GET user should return especific structure', async () => {
        const queryParams = {} as QueryFilterRequest;

        productServiceMock.getAllProducts.mockReturnValueOnce(getResponseTest);
        let response = await productHandler.getProducts(queryParams);

        expect(response.page).toBe(1);
        expect(response).toHaveProperty('total');
        expect(response).toHaveProperty('page');
        expect(response).toHaveProperty('products');
    });

    test('product handler GET total in response shold be equal to the lenght of products', async () => {
        const queryParams = {} as QueryFilterRequest;

        productServiceMock.getAllProducts.mockReturnValueOnce(getResponseTest);
        let response = await productHandler.getProducts(queryParams);

        expect(response.products.length).toEqual(response.total);
    });
})