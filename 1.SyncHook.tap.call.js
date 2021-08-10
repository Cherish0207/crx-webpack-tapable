// let { SyncHook } = require("tapable");
let { SyncHook } = require("./1.SyncHook.tap.call.tapable");
class Study {
  constructor() {
    this.hooks = {
      arch: new SyncHook(["name"]),
    };
  }
  // 注册监听函数
  tap() {
    // 第一个参数没有实际意义,方便开发者阅读
    this.hooks.arch.tap("webpack", (name) => {
      console.log(name, "webpack");
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
