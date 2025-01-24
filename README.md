# schemastore-offline

---

## Description
An offline utility
for referencing JSON schemas from the
[JSON Schema Store](https://www.schemastore.org/) catalog.

## Installation (not yet implemented)
```bash
npm install schemastore-offline
```

## Usage

### getSchema

Retrieves a JSON schema entry from the schema store catalog.

```javascript
const { getSchema } = require('schemastore-offline');

const schema = getSchema('.prettierrc.json');
/* schema:
{
      "name": "prettierrc.json",
      "description": ".prettierrc configuration file",
      "fileMatch": [
        ".prettierrc",
        ".prettierrc.json",
        ".prettierrc.yml",
        ".prettierrc.yaml"
      ],
      "url": "https://json.schemastore.org/prettierrc.json",
      "versions": {
        "1.8.2": "https://json.schemastore.org/prettierrc-1.8.2.json",
        "2.8.8": "https://json.schemastore.org/prettierrc-2.8.8.json",
        "3.0.0": "https://json.schemastore.org/prettierrc.json"
      }
    },
*/
```

### getCatalog

Retrieves the entire schema store catalog.

```javascript
import { getCatalog } from 'schemastore-offline';

const catalog = getCatalog();
/* catalog:
{
  "version": "1.0.0",
  "schemas": [
    {
      "name": "prettierrc.json",
      "description": ".prettierrc configuration file",
      "fileMatch": [
        ".prettierrc",
        ".prettierrc.json",
        ".prettierrc.yml",
        ".prettierrc.yaml"
      ],
      "url": "https://json.schemastore.org/prettierrc.json",
      "versions": {
        "1.8.2": "https://json.schemastore.org/prettierrc-1.8.2.json",
        "2.8.8": "https://json.schemastore.org/prettierrc-2.8.8.json",
        "3.0.0": "https://json.schemastore.org/prettierrc.json"
      }
    },
    ...
  ]
}
*/
```

### detectSchema

Detects the matching schema or schemas for a given file path based on the `fileMatch` property of each schema in the catalog.
By default, returns an array of all matching schemas.

#### Options

- **findBest** (boolean): If `true`, returns the schema with the most matching file extensions.
- **findFirst** (boolean): If `true`, returns the first schema that matches the file extension.
- **nocase** (boolean): If `true`, performs a case-insensitive match.
- **dot** (boolean): If `true`, matches files with a leading dot in the filename.
- **strict** (boolean): If `false`, only the filename is matched against the `fileMatch` property. If `true`, the full path is matched.

```javascript
import { detectSchema } from 'schemastore-offline';

const schema = detectSchema('my-module/.prettierrc.json', {findBest: true});
/* schema
{
  "name": "prettierrc.json",
  "description": ".prettierrc configuration file",
  "fileMatch": [
    ".prettierrc",
    ".prettierrc.json",
    ".prettierrc.yml",
    ".prettierrc.yaml"
  ],
  "url": "https://json.schemastore.org/prettierrc.json",
  "versions": {
    "1.8.2": "https://json.schemastore.org/prettierrc-1.8.2.json",
    "2.8.8": "https://json.schemastore.org/prettierrc-2.8.8.json",
    "3.0.0": "https://json.schemastore.org/prettierrc.json"
  }
 */

const schemas = detectSchema('my-module/.prettierrc.json');
/* schemas
[
  {
    "name": "prettierrc.json",
    "description": ".prettierrc configuration file",
    "fileMatch": [
      ".prettierrc",
      ".prettierrc.json",
      ".prettierrc.yml",
      ".prettierrc.yaml"
    ],
    "url": "https://json.schemastore.org/prettierrc.json",
    "versions": {
      "1.8.2": "https://json.schemastore.org/prettierrc-1.8.2.json",
      "2.8.8": "https://json.schemastore.org/prettierrc-2.8.8.json",
      "3.0.0": "https://json.schemastore.org/prettierrc.json"
    }
  },
  ...
]
*/
```


## Catalog Versioning
The included schema catalog will be the latest version of the
[JSON Schema Store catalog](https://raw.githubusercontent.com/SchemaStore/schemastore/master/src/api/json/catalog.json)
at the time of the last update to this repository.

`schemastore-offline` has a GitHub Action that runs nightly that will automatically update the schema catalog and publish a new version of the package when the JSON Schema Store catalog is updated.
(not yet implemented)