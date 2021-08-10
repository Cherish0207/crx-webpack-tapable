// 同步钩子
class SyncBailHook {
  constructor(args) {
    // args: ['name']
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    let index = 0,
      ret;
    do {
      ret = this.tasks[index++](...args);
    } while (ret === undefined && index < this.tasks.length);
  }
}
module.exports = { SyncBailHook };
