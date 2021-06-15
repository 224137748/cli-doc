# 指南

## 背景

脚手架通常是为了解决实际开发、生产遇到的 **重复** 且比较繁琐的工作而抽象出来的工具，假如我们的团队在工作中会遇到以下场景：

- 我们团队有 10 个开发成员，每个项目时都是由一个独立的`Gitlab`仓库托管，如果部门想分析团队、个人季度（年）开发了多少项目，或者根据项目类型，分析需求占比，这时则需要开发者统计项目数据，有点繁琐。

* 老板安排了个新需求，我想使用`Vue`或者`React`开发，但是用`vue-cli`和`create-react-app`配置基本环境，`redux`、`router`,`proxy`和`reset.css`就会花掉小半个小时，项目打包上线还要配置`publicPath`，又要做开发又要做运维，如果我只写一个项目配置文件，既适用于`Vue`有适用于`React`那就好了。

* 老板又安排了个新需求，静态页面较多，有`seo`要求，`SPA`就不适用了，用`SSR`的话感觉有点小题大做了，那就用`jquery`梭哈吧。但是用`jquery`又不能**支持热更新，不支持”组件“**，开发效率好低啊，嗯~？！要不用`nuxt`或者`next`打包成静态页面？ no！ 我不想学新框架，我就想用`jquery`，难不成自己搭个`webpack`或者`gulp`架子？

* ok，项目开发完成了，`npm run build`，静态资源上传`cdn`，`copy`页面内容提交给后端发布。有点繁琐，欸~！我们都用一个仓库管理代码，`git`提交代码后，`npm run build`让服务器帮我们打包指定项目，静态资源让服务器传`cdn`，这样可以吗？

`lds-app-cli`针对以上场景，提供了相应的功能。如果您对项目定制化要求较高，还是建议您单独创建项目。

## 功能

基于以上，本`cli`从前端小团队的角度，抽象出项目创建，开发，发布过程的环节，实现了以下功能：

- :wrench: ：可根据项目类型，技术类别快速创建项目、配置开发（生产）环境，并且打包项目。
- :triangular_ruler: ：启动项目后，在`cli`中可阅览开发者列表，以及某个开成员经手的项目列表，方便查找项目和项目统计。
- :pencil: ：可创建`vue`、`react`、普通(`jquery`)类型项目，仅需拟定一份配置文件`config.js`，便可适配框架的差异。
- :dart: ：支持`vue3`、`Typescript`、`Babel`、`Babel prolyfill`。

:::warning 缺点
1、团队使用该脚手架后，共用一个代码仓库，所以对编码格式、`eslint`、`git`提交规范有要求，防止保存代码造成格式混乱影响他人代码。

2、脚手架创建的项目共享`package.json`，如果项目对依赖库版本有严格要求或者定制化较高还是建议单独创建项目。

3、目前项目在`development`环境搭建的是多页面场景，因此在开发`spa`项目时，路由只能支持`hash`模式。
:::

## 安装

:::warning 前提条件
最好 Node.js >= 12
:::
下面将会带你从零开始创建一个项目。

1、全局安装 `lds-app-cli`

```sh
  npm install -g lds-app-cli
  # OR
  yarn global add lds-app-cli

```

2、检查是否安装成功

```
c:\project>lds
Usage: lds-app-cli <commands> [options]

Options:
  -v, --version                   output the version number
  -h, --help                      display help for command

Commands:
  upgrade                         Check the lds-app-cli version.
  init <project_name>             Initialize a project.
  create <app_name>               Create a web app.
  start [options] <project_path>  Running a web app.
  build <project_path>            Build a web app.
  help [command]                  display help for command
```

## 起步

### 1、终端进入工作目录

```sh
  # c:\project即是我们要创建项目的路径
  cd c:\project
```

### 2、初始化项目

```sh
  # 创建一个名称为web-app的项目
  lds init web-app
```

脚手架会在`c:\project`目录下自动创建一个`web-app`文件夹，并初始化项目配置，安装相应的依赖文件。如果安装依赖过程时间比较久，可以中断程序，自行进入项目路径安装依赖。项目文件结构如下：

