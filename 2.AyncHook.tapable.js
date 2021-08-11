// 同步钩子
class AsyncParallelHook {
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
    let done = () => {
      // Promise.all
      index++;
      if (index === this.tasks.length) {
        finalCalllback();
      }
    };
    this.tasks.forEach((task) => {
      task(...args, done);
    });
  }
  promise(...args) {
    return Promise.all(this.tasks.map((task) => task(...args)));
  }
}
module.exports = { AsyncParallelHook };
