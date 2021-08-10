// 同步钩子
class SyncLoopHook {
  constructor(args) {
    // args: ['name']
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    this.tasks.forEach((task) => {
      let ret;
      do {
        ret = task(...args);
      } while (ret !== undefined);
    });
  }
}
module.exports = { SyncLoopHook };
