// 同步钩子
class AsyncSeriesHook {
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
    let next = () => {
      if (this.tasks.length === index) return finalCalllback();
      let task = this.tasks[index++];
      task(...args, next);
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
module.exports = { AsyncSeriesHook };
