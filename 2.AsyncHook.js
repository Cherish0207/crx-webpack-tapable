// AsyncParallelHook异步并行钩子
// AsyncSeriesHook异步串行钩子
// let { AsyncSeriesWaterfallHook } = require("tapable");
let { AsyncSeriesWaterfallHook } = require("./2.AyncHook.tapable");
class Study {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new AsyncSeriesWaterfallHook(["name"]),
    };
  }
  // 注册监听函数
  tap() {
    // 第一个参数没有实际意义,方便开发者阅读
    this.hooks.arch.tapAsync("webpack", (name, cb) => {
      console.log(1);
      setTimeout(() => {
        console.log(name, "webpack");
        cb(null, "接下来学");
      });
    });
    this.hooks.arch.tapAsync("算法", (name, cb) => {
      setTimeout(() => {
        console.log(name, "算法");
        cb();
      }, 1000);
    });
  }
  start() {
    this.hooks.arch.callAsync("cherish", () => {
      console.log("end");
    });
  }
}
let l = new Study();
l.tap(); // 注册这两个事件
l.start(); // 启动钩子
