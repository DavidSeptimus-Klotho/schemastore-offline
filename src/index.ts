import micromatch from 'micromatch';
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

export function detectSchema(fileName: string, options?: Omit<DetectSchemaOptions, 'firstMatch' | 'bestMatch'>): Schema[];
export function detectSchema(fileName: string, options: DetectSchemaOptions & { firstMatch: true }): Schema | undefined;
export function detectSchema(fileName: string, options: DetectSchemaOptions & { bestMatch: true }): Schema | undefined;
export function detectSchema(fileName: string, options: DetectSchemaOptions & { firstMatch: false, bestMatch: false }): Schema[];
export function detectSchema(fileName: string, options: DetectSchemaOptions = defaultDetectOptions): Schema | Schema[] | undefined {
    options = { ...defaultDetectOptions, ...options } as DetectSchemaOptions;
    const matchedSchemas = catalog.schemas.filter((schema: Schema) => {
        if (!schema.fileMatch) {
            return false;
        }
        const strictMatches = micromatch([fileName], schema.fileMatch, options).length > 0;
        if (strictMatches) {
            return true;
        } else if (options.strict) {
            return false;
        } else {
            fileName = fileName.split('/').pop() ?? fileName;
            return micromatch([fileName], schema.fileMatch, options).length > 0;
        }
    });

    if (options.bestMatch && matchedSchemas.length > 1) {
        return bestMatch(fileName, matchedSchemas, options);
    }

    return options.firstMatch ? matchedSchemas[0] : matchedSchemas;
}


function bestMatch(fileName: string, schemas: Schema[], options: DetectSchemaOptions): Schema | undefined {
    return schemas.reduce((bestMatch: Schema | undefined, schema: Schema) => {
        if (!schema.fileMatch) {
            return bestMatch;
        }
        const bestMatchCaptures = bestMatch?.fileMatch?.map(pattern => micromatch.capture(pattern, fileName, options)?.length ?? 0) ?? [];
        const schemaCaptures = schema.fileMatch.map(pattern => micromatch.capture(pattern, fileName, options)?.length ?? 0);
        const maxBestMatchCapture = Math.max(...bestMatchCaptures, 0);
        const maxSchemaCapture = Math.max(...schemaCaptures, 0);
        return maxSchemaCapture > maxBestMatchCapture ? schema : bestMatch;
    }, undefined);
}