import { ProductResponse } from '../../../src/models/responses/product-controller/product.response';
import HelperConverter from '../../../src/helpers/converter.helper';
import { Product } from '../../../src/models/entities/product.entity';
describe('Helper Converter test suite', () => {
    test('productEntityToResponse recive valid parameters should return ProductResponse instance', () => {
        const product = [{
            id: 1,
            name: 'test',
            description: 'test',
            price: 100,
            totalPrice: 121,
            taxId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            enabled: true,
            deletedAt: null,
            tax: null
        }, {
            id: 2,
            name: 'test',
            description: 'test',
            price: 100,
            totalPrice: 121,
            taxId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
            enabled: true,
            deletedAt: null,
            tax: null
        }] as Array<Product>;

        let response = HelperConverter.productEntityToResponse(product, 1);
        expect(response instanceof ProductResponse).toBe(true);
    });
});