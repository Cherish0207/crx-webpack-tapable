// bail,保险,写同步时加上一层保险(熔断性),前面事件注册时决定是否向下执行
// let { SyncBailHook } = require("tapable");
let { SyncBailHook } = require("./1.SyncHook.tap.call.tapable");
class Study {
  constructor() {
    this.hooks = {
      arch: new SyncBailHook(["name"]),
    };
  }
  // 注册监听函数
  tap() {
    // 第一个参数没有实际意义,方便开发者阅读
    this.hooks.arch.tap("webpack", (name) => {
      console.log(name, "webpack");
      // return undefined; // 继续往下执行
      return 'stop learning'
    });
    this.hooks.arch.tap("算法", (name) => {
      console.log(name, "算法");
    });
  }
  start() {
    this.hooks.arch.call("cherish");
  }
}
let l = new Study();
l.tap(); // 注册这两个事件
l.start(); // 启动钩子
