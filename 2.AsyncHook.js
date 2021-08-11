// AsyncParallelHook异步并行钩子
// let { AsyncParallelHook } = require("tapable");
let { AsyncParallelHook } = require("./2.AyncHook.tapable");
class Study {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new AsyncParallelHook(["name"]),
    };
  }
  // 注册监听函数
  tap() {
    // 第一个参数没有实际意义,方便开发者阅读
    this.hooks.arch.tapPromise("webpack", (name) => {
      return new Promise((resolve, reject) => {
        console.log(name, "webpack");
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    });
    this.hooks.arch.tapPromise("算法", (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(name, "算法");
          resolve();
        }, 1000);
      });
    });
  }
  start() {
    this.hooks.arch.promise("cherish").then(() => {
      console.log("end");
    });
  }
}
let l = new Study();
l.tap(); // 注册这两个事件
l.start(); // 启动钩子
