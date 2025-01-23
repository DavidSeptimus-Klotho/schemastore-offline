import {minimatch} from 'minimatch'
import catalog from './catalog.json';


export interface Schema {
    name: string;
    description: string;
    fileMatch?: string[];
    url: string;
}

export interface Catalog {
    $schema: string;
    version: number;
    schemas: Schema[];
}

export function getCatalog(): Catalog {
    return catalog;
}

export function getSchema(name: string): Schema | undefined {
    return catalog.schemas.find((schema: Schema) => schema.name === name);
}

type DetectSchemaOptionsBase = {
    nocase?: boolean;
    dot?: boolean;
    strict?: boolean;
};

type DetectSchemaOptionsFirstMatch = DetectSchemaOptionsBase & {
    firstMatch?: true;
    bestMatch?: false;
}

type DetectSchemaOptionsAllMatches = DetectSchemaOptionsBase & {
    firstMatch?: false;
    bestMatch?: false;
}

type DetectSchemaOptionsBestMatch = DetectSchemaOptionsBase & {
    firstMatch?: false;
    bestMatch: true;
}

export type DetectSchemaOptions =
    DetectSchemaOptionsFirstMatch
    | DetectSchemaOptionsAllMatches
    | DetectSchemaOptionsBestMatch;


const defaultDetectOptions: DetectSchemaOptions = {
    firstMatch: false,
    bestMatch: false,
    nocase: true,
    dot: true,
    strict: true,
} as const;

export function detectSchema(fileName: string, options?: Omit<DetectSchemaOptions, 'firstMatch'>): Schema[];
export function detectSchema(fileName: string, options: DetectSchemaOptions & { firstMatch: true }): Schema | undefined;
export function detectSchema(fileName: string, options: DetectSchemaOptions & { firstMatch: false }): Schema[];
export function detectSchema(fileName: string, options: DetectSchemaOptions = defaultDetectOptions): Schema | Schema[] | undefined {
    options = {...defaultDetectOptions, ...options} as DetectSchemaOptions;
    const matchedSchemas = catalog.schemas.filter((schema: Schema) => {
        if (!schema.fileMatch) {
            return false;
        }
        const strictMatches = schema.fileMatch.some((pattern: string) => minimatch(fileName, pattern, options));
        if (strictMatches) {
            return true;
        } else if (options.strict) {
            return false;
        } else {
            fileName = fileName.split('/').pop() ?? fileName;
            return schema.fileMatch.some((pattern: string) => minimatch(fileName, pattern, options));
        }
    });

    if (options.bestMatch && options.bestMatch && matchedSchemas.length > 1) {
        return matchedSchemas.reduce((bestMatch: Schema | undefined, schema: Schema) => {
            if (!bestMatch) {
                return schema;
            }
            const bestMatchPattern = bestMatch.fileMatch?.[0] ?? '';
            const schemaPattern = schema.fileMatch?.[0] ?? '';
            return schemaPattern.length > bestMatchPattern.length ? schema : bestMatch;
        }, undefined);
    }

    return options.firstMatch ? matchedSchemas[0] : matchedSchemas;
}
