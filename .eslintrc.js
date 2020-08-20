module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es6: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        parser: "babel-eslint"
    },
    plugins: ["vue"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "arrow-spacing": [
            2,
            {
                before: true,
                after: true
            }
        ], // 强制箭头函数的箭头前后使用一致的空格
        camelcase: 2, // 强制使用骆驼拼写法命名约定
        "comma-dangle": [2, "never"], // 要求或禁止末尾逗号
        "no-mixed-spaces-and-tabs": [2], //关闭禁止混用tab和空格
        semi: [2], //分号结尾
        "no-unused-vars": [
            2,
            {
                // 允许声明未使用变量
                vars: "local",
                // 参数不检查
                args: "none"
            }
        ],
        "vue/no-parsing-error": [
            2,
            {
                "x-invalid-end-tag": false,
                "invalid-first-character-of-tag-name": false
            }
        ]
    }
};
