## 1. webpack 的插件机制

> 介绍 webpack 内置插件与钩子可视化工具之前，先了解一下 webpack 中的插件机制。

webpack 实现插件机制的大体方式是：

- 创建 - webpack 在其内部对象上创建各种钩子；
- 注册 - 插件将自己的方法注册到对应钩子上，交给 webpack；
- 调用 - webpack 编译过程中，会适时地触发相应钩子，因此也就触发了插件的方法。

Webpack 本质是一种事件流机制，它的工作流程就是将各个插件串联起来\
而实现这一切的核心就是 Tapable (使用 Tapable 来维护各种插件)\
webpack 中最核心的负责编译的 Compiler 和负责创建 bundle 的 Compilation 都是 Tapable 的实例 \
Tapable 依赖事件流机制,通过事件、注册、监听, 触发 webpack 生命周期中的函数方法.\
Tapable 有点类似于 nodejs 的 events 库,核心原理也是依赖于发布订阅模式。

`主核心模块node_modules/webpack/lib/Compiler.js`
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30efb652a35848eaa106e3f9a4a2d399~tplv-k3u1fbpfcp-watermark.image)

## 2. tapable 分类

### 2.1 按同步异步分类

Hook 类型可以分为同步`Sync`和异步`Async`，异步又分为`并行`和`串行`
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f7d944c5f6642e59a03fbc0a17d6c7a~tplv-k3u1fbpfcp-watermark.image)

- 异步:同时发送多个请求\
  异步的钩子分为两种:
  - 串行:
  - 并行:需要等待所有并发的异步事件执行后在执行回调方法(并行性能更好)

```
tapable 库有
  三种注册方法
    - tap 同步注册,
    - tapAsync 异步注册,cb
    - tapPromise 注册是 promise
  三种调用方法
    - call
    - callAsync
    - promise
```

### 2.2 按返回值分类
- Basic: 执行每一个事件函数，不关心函数的返回值,有 SyncHook、AsyncParallelHook、AsyncSeriesHook
-  Bail: 执行每一个事件函数，遇到第一个结果 result !== undefined 则返回，不再继续执行。有：SyncBailHook、AsyncSeriesBailHook, AsyncParallelBailHook
- Waterfall: 如果前一个事件函数的结果 result !== undefined,则 result 会作为后一个事件函数的第一个参数,有SyncWaterfallHook，AsyncSeriesWaterfallHook
- Loop: 不停的循环执行事件函数，直到所有函数结果 result === undefined,有SyncLoopHook 和 AsyncSeriesLoopHook

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fa281601bae4bfd8742ae5af4e38f19~tplv-k3u1fbpfcp-watermark.image)

![按返回值分类.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da5bdd22b607437b9ebf8a81ce218801~tplv-k3u1fbpfcp-watermark.image)
