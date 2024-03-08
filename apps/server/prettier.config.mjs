/** @type {import('prettier').Config} */
const prettierConfig = {
  plugins: ["prettier-plugin-sql"],
};

/** @type {import('prettier-plugin-sql').SqlBaseOptions} */
const prettierPluginSqlConfig = {
  language: "postgresql",
  // keywordCase: "upper",
};

const config = {
  ...prettierConfig,
  ...prettierPluginSqlConfig,
};

export default config;
