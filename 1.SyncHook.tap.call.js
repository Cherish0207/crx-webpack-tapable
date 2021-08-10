// bail,保险,写同步时加上一层保险(熔断性),前面事件注册时决定是否向下执行
// Waterfall,瀑布,如果同步有关联,可以把上一步的结果往后抛,实现流程控制
// let { SyncWaterfallHook } = require("tapable");
let { SyncWaterfallHook } = require("./1.SyncHook.tap.call.tapable");
class Study {
  constructor() {
    this.hooks = {
      arch: new SyncWaterfallHook(["name"]),
    };
  }
  // 注册监听函数
  tap() {
    // 第一个参数没有实际意义,方便开发者阅读
    this.hooks.arch.tap("webpack", (name) => {
      console.log(name, "webpack");
      return 'webpack ok'
    });
    this.hooks.arch.tap("算法", (data) => {
      console.log(data);
      return "算法 ok";
    });
    this.hooks.arch.tap("node", (data) => {
      console.log(data);
    });
  }
  start() {
    this.hooks.arch.call("cherish");
  }
}
let l = new Study();
l.tap(); // 注册这两个事件
l.start(); // 启动钩子
