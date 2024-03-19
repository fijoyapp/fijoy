/** @type {import('prettier').Config} */
const prettierConfig = {
  plugins: ["prettier-plugin-sql"],
};

/** @type {import('prettier-plugin-sql').SqlBaseOptions} */
const prettierPluginSqlConfig = {
  language: "postgresql",
  database: "postgresql",
  keywordCase: "upper",
  dataTypeCase: "upper",
};

const config = {
  ...prettierConfig,
  ...prettierPluginSqlConfig,
};

export default config;
