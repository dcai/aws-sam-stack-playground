// prettier.config.js or .prettierrc.js
module.exports = {
    trailingComma: 'none',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    printWidth: 128,
    useTabs: false,
    quoteProps: 'preserve',
    overrides: [
        {
            files: '*.json',
            options: {
                tabWidth: 2
            }
        },
        {
            files: ['*.yaml', '*.yml'],
            options: {
                singleQuote: false,
                tabWidth: 2
            }
        }
    ]
};
