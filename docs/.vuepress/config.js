module.exports = {
  title: "lds-app-cli脚手架",
  description: "前端脚手架,多页面应用",
  dest: "./dist",
  themeConfig: {
    logo: "/logo.png",
    head: [
      [
        "link",
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "https://cn.vuejs.org/images/icons/favicon-32x32.png",
        },
      ],
    ],
    sidebar: "auto",
    nav: [
      {
        text: "首页",
        link: "/"
      },
      {
        text: "文档",
        link: "/guide/"
      },
      {
        text: "Github",
        link: 'https://github.com/224137748/lds-app-cli'
      }
      // {
      //   text: "文档"
      // },
      // {
      //   text: "other"
      // }
    ],
  },
};
