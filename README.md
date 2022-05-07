## 一、搭建第一个Vite项目

- Node.js版本 >= 12

 - 我使用的是npm 8.1.2
 ```shell
$ npm init vite@latest
$ yarn create vite

# npm 6.x
npm init vite@latest my-vue-app --template vue

# npm 7+, 需要额外的双横线： (我使用这个vue-ts 模板)
npm init vite@latest vue3-ts-template -- --template vue-ts

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app -- --template vue
 ```
除此之外Vite还提供多种模板vanilla，vanilla-ts，vue，vue-ts，react，react-ts，preact，preact-ts，lit，lit-ts，svelte，svelte-ts。这里我们使用最基础的vue-ts模板，具体的可以参考[Vite](https://vitejs.cn/guide/#scaffolding-your-first-vite-project)官方文档。

### 1.1. 初始化git、安装依赖
```shell
git init (因为我们不是用的脚手架，默认不存在git仓库)
npm install
```

### 1.2. 修改Vite配置文件
``` typescript
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// 如果这里飘红则安装下依赖。
// pnpm add @types/node -D
// npm install @types/node -D
// yarn add @types/node -D
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 配置别名
    alias: {
      "@": resolve(__dirname, "src")
    },
    extensions: [".js", ".json", ".ts", ".vue"] // 使用路径别名时想要省略的后缀名
  },
  server: {
    proxy: {
      // 选项写法
      "/api": {
        target: "http://localhost:9000", // 所要代理的目标地址
        rewrite: (path) => path.replace(/^\/api/, ""), // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
        changeOrigin: true // true/false, 默认值:false - 将主机报头的来源更改为目标URL
      }
    }
  }
  // 此时会通过上面的代理规则，将源地址代理到目标地址，从而访问目标地址的接口
  // 需要注意的是 /api开头的 /不能丢，正则匹配也是
})

```

#### 1.2.1. 配置文件引用别名 alias

上面配置了 `@` 指向 `src`的别名，现在修改`tsconfig.json` 中导入该配置文件，让配置生效 ，接下来让`Vscode`给出路径提示。

```json
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
```

### 1.3. 规范目录结构

```json
└── src/
    ├── assets/                    // 静态资源目录
    ├── components/                // 公共组件目录
    ├── router/                    // 路由配置目录
    ├── store/                     // 状态管理目录
    ├── style/                     // 通用 CSS 目录
    ├── utils/                     // 工具函数目录
    ├── views/                     // 页面组件目录
    ├── App.vue
    ├── main.ts
    ├── env.d.ts
├── .gitignore   
├── index.html
├── tsconfig.json                  // TypeScript 配置文件
├── tsconfig.node.json
├── vite.config.ts                 // Vite 配置文件
├── README.md
├── package-lock.json
└── package.json

```

## 二、集成Vue Router

### 2.1. 安装路由
```shell
  npm view vue-router versions        -- 查看vue-router版本
  npm install vue-router@next         -- 安装
```

### 2.2. 创建src/router/index.ts

​	在view目录下新建home-page.vue

```typescript
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "HomePage",
    component: () => import(/* webpackChunkName: "Home" */ "@/views/home-page.vue")
  },
  { path: "/", redirect: { name: "HomePage" } }
]

const router = createRouter({
  // history 模式,hash模式:createWebHashHistory()
  history: createWebHashHistory(),
  routes
})

export default router

```

### 2.3. 在main.ts中挂载
```typescript
import { createApp } from "vue";
// 1.1 安装后 导入
import router from "./router";
import App from "@/App.vue";

const app = createApp(App);
// 1.2. use挂载
app.use(router);
app.mount("#app");
```

## 三、集成Pinna

### 3.1. 安装pinia

```shell
yarn add pinia
# or with npm
npm install pinia
```

### 3.2. 在main.ts中挂载

```typescript
import { createApp } from "vue";
import router from "./router";
// 2.1. 安装后 导入
import { createPinia } from "pinia";
import App from "@/App.vue";


const app = createApp(App);
// 2.2. 创建pinia实例
const pinia = createPinia();

app.use(router);
// 2.3. use挂载
app.use(pinia);
app.mount("#app");
```

### 3.3. 创建在src/store/index.ts文件

```typescript
import { defineStore } from "pinia";
// 1.定义容器
// 参数1： 容器的ID，必须唯一，将来pinia会把所有容器挂载到根容器
// 参数2： 选项对象
export const mainStore = defineStore("main", {
  /**
   * 类似于组件的data， 用来存储全局状态
   * 1. 必须是函数，这样是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
   * 2. 必须是箭头函数，这样是为了更好的 TS 类型推导
   * @returns  一个函数，调用得到容器实例
   */
  state: () => {
    return {
      msg: "第一个状态数据 Pinia",
    };
  },
  /**
   * 类似于组件的computed，用来封装计算属性，有缓存的功能
   */
  getters: {},
  /**
   * 类似于组件的methods，封装业务逻辑（同步，异步都可以），修改state
   */
  actions: {},
});

```

## 四、 集成Element Plus

### 4.1. 安装

```shell
# 选择一个你喜欢的包管理器
# NPM
$ npm install element-plus --save
# Yarn
$ yarn add element-plus
# pnpm
$ pnpm install element-plus
```

### 4.2. 自动按需导入

您需要使用额外的插件来导入要使用的组件。

首先你需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```

### 4.3. 修改Vite配置文件

```typescript
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```

这样我们不需要全局注册Element Plus的组件，也不需要引入样式，直接可以使用，插件会自动帮我们完成相应的操作。

## 五、Axios集成

### 5.1. 安装

```shell
npm install axios
```

### 5.2. 二次封装Axios

....后续学习了再补充

## 六、集成Stylus/Sass/Less

本项目以less为例，相关的loader Vite 已经集成好了，无需额外配置

`npm install less -D` 直接使用即可。

```css
<style scoped lang="less"></style>
```

## 七、代码规范

### 7.1. 集成EditorConfig 配置

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

在本项目根目录下增加 `.editorconfig` 文件：

```typescript
# Editor configuration, see http://editorconfig.org

# 表示是最顶层的 EditorConfig 配置文件
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false

```

注意，VSCode 使用 EditorConfig 需要去插件市场下载插件 **EditorConfig for VS Code** 。

### 7.2. 集成Prettier 

Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

#### 7.2.1. 安装

```shell
npm install prettier -D
```

#### 7.2.2. 配置Prettier文件

Prettier 支持多种格式的配置文件，比如 .json、.yml、.yaml、.js等。

在本项目根目录下创建 `.prettierrc` 文件。

* useTabs：使用tab缩进还是空格缩进，选择false；
* tabWidth：tab是空格的情况下，是几个空格，选择2个；
* printWidth：当行字符的长度；
* singleQuote：使用单引号还是双引号，选择true，使用单引号，false，使用双引号；
* trailingComma：在多行输入的尾逗号是否添加，设置为 `none`；
* semi：语句末尾是否要加分号，默认值true，选择false表示不加；

```shell
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": false,
  "trailingComma": "none",
  "semi": true
}
```

Prettier 安装且配置好之后，就能使用命令来格式化代码

```shell
# 格式化所有文件（. 表示所有文件）
npx prettier --write .
```
#### 7.2.3. 创建.prettierignore忽略文件

在本项目根目录下增加 `.prettierignore` 文件：

```typescript
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

