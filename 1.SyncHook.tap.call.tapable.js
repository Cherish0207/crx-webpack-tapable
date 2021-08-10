// 同步钩子
class SyncWaterfallHook {
  constructor(args) {
    // args: ['name']
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    const [first, ...others] = this.tasks;
    let ret = first(...args);
    others.reduce((a, b) => b(a), ret);
  }
}
module.exports = { SyncWaterfallHook };