<img src="/directory.png"  />

- `.vscode`： vscode 编辑器响应配置文件，`pretter`、`eslint相关`。
- `build`： 打包输入目录。
- `developer`： 开发者记录文件夹。
- `src`： 工程文件夹，新创建的工程存放在该目录下。

## 开发

### 1、创建工程

开发者创建项目时，脚手架提供了`vue`、`react`和普通项目三种模板供选择，开发者可根据项目类型创建一般项目或者分类项目。

#### 创建一般项目

创建一个普通项目:

```sh
# 创建一个名称为mini-app的工程
lds create mini-app
```

脚手架会在`c:\project\web-app\src`下创建一个名称为`mini-app`的文件夹，并且初始化工程模板。

- 选择工程模板（`Vue`、`React`、普通工程），这里我们选择`Vue`模板。

  <img src="/create_step1.png"  />

- 设置标题，该标题将作为页面的标题。
- 设置描述，将生成`<meta name="description" content="618，活动">`标签。

  <img src="/create_step2.png" />

- 创建工程成功， 在`src`目录下已经创建了`mini-app`工程，并初始化了模板文件。

  <img src="/create_step3.png" />

#### 根据类型创建项目

有时候我们希望根据项目的类型创建项目，例如根据时间（2020，2021），根据项目需求方（市场部、销售部），根据项目类型（pc、h5、专题)等单独创建项目。分类创建项目有助于我们查找和统计归类。

要实现分类创建项目很简单，只需在项目名前加上类别即可，例如我们想在`h5`这个类别下创建名为`game-demo`和`honour-demo`的项目。

```sh
lds create h5/game-demo
```

选择模板创建成功后，再次创建活动。

```sh
lds create h5/honour-demo
```

等上面两个工程都创建完毕后，再打开项目看看`web-app/src/h5`文件夹，

 <img src="/create_step4.png" />

由上图可知，我们根据`h5`这个类别创建项目已经成功了。

### 2、启动工程

启动一个工程的命令为，`lds start project_name -p 8080`。端口号不指定的化，默认为`3000`。**注意：在输入`lds start`命令时，确保当前执行环境是在项目路径下，否则会因为找不到依赖包导致启动服务失败。**

:::warning 提示
`project_name`是相对于`web-app/src`的相对路径，例如：想启动的工程路径为`web-app/src/example/mini-app`，此时`project_name`为`example/mini-app`.
:::

我们以`web-app/src/example/mini-app`为例，启动一个工程：

```sh
lds start example/mini-app
```

控制台输出：

<img src="/start_step1.png" />

编译完成后，浏览器会默认打开`http://localhost:3000/example/mini-app`

<img src="/start_step2.png" />

### 3、概览工程

在项目已经运行成功的条件下，浏览器打开`http://localhost:3000`会展示开发成员列表：

<img src="/start_step3.png" />

点击`张富贵`进入其所开发的项目列表页，方便查找项目。

<img src="/start_step4.png" />

点击`清明节踏春demo`便可跳转到我们开发的页面。

## 打包

`lds-app-cli`打包工程非常简单，使用`lds build project_name`即可，

:::warning 提示
`project_name`是相对于`web-app/src`的相对路径，例如：想打包的工程路径为`web-app/src/example/mini-app`，此时`project_name`为`example/mini-app`.
:::

### 输出路径

工程打包成功后，会默认在项目根目录下创建一个`build`文件夹，脚手架会根据`project_name`自动在`build`文件夹下创建目录。例如：

```sh
  lds build example/mini-app
```

将会打包到`build/example/mini-app`中。

```sh
  lds build mini-app
```

将会打包到`build/mini-app`中。

### publicPath

在实际项目中，我们经常将`js`、`css`、`images`等静态资源上传至`cdn`，在`lds-app-cli`中如何配置呢？
找到工程的配置文件`config.js`:

```js
module.exports = {
  // 省略其他配置
  frame: "normal",
  // 配置生产路径，只在打包项目时生效，默认值 /
  publicPath: "https://cdn-aliyun.file.cn/",
};
```

