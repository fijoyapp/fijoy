const {
  makeGenerateZodSchemas,
  defaultGetZodSchemaMetadata,
  defaultGetZodIdentifierMetadata,
  defaultZodTypeMap,
} = require("kanel-zod");
const { resolveType } = require("kanel");

const { recase } = require("@kristiandupont/recase");
const { tryParse } = require("tagged-comment-parser");

const generateZodSchemas = makeGenerateZodSchemas({
  getZodSchemaMetadata: defaultGetZodSchemaMetadata,
  getZodIdentifierMetadata: defaultGetZodIdentifierMetadata,
  zodTypeMap: {
    ...defaultZodTypeMap,
    "pg_catalog.timestamptz": "z.coerce.date()",
  },
  castToSchema: false,
});

const toCamelCase = recase("snake", "camel");
const toPascalCase = recase("snake", "pascal");
const outputPath = "./src/gen/schemas";

/** @type {import('kanel').Config} */
module.exports = {
  connection: process.env.DB_URL,

  preDeleteOutputFolder: true,
  outputPath,
  preRenderHooks: [generateZodSchemas],

  enumStyle: "type",

  customTypeMap: {
    "pg_catalog.tsvector": "string",
    "pg_catalog.bpchar": "string",
  },

  getPropertyMetadata: (property, _details, generateFor) => {
    const { comment: strippedComment } = tryParse(property.comment);

    return {
      name: toCamelCase(property.name),
      comment: [
        `Database type: ${property.expandedType}`,
        ...(generateFor === "initializer" && property.defaultValue
          ? [`Default value: ${property.defaultValue}`]
          : []),
        ...(strippedComment ? [strippedComment] : []),
      ],
    };
  },

  generateIdentifierType: (column, details, config) => {
    const name = toPascalCase(details.name) + toPascalCase(column.name);
    const innerType = resolveType(column, details, {
      ...config,
      // Explicitly disable identifier resolution so we get the actual inner type here
      generateIdentifierType: undefined,
    });
    const imports = [];

    let type = innerType;
    if (typeof innerType === "object") {
      // Handle non-primitives
      type = innerType.name;
      imports.push(...innerType.typeImports);
    }

    return {
      declarationType: "typeDeclaration",
      name,
      exportAs: "named",
      typeDefinition: [innerType],
      typeImports: imports,
      comment: [],
    };
  },
};
