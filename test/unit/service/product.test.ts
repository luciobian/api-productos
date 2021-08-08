import ProductService from '../../../dist/src/services/product.service';
import { Product } from '../../../src/models/entities/product.entity';
import { QueryFilterRequest } from '../../../src/models/requests/product-controller/query-filter.request';
describe('product service suite', () => {
    const productDaoMock = {
        createProduct: jest.fn(),
        getAllProducts: jest.fn(),
        getProductsFilterByName: jest.fn(),
        getProductsFilterByDescription: jest.fn(),
        getProductsFilterByNameOrDescription: jest.fn()
    };
    let productService: ProductService;

    beforeEach(() => {
        productService = new ProductService(productDaoMock as any);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('if save a product should return the id of the product created', async () => {
        productDaoMock.createProduct.mockReturnValueOnce({
            name: 'test',
            price: 7000.66,
            totalPrice: 8470.7986,
            description: 'test producto',
            taxId: 1,
            updatedAt: '2021-08-06T00:21:56.841Z',
            deletedAt: null,
            id: 1,
            enabled: true,
            createdAt: '2021-08-06T00:21:56.841Z'
        });
        const product = {
            name: "Test",
            price: 200,
            totalPrice: 202,
            taxId: 3
        } as Product;
        const response = await productService.createProduct(product);
        expect(response).not.toBeNaN();
        expect(response).toBe(1);
    })

    test('if product.dao.getAllProducts return empty array should return empty array of products', async () => {
        productDaoMock.getAllProducts.mockReturnValueOnce([]);
        const response = await productService.getAllProducts(1);
        expect(response.products.length).toBe(0);
    });

    test('if product.dao.getByNameProducts return empty array should return empty array of products', async () => {
        productDaoMock.getProductsFilterByName.mockReturnValueOnce([]);
        const filter = {
            name: 'test'
        } as QueryFilterRequest;
        const response = await productService.getProductsFilterByName(filter);
        expect(response.products.length).toBe(0);
    });

    test('if product.dao.getAllProducts return empty array  should return empty array of products', async () => {
        productDaoMock.getProductsFilterByDescription.mockReturnValueOnce([]);
        const filter = {
            description: 'test'
        } as QueryFilterRequest;
        const response = await productService.getProductsFilterByDescription(filter);
        expect(response.products.length).toBe(0);
    });

    test('if product.dao.getAllProducts return empty array should return empty array of products', async () => {
        productDaoMock.getProductsFilterByNameOrDescription.mockReturnValueOnce([]);
        const filter = {
            description: 'test',
            name: 'test'
        } as QueryFilterRequest;
        const response = await productService.getProductsFilterByNameOrDescription(filter);
        expect(response.products.length).toBe(0);
    });
});