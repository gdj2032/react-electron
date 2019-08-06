import React, { useState, useEffect } from 'react';
import { reduxStore } from 'utils/visible';
import { updateAccount } from 'actions/setting';

const HookDemo = () => {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);
  //Effect Hook 可以让你在函数组件中执行副作用操作
  //可以看做componentDidMount，componentDidUpdate 和 componentWillUnmount三个函数的组合
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
    reduxStore.dispatch(updateAccount({ count }));
  }, [count]);// 仅在 count 更改时更新=> 性能的优化

  //如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。
  //这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = 'useEffect';
  }, []);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        HookDemo Click me
      </button>
    </div>
  );
}

export {
  HookDemo
};