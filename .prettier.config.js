module.exports = {
  $schema: 'https://json.schemastore.org/prettierrc',
  semi: false,
  tabWidth: 2,
  singleQuote: true,
  printWidth: 120,
  trailingComma: 'none',
  importOrder: ['^@/components/(.*)$', '^@/assets/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss']
}
