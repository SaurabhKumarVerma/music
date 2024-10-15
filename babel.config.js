module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          alias: {
            "^@music/(.+)": "./src/\\1",
            "@components": "./src/components",
            "@base": "./src/base",
            "@hooks": "./src/hook",
            "@navigations-stack": "./src/navigation/StackNavigation",
            "@screens": "./src/screen",
            "@services": "./src/service",
            "@store": "./src/store",
            "@themes": "./src/theme",
            "@types": "./src/types",
            "@utils": "./src/utils",
            "@navigationTypes": "./src/navigation/NavigationTypes",
            "@navigations-taps": "./src/navigation/BottomNavigation",
            "@navigations-drawer": "./src/navigation/DrawerNavigation",
            "@constant": "./src/constant/",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  }
}