#### 7.2.4. 修改package.json

```json
{
  "script": {
    ...
    "prettier": "prettier --write ." //实际上我们也可以通过 npx prettier --write .
  }
}
```

注意，VSCode 编辑器使用 Prettier 配置需要下载插件 **Prettier - Code formatter** 。

### 7.3. 集成ESlint

#### 7.3.1. 安装

```shell
npm install eslint -D
```

#### 7.3.2. 生成ESlint配置文件

```shell
npx eslint --init

// 表示需要安装 @eslint/create-config 按回车即可
yangjiang@MacBook-Pro vue-ts % npx eslint --init
You can also run this command directly using 'npm init @eslint/config'.
Need to install the following packages:
  @eslint/create-config
Ok to proceed? (y) 
```

#### 7.3.3. 具体配置信息

```shell
? How would you like to use ESLint? (Use arrow keys) //您想如何使用ESLint
  To check syntax only // 只检查语法
> To check syntax and find problems // 检查语法和发现问题 √
  To check syntax, find problems, and enforce code style // 检查语法、发现问题并强制执行代码风格 

? What type of modules does your project use? （你的项目使用哪种类型的模块?）
❯ JavaScript modules (import/export)  // JavaScript √
  CommonJS (require/exports) // CommonJS
  None of these // 其他
  
? Which framework does your project use? （你的项目使用哪种框架?）
  React
❯ Vue.js			// 我用Vue
  
? Does your project use TypeScript? › No / Yes （是否使用TypeScript）
  Yes
  
? Where does your code run?（你的代码在哪里运行?）
✔ Browser
✔ Node  // 我们这里选择 Browser 和 Node（按空格键进行选择，选完按回车键确定）
  
// 这里是选择To check syntax, find problems, and enforce code style
//（检查语法、发现问题并强制执行代码风格）   才会多出的选项
*? How would you like to define a style for your project? （你想怎样为你的项目定义风格？）
❯ Use a popular style guide   // 使用一种流行的风格
Answer questions about your style

*? Which style guide do you want to follow?（你想遵循哪一种风格指南?)
//（检查语法、发现问题并强制执行代码风格）   才会多出的选项
❯ Airbnb: https://github.com/airbnb/javascript  // 暂时选这个 github start星最多
  Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
  XO: https://github.com/xojs/eslint-config-xo

? What format do you want your config file to be in? （你希望你的配置文件是什么格式?）
❯ JavaScript  //选择JavaScript
  YAML
  JSON

eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.2 @typescript-eslint/parser@latest
? Would you like to install them now with npm? › No / Yes （你想现在就用 NPM 安装它们吗?）

// 注意：如果自动安装依赖失败，那么复制后手动安装
npm install eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint@^7.32.0 || ^8.2.0 eslint-plugin-import@^2.25.2 @typescript-eslint/parser@latest -D
```

