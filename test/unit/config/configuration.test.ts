import { envFilePathConfiguration } from '../../../src/config/env.config';

describe('Configurations test suite', () => {
    test('environment file name when NODE_ENV is local return .env.local', () => {
        process.env.NODE_ENV = 'local';
        const result = envFilePathConfiguration();
        expect(result).toEqual('.env.local');
    });

    test('environment file name when NODE_ENV is not local return .env.local', () => {
        process.env.NODE_ENV = 'not-local';
        const result = envFilePathConfiguration();
        expect(result).toEqual('.env');
    });
});