在`publishPath`设置`cdn`绝对路径即可。执行`lds build project_name`，以下是打包结果

<img src="/build.jpeg" />

`css`文件中资源路径也被替换成绝对路径了。

## 配置文件

所有初始化的工程目录中`config.js`为工程的配置文件，`index.js`为入口文件，以下就是`config.js`的配置参数，

```js
// config.js
module.exports = {
  // 框架类型
  frame: "vue",

  // document.title
  title: "Vue app",

  meta: {
    // meta: description
    description: "a vue demo",
    // meta: keyword
    keyword: "",
  },

  // 配置生产路径，只在打包项目时生效，默认值 /
  publicPath: '/'

  // 配置代理
  proxy: {
    "/api": {
      target: "http://findream.vip",
      pathRewrite: { "^/api": "/api/music" },
      changeOrigin: true,
      secure: true,
    },
  },
};
```

通过对`proxy`的设置，在普通`jquery`项目中，我们就可以方便的使用`get`、`post`请求了。在后期的版本中会增加`host`、`https`设置，满足更多的开发需求。

:::warning 注意 ⚠️
`config.js`文件是工程配置文件入口，不可修改文件类型和文件名后缀，否则项目启动和打包过程会出现异常。
:::

## vue 模板

在前端全面拥抱`typescript`的时代，`cli`创建的`vue`模版默认使用了`vue3 + typescript`，开发者也可以根据自己的习惯将`typescript`改为`js`。

### 使用 vue-router

脚手架目前只支持`hash`路由，所以这里我们以`createWebHashHistory`创建路由。

```js
// router/index.js
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/home.vue";

const Detail = () => import("../views/detail.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/detail",
    name: "detail",
    component: Detail,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
```

### 使用 vuex

```js
// store/index.js

import { createStore } from "vuex";

const store = {
  state: {
    count: 0,
  },
  mutations: {
    UPDATE_COUNT(state) {
      state.count += 1;
    },
  },
};

export default createStore(store);
```

### 注册 vue 插件

```js
// index.js 入口文件
import { createApp } from "vue";
import store from "./store";
import router from "./router";
import App from "./App.vue";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
```

### vuex & router 使用示例

在`web-app/src/example/vue-app`中可以看到详细代码：

```js
// App.vue
<script>
import { reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import HelloWorld from "./components/HelloWorld.vue";

/** vuex示例 */
function vuexExample() {
  const store = useStore();
  const count = computed(() => store.state.count);
  const handleClick = () => {
    // console.log(33);
    store.commit("UPDATE_COUNT");
  };

  return { handleClick, count };
}

/** axiso 示例 */
function axiosExample() {
  const state = reactive({
    keywords: "",
    list: [],
  });
  const handleSearch = async () => {
    const value = state.keywords;
    if (value) {
      const { data: res } = await axios.get(`/api/search?keywords=${value}`);
      if (res?.result && res?.result?.songs) {
        state.list = res.result.songs || [];
      }
    } else {
      state.list = [];
    }
  };
  return {
    state,
    handleSearch,
  };
}

export default {
  name: "app",
  components: {
    HelloWorld,
  },
  setup: () => {
    const { count, handleClick } = vuexExample();
    const { state, handleSearch } = axiosExample();

    return {
      count,
      ...toRefs(state),
      handleClick,
      handleSearch,
    };
  },
};
</script>
```

## react 模版

`react`加`typescript`一起使用开发体验相当不错，所以默认模版也是以`ts`拟定的，接下来讲解下在`react`中如何使用`redux`。
`@reduxjs/toolkit`感觉是`ts`支持比较好的一个库，我们以它为例子：

### 如何使用 redux

在工程目录下创建一个`store`文件夹，存放`redux`相关文件，