#### 7.3.4. 修改.eslintrc.js文件

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  // .vue文件的ESLint自定义解析器。
  parser: "vue-eslint-parser",
  extends: [
    "eslint:recommended", // eslint默认推荐的规范 
    "plugin:vue/vue3-recommended", // vue3默认的推荐规范
    "plugin:@typescript-eslint/recommended", // eslint/typescript 默认的推荐规范
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    // 支持jsx
    ecmaFeatures: {
      jsx: true
    }
  },
  // eslint-plugin-vue @typescript-eslint/eslint-plugin 的缩写
  plugins: ["vue", "@typescript-eslint"],
  rules: {},
  // 这里vue3的配置我们要特别说一下，因为vue3很多新的特性，例如defineProps会直接在eslint报错。所以，如果是使用vue3的小伙伴，就需要针对vue3进行一些配置。
  // 首先，我们需要添加对defineProps、defineEmits、defineExpose、withDefaults的支持。
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly"
  }
}

```

根据项目实际情况，如果我们有额外的 ESLint 规则，也在此文件中追加。

注意，VSCode 使用 ESLint 配置文件需要去插件市场下载插件 **ESLint** 。

#### 7.3.5. 修改package.json

```json
{
  "script": {
    ...
    "lint": "eslint src --fix --ext .ts,.tsx,.vue,.js,.jsx",
  }
}
```

#### 7.3.6. 新增ESlint忽略文件

在本项目根目录下创建 `.eslintignore` 文件。

```
node_modules
dist
index.html
*.d.ts
```

注意，VSCode 使用 ESLint 配置文件需要去插件市场下载插件 **ESLint**

#### 7.3.7. 格式化代码

执行一下下面的代码，看看配置有没有生效

```
# eslint 检查
yarn lint
# prettier 自动格式化
yarn prettier
```

### 7.4. 解决eslint和prettier冲突

通常会在项目中根据实际情况添加一些额外的 ESLint 和 Prettier 配置规则，难免会存在规则冲突情况。 解决两者冲突问题，需要用到 eslint-plugin-prettier 和 eslint-config-prettier。

最后形成优先级：Prettier 配置规则 > ESLint 配置规则。

- 安装插件（vue在创建项目时，如果选择prettier，那么这两个插件会自动安装，因为我们没用到脚手架，所以没有安装下面两个）

  ```typescript
  npm i eslint-plugin-prettier eslint-config-prettier -D
  ```

- 在 .eslintrc.js 添加 prettier 插件

  ```typescript
  module.exports = {
    ...
    extends: [
    	...
      "plugin:prettier/recommended", // 插件约束规范 解决eslint和prettier的冲突问题
    ],
  }
  ```
  
   - extends： 代表继承多个规范 

  *  在继承的情况下，里面包含相同的规则，最后一个会把前面里面的规则给覆盖掉。

  这样，我们在执行 eslint --fix 命令时，ESLint 就会按照 Prettier 的配置规则来格式化代码，轻松解决二者冲突问题。

### 7.5. 集成 husky 和 lint-staged

#### 7.5.1. husky 

husky , Git Hook 工具，可以设置在 git 各个阶段（`pre-commit`、`commit-msg`、`pre-push` 等）触发我们的命令。

虽然我们已经要求项目使用eslint了，但是不能保证组员提交代码之前都将eslint中的问题解决掉了：

* 也就是我们希望保证代码仓库中的代码都是符合eslint规范的；

* 那么我们需要在组员执行 `git commit ` 命令的时候对其进行校验，如果不符合eslint规范，那么自动通过规范进行修复；

那么如何做到这一点呢？可以通过Husky工具：

这里我们可以使用自动配置命令：

在执行这个命令之前，确保项目已经被git管理，如果没有初始化git仓库，先执行 git init 

```shell
npx husky-init && npm install
```

这里会做三件事：

1.安装husky相关的依赖：package.json

```json
  "devDependencies": {
   ....
    "husky": "^7.0.0"
  }
