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
