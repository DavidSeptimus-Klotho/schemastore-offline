import {describe, it, expect} from 'vitest';
import {detectSchema} from './index';

describe('detectSchema', () => {
    it('should return the correct schema for a given file name', () => {
        const schema = detectSchema('src/.prettierrc.json', {firstMatch: true, strict: false});
        expect(schema?.name).toBe('prettierrc.json');
    });

    it('should return all matching schemas for a given file name', () => {
        const schemas = detectSchema('src/def/something/policies/policy.yaml');
        expect(schemas).toHaveLength(2);
    });
});