```

2.在项目目录下创建 `.husky` 文件夹：

3.在package.json中添加一个脚本：

```json
  "scripts": {
    ....
    "prepare": "husky install"
  },
```

到这里，husky 配置完毕，现在我们来使用它：

husky 包含很多 `hook`（钩子），常用有：`pre-commit`、`commit-msg`、`pre-push`。这里，我们使用 `pre-commit` 来触发 ESLint 命令。

接下来，我们需要去完成一个操作：在进行commit时，执行lint脚本：

修改 `.husky/pre-commit` hook 文件的触发命令：

```
eslint --fix ./src --ext .vue,.js,.ts
```

上面这个 `pre-commit` hook 文件的作用是：当我们执行 `git commit -m "xxx"` 时，会先对 `src` 目录下所有的 `.vue`、`.js`、`.ts ` 文件执行 `eslint --fix` 命令，如果 ESLint 通过，成功 `commit`，否则终止 `commit`。

但是又存在一个问题：有时候我们明明只改动了一两个文件，却要对所有的文件执行 `eslint --fix`。假如这是一个历史项目，我们在中途配置了 ESLint 规则，那么在提交代码时，也会对其他未修改的“历史”文件都进行检查，可能会造成大量文件出现 ESLint 错误，显然不是我们想要的结果。

我们要做到只用 ESLint 修复自己此次写的代码，而不去影响其他的代码。所以我们还需借助一个神奇的工具 **lint-staged** 。

#### 7.5.2. lint-staged

lint-staged 这个工具一般结合 husky 来使用，它可以让 husky 的 `hook` 触发的命令只作用于 `git add`那些文件（即 git 暂存区的文件），而不会影响到其他文件。

接下来，我们使用 lint-staged 继续优化项目。

##### 7.5.2.1. 安装lint-staged

```shell
npm install lint-staged -D
```

##### 7.5.2.2. 修改package.json

因为我们要结合 `prettier` 代码格式化,所有修改一下配置，在 `package.json`里增加 lint-staged 配置项

```shell
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,vue,ts,tsx}": [
      "yarn lint",
      "prettier --write",
      "git add"
    ]
  }
```

这行命令表示：只对 git 暂存区的 `.vue`、`.js`、`.ts` 、`jsx``tsx`  文件执行 `eslint --fix`。

##### 7.5.2.3. 修改 .husky/pre-commit

修改 `.husky/pre-commit` hook 的触发命令为：`npx lint-staged`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

至此，husky 和 lint-staged 组合配置完成。

现在我们提交代码时就会变成这样：

假如我们修改了 `scr` 目录下的 `test-1.js`、`test-2.ts` 和 `test-3.md` 文件，然后 `git add ./src/`，最后 `git commit -m "test..."`，这时候就会只对 `test-1.js`、`test-2.ts` 这两个文件执行 `eslint --fix`。如果 ESLint 通过，成功提交，否则终止提交。从而保证了我们提交到 Git 仓库的代码都是规范的。

### 7.6. 代码提交规范

通常我们的git commit会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制。

但是如果每次手动来编写这些是比较麻烦的事情，我们可以使用一个工具：Commitizen

#### 7.6.1. 安装Commitizen

```shell
npm install commitizen -D
```

#### 7.6.2. 安装适配器

```shell
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

这个命令会帮助我们安装cz-conventional-changelog，并且在package.json中进行配置：

```json
 "devDependencies": {
		....
    "commitizen": "^4.2.4", 
    "cz-conventional-changelog": "^3.3.0",
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"  // 这里是配置
    }
  }
```

#### 7.6.3 使用Commitizen

以前我们提交代码都是 `git commit -m "xxx"`，现在改为 `npx cz`，然后按照终端操作提示，逐步填入信息，就能自动生成规范的 commit message。

这个时候我们提交代码需要使用 `npx cz`：

