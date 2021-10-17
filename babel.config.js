module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    alias: {
                        data: "./src/data",
                        ui: "./src/ui",
                        pages: "./src/pages",
                        "@styles": "./src/ui/styles",
                        "@assets": "./assets",
                    },
                },
            ],
        ],
    };
};
