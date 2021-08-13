// 同步钩子
// AsyncSeriesWaterfallHook 异步串行瀑布
class AsyncSeriesWaterfallHook {
  constructor(args) {
    // args: ['name']
    this.tasks = [];
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  callAsync(...args) {
    let finalCalllback = args.pop(); // 取最后一个回调函数参数
    let index = 0;
    let next = (err, data) => {
      let task = this.tasks[index];
      if (!task) return finalCalllback();
      if (index === 0) {
        task(...args, next);
      } else {
        task(data, next);
      }
      index++;
    };
    next();
  }
  promise(...args) {
    let [first, ...others] = this.tasks;
    others.reduce((p, n) => {
      return p.then(() => n(...args));
    }, first(...args));
    return Promise.all(this.tasks.map((task) => task(...args)));
  }
}
module.exports = { AsyncSeriesWaterfallHook };
