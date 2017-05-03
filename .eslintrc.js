module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
      // disable some inherited rules
        'comma-dangle': 0,
        'no-extraneous-dependencies': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-dynamic-require': 0,
        'linebreak-style': 0,
        'no-param-reassign': 0,
        'global-require': 0
    }
};
