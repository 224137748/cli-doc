# 指南

## 介绍
  脚手架通常是为了解决实际开发、生产遇到的 **重复** 且比较繁琐的工作而抽象出来的工具，假如我们的团队在工作中会遇到以下场景：
- 我们团队有10个开发成员，每个项目时都是由一个独立的`Gatlab`仓库托管，如果部门想分析团队、个人季度（年）开发了多少项目，或者根据项目类型，分析需求占比，这时则需要开发者统计项目数据，有点繁琐。（简而言之就是想确定你有没有摸鱼~！）

- 老板安排了个新需求，我想使用`Vue`或者`React`开发，但是用`vue-cli`和`create-react-app`配置基本环境，`redux`、`router`,`proxy`和`reset.css`就会花掉小半个小时，项目打包上线还要配置`publicPath`，又要做开发又要做运维，如果我只写一个项目配置文件，既适用于`Vue`有适用于`React`那就好了。

- 老板又安排了个新需求，静态页面较多，有`seo`要求，`SPA`就不适用了，用`SSR`的话感觉有点小题大做了，那就用`jquery`梭哈吧。但是用`jquery`又不能**支持热更新，不支持”组件“**，开发效率好低啊，嗯~？！要不用`nuxt`或者`next`打包成静态页面？ no！ 我不想学新框架，我就想用`jquery`，难不成自己搭个`webpack`或者`gulp`架子？

- ok，项目开发完成了，`npm run build`，静态资源上传`cdn`，`copy`页面内容提交给后端发布。有点繁琐，欸~！我们都用一个仓库管理代码，`git`提交代码后，`npm run build `让服务器帮我们打包指定项目，静态资源让服务器传`cdn`，这样可以吗？



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
下面将会帮助你从头创建一个项目。

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


## 使用

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

脚手架会在`c:\project`目录下自动创建一个`web-app`文件夹，并初始化项目配置，安装响应的依赖文件。如果安装依赖过程时间比较久，可以自行进入项目路径安装依赖。项目文件结构如下：

<img src="/directory.png"  />

- `.vscode`： vscode编辑器响应配置文件，`pretter`、`eslint相关`。
- `build`： 打包输入目录。
- `developer`： 开发者记录文件夹。
- `src`： 工程文件夹，新创建的工程存放在该目录下。




### 3、创建工程
开发者创建项目时，脚手架提供了`vue`、`ract`和普通项目三种模板供选择，每种模板使用。

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
- 设置描述，将生成`<meta name="description" content="618，活动"> `标签。

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


## 开发

### 1、启动工程

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

### 2、查看项目

在项目已经运行成功的条件下，浏览器打开`http://localhost:3000`会展示开发成员列表：
<img src="/start_step3.png" />

点击`张富贵`进入其所开发的项目列表页，方便查找项目。

<img src="/start_step4.png" />

点击`清明节踏春demo`便可跳转到我们开发的页面。

## 模板

### 配置文件
所有初始化的工程目录中`config.js`为工程的配置文件，`index.js`为入口文件，

### vue模板