- 1、创建一个`global`模块，存放全局状态。

  ```ts
  // src/store/globalSlice.ts
  import { createSlice, PayloadAction } from "@reduxjs/toolkit";
  const initialState = {
    count: 123,
  };

  const { actions, reducer } = createSlice({
    name: "global",
    initialState,
    reducers: {
      increment: (state) => {
        state.count += 1;
      },

      decrement: (state) => {
        state.count -= 1;
      },

      setCount: (state, { payload }: PayloadAction<number>) => {
        state.count = payload;
      },
    },
    extraReducers: {},
  });

  export const { increment, decrement, setCount } = actions;
  export default reducer;
  ```

- 2、创建一个`rootReducer`合并所有模块中的`reducer`:

  ```ts
  // src/store/rootReducer.ts
  import { combineReducers } from "@reduxjs/toolkit";
  import global from "./globalSlice";

  const rootReducer = combineReducers({
    global,
  });

  export default rootReducer;
  ```

- 3、创建`store`，并导出`ts`相关类型:

  ```ts
  // src/store/store.ts
  import { configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
  import rootReducer from "./rootReducer";

  export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });

  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>;
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch;

  // hot reload 根据项目需求开启
  // if (process.env.NODE_ENV === 'development' && module.hot) {
  //   module.hot.accept('./rootReducer.ts', () => {
  //     const newRootReducer = require('./rootReducer').default;
  //     store.replaceReducer(newRootReducer);
  //   });
  // }

  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;
  ```

- 4、使用`redux`：

  在入口文件中使用`Provider`组件包裹`App`组件：

  ```ts
  // index.tsx
  import React from "react";
  import ReactDOM from "react-dom";
  import { store } from "./src/app/store";
  import "./index.css";
  import { Provider } from "react-redux";

  const render = () => {
    const App = require("./src/App").default;
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("app")
    );
  };

  render();

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./src/App", render);
  }
  ```

### 能否使用其他 redux 状态库

毫无疑问当然可以，不过还是建议团队还是统一技术栈，减少学习和维护成本。

## 普通模版

### 使用“组件”

在普通项目中有时会用到相同的页面布局，例如：

<img src="/layout.jpg"  />

在`home.index`和`detail.index`两个页面中，都有相同的`header`和`footer`，在`react`和`vue`中我们很容易的会想到以组件的形式来实现上面的布局，在普通项目中改如何实现呢？

- 1、先新建一个`layout`文件夹，然后在文件夹中创建一个`header.html`:

  ```html
  <!-- layout/header.html -->
  <header>
    <h1>这是header！ 我是一个html片段</h1>
  </header>
  ```

- 2、再创建一个`footer.html`：

  ```html
  <!-- layout/footer.html -->
  <footer>
    <h4>这是footer！ 我也是一个html片段</h4>
  </footer>
  ```

- 3、在主页面`index.html`中使用：

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>
        lds-app
      </title>
    </head>
    <body>
      <!-- 插入header 片段 -->
      #include("./layout/header.html")

      <main>
        <h2>你好啊，李银河</h2>
        <button id="answer">回答</button>
      </main>

      <!-- 插入footer 片段 -->
      #include('./layout/footer.html')
    </body>
  </html>
  ```

  打开浏览器将会看到一下结果：
  <img src="/layout_result.png" />

### .html 文件中引用静态资源

在`html`文件中常常会引入`video`、`img`、`aduio`等静态资源，为此脚手架使用[`html-widthsource-loader`](https://www.npmjs.com/package/html-widthsource-loader)处理`html`在开发、打包过程中出现的路径问题。
所以在该脚手架创建的**普通模版**工程中直接使用**相对路径**引用即可，使用绝对路径的资源当然是最好不过了。

## 常见问题

### 热更新不生效？

在`vue`、`react`中，如果热更新不生效，请先尝试刷新以下页面，如果问题仍没有解决，请根据浏览器控制台日志输出，参考[模块热替换(hot module replacement)
查](https://www.webpackjs.com/api/hot-module-replacement/)配置依赖文件。

### 如何更新脚手架？

```sh
lds up upgrade
```

以上命令会自动更新脚手架至最新版本。

### 如何提出建议？

如果您在使用`lds-app-cli`过程中发现`bug`或想提交建议，请在[项目 issues](https://github.com/224137748/lds-app-cli/issues)中留言！
