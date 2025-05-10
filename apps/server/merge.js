#!/usr/bin/env node

import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { print } from "graphql";
import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as prettier from "prettier";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const loadedFiles = loadFilesSync(`${__dirname}/*.graphql`);
const typeDefs = mergeTypeDefs(loadedFiles);
const printedTypeDefs = print(typeDefs);
const formattedTypeDefs = await prettier.format(printedTypeDefs, {
  parser: "graphql",
});
writeFileSync("relay.graphql", formattedTypeDefs);
