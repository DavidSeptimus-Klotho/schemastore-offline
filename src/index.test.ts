import {describe, expect, it} from 'vitest';
import {detectSchema, getCatalog, getSchema} from './index';

describe('detectSchema', () => {
    it('should return the correct schema for a given file name with firstMatch option', () => {
        const schema = detectSchema('src/.prettierrc.json', { firstMatch: true, strict: false });
        expect(schema?.name).toBe('prettierrc.json');
    });

    it('should return all matching schemas for a given file name', () => {
        const schemas = detectSchema('src/def/something/policies/policy.yaml');
        expect(schemas).toHaveLength(2);
    });

    it('should return the best matching schema for a given file name with bestMatch option', () => {
        const bestSchema = detectSchema('src/def/something/policies/policy.yaml', { bestMatch: true });
        const allSchemas = detectSchema('src/def/something/policies/policy.yaml');
        expect(allSchemas.length).toBeGreaterThan(1);
        expect(bestSchema?.name).toBe('Aerleon Network & Service Definitions');
    });

    it('should return an empty array if no schema matches and strict is true', () => {
        const schemas = detectSchema('src/unknown/file.txt', { strict: true });
        expect(schemas).toHaveLength(0);
    });

    it('should return an empty array if no schema matches and strict is false', () => {
        const schemas = detectSchema('src/unknown/file.txt', { strict: false });
        expect(schemas).toHaveLength(0);
    });

    it('should return undefined if no schema matches and firstMatch is true', () => {
        const schema = detectSchema('src/unknown/file.txt', { firstMatch: true, strict: true });
        expect(schema).toBeUndefined();
    });

    it('should return the correct schema for 1Password SSH Agent Config', () => {
        const schema = detectSchema('src/1password/ssh/agent.toml', { firstMatch: true });
        expect(schema?.name).toBe('1Password SSH Agent Config');
    });

    it('should return the correct schema for Application Accelerator', () => {
        const schema = detectSchema('accelerator.yaml', { firstMatch: true });
        expect(schema?.name).toBe('Application Accelerator');
    });

    it('should return the correct schema for gRPC API Gateway & OpenAPI Config', () => {
        const schema = detectSchema('grpc_api_gateway.yaml', { firstMatch: true });
        expect(schema?.name).toBe('gRPC API Gateway & OpenAPI Config');
    });

    it('should return the correct schema for .NET Aspire 8.0 Manifest', () => {
        const schema = detectSchema('aspire-manifest.json', { firstMatch: true });
        expect(schema?.name).toBe('.NET Aspire 8.0 Manifest');
    });

    it('should return the correct schema for AnyWork Automation Configuration', () => {
        const schema = detectSchema('.awc.yaml', { firstMatch: true });
        expect(schema?.name).toBe('AnyWork Automation Configuration');
    });

    it('should return the correct schema for @factorial/drupal-breakpoints-css', () => {
        const schema = detectSchema('breakpoints.config.yml', { firstMatch: true });
        expect(schema?.name).toBe('@factorial/drupal-breakpoints-css');
    });

    it('should return the correct schema for AdonisJS configuration file', () => {
        const schema = detectSchema('.adonisrc.json', { firstMatch: true });
        expect(schema?.name).toBe('.adonisrc.json');
    });

    it('should return the correct schema for Aerleon configuration file', () => {
        const schema = detectSchema('aerleon.yml', { firstMatch: true });
        expect(schema?.name).toBe('aerleon.yml');
    });

    it('should return the correct schema for Aerleon Network & Service Definitions', () => {
        const schema = detectSchema('src/def/something.yaml', { firstMatch: true });
        expect(schema?.name).toBe('Aerleon Network & Service Definitions');
    });

    it('should return the correct schema for Aerleon Policy', () => {
        const schema = detectSchema('src/policies/something.yaml', { firstMatch: true });
        expect(schema?.name).toBe('Aerleon Policy');
    });

    it('should return the correct schema for Agrippa config file', () => {
        const schema = detectSchema('.agripparc.json', { firstMatch: true });
        expect(schema?.name).toBe('.agripparc.json');
    });

    it('should return the correct schema for Application Inspector project analysis settings', () => {
        const schema = detectSchema('.aiproj.json', { firstMatch: true });
        expect(schema?.name).toBe('.aiproj.json');
    });

    it('should return the correct schema for ABCInventoryModuleData', () => {
        const schema = detectSchema('abc-inventory-module-data-1.0.0.json', { firstMatch: true });
        expect(schema?.name).toBe('ABCInventoryModuleData');
    });

    it('should return the correct schema for ABCSupplyPlan', () => {
        const schema = detectSchema('abc-supply-plan-1.0.0.json', { firstMatch: true });
        expect(schema?.name).toBe('ABCSupplyPlan');
    });

    it('should return the correct schema for AIConfig', () => {
        const schema = detectSchema('aiconfig.json', { firstMatch: true });
        expect(schema?.name).toBe('AIConfig');
    });

    it('should return the correct schema for Airlock Microgateway', () => {
        const schema = detectSchema('microgateway-config.yaml', { firstMatch: true });
        expect(schema?.name).toBe('Airlock Microgateway');
    });
});

describe('getCatalog', () => {
    it('should return the catalog object', () => {
        const catalog = getCatalog();
        expect(catalog).toHaveProperty('$schema');
        expect(catalog).toHaveProperty('version');
        expect(catalog).toHaveProperty('schemas');
    });
});

describe('getSchema', () => {
    it('should return the correct schema for a given name', () => {
        const schema = getSchema('prettierrc.json');
        expect(schema).toBeDefined();
        expect(schema?.name).toBe('prettierrc.json');
    });

    it('should return undefined for a non-existent schema name', () => {
        const schema = getSchema('nonexistent.json');
        expect(schema).toBeUndefined();
    });
});