| Type     | 作用                                                         |
| -------- | ------------------------------------------------------------ |
| feat     | 新增特性 (feature)                                           |
| fix      | 修复 Bug(bug fix)                                            |
| docs     | 修改文档 (documentation)                                     |
| style    | 代码格式修改(white-space, formatting, missing semi colons, etc) |
| refactor | 代码重构(refactor)                                           |
| perf     | 改善性能(A code change that improves performance)            |
| test     | 测试(when adding missing tests)                              |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等） |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                     |
| revert   | 代码回退                                                     |

```shell
第一步是选择type，本次更新的类型
第二步选择本次修改的范围（作用域）
? What is the scope of this change (e.g. component or file name): (press enter to skip) 
第三步选择提交的信息
? Write a short, imperative tense description of the change (max 93 chars):
第四步提交详细的描述信息
? Provide a longer description of the change: (press enter to skip)
第五步是否是一次重大的更改
? Are there any breaking changes? (y/N) 
第六步是否影响某个open issue
? Does this change affect any open issues? (y/N) 
```

我们也可以在scripts中构建一个命令来执行 cz，之后可以通过npm run commit来提交代码。

```json
 "scripts": {
  	...
    "commit": "cz"
  },
```

### 7.7. 代码提交验证

如果我们按照cz来规范了提交风格，但是依然有同事通过 `git commit` 按照不规范的格式提交应该怎么办呢？

* 我们可以通过commitlint来限制提交；

1.安装 @commitlint/config-conventional 和 @commitlint/cli

```shell
npm i @commitlint/config-conventional @commitlint/cli -D
```

2.在根目录创建commitlint.config.js文件，配置commitlint

```typescript
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

3.使用husky生成commit-msg文件，验证提交信息：

```shell
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

4.某一次提交想要禁用 `husky`，可以添加参数`--no-verify`

```shell
git commit --no-verify -m "xxx"
```

### 7.8. 完整的配置文件

#### 7.8.1. erlintrc.js

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  // .vue文件的ESLint自定义解析器。
  parser: "vue-eslint-parser",
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended" // 插件约束规范 解决eslint和prettier的冲突问题
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    // 支持jsx
    ecmaFeatures: {
      jsx: true
    }
  },
  // eslint-plugin-vue @typescript-eslint/eslint-plugin 的缩写
  plugins: ["vue", "@typescript-eslint"],
  rules: {},
  // 这里vue3的配置我们要特别说一下，因为vue3很多新的特性，例如defineProps会直接在eslint报错。所以，如果是使用vue3的小伙伴，就需要针对vue3进行一些配置。
  // 首先，我们需要添加对defineProps、defineEmits、defineExpose、withDefaults的支持。
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly"
  }
};

```

#### 7.8.2.  .eslintignore

```
node_modules
dist
index.html
*.d.ts
```

#### 7.8.3 .prettierrc

```
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": false,
  "trailingComma": "none",
  "semi": true
}
```

#### 7.8.4 .prettierignore

```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

#### 7.8.5. package.json

```json
{
  "name": "vue3-ts-template",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview",
    "prettier": "prettier --write .",
    "lint": "eslint src --fix --ext .ts,.tsx,.vue,.js,.jsx",
    "prepare": "husky install",
    "commit": "cz"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,vue,ts,tsx}": [
      "yarn lint",
      "prettier --write",
      "git add"
    ]
  },
  "dependencies": {
    "axios": "^0.26.1",
    "element-plus": "^2.1.9",
    "pinia": "^2.0.13",
    "vue": "^3.2.25",
    "vue-router": "^4.0.13"
  },
  "devDependencies": {
    "@commitlint/cli": "^16.2.3",
    "@commitlint/config-conventional": "^16.2.1",
    "@types/node": "^17.0.24",
    "@typescript-eslint/eslint-plugin": "^5.19.0",
    "@typescript-eslint/parser": "^5.19.0",
    "@vitejs/plugin-vue": "^2.3.1",
    "commitizen": "^4.2.4",
    "cz-conventional-changelog": "^3.3.0",
    "eslint": "^8.13.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-vue": "^8.6.0",
    "husky": "^7.0.0",
    "less": "^4.1.2",
    "lint-staged": "^12.3.8",
    "prettier": "^2.6.2",
    "typescript": "^4.5.4",
    "unplugin-auto-import": "^0.7.1",
    "unplugin-vue-components": "^0.19.3",
    "vite": "^2.9.2",
    "vue-tsc": "^0.29.8"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

#### 7.8.6. .editorconfig

```
# Editor configuration, see http://editorconfig.org

# 表示是最顶层的 EditorConfig 配置文件
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false


```



