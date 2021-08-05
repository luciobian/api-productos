import ProductService from '../../../dist/src/services/product.service';
import { Product } from '../../../src/models/entities/product.entity';
describe('product service suite', () => {
    const productDaoMock = {
        createProduct: jest.fn()
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
});