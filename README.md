# 利用真是dom模拟vue实现V-for功能

## 1. createApp创建实例,mount挂载

```js
// 创建实例
const createApp = (component) => {
  const vm = {}
  vm.component = component()
  vm.mount = mount

  initComponent(vm.component, vm)
  app = vm
  return vm
}

// 挂载
function mount(root) {
  domRoot = root
  const vm  = this,
        container = document.querySelector(root)
  container.innerHTML = vm.compilerTemplate
  document.body.appendChild(container)
}

export { createApp, app, domRoot }
```


## 2.initComponent初始化组件，每个组件都是一个函数，运行后返回组件对象
```js
export function initComponent({ template, data }, vm) {
 
  const container = document.createElement('div')
  container.innerHTML = template
  const nodes = [...container.getElementsByTagName('*')]
  // 渲染，
  render(vm, nodes, data, template)
}


function render(vm, nodes, data) {
  nodes.forEach(node => {
    const vFor = node.getAttribute('v-for')
    if (vFor) {
      let dep = vFor.split(' ')[2],
        _data = data[dep]
      node.removeAttribute('v-for')
      node.removeAttribute(':key')
      // 将模板放在vm上
      vm.compilerTemplate = getComplate(node.outerHTML, _data)

    }
  })
}

// 编译v-for，循环得到需要创建的真是dom
function getComplate(template, data) {
  let outer = ''
  if (Array.isArray(data)) {
    outer += data.reduce((pre, item) => {
      pre += compilerTemplate(template, item)
      return pre
    }, '')
  } else {
    console.log(template, data)
    for (let key in data) {

      console.log(template)
    }
  }
  // console.log(outer)
  return outer
}

// compilerTemplate将模板中的变量替换
const regex = /{{(.*?)}}/g;  // 使用非贪婪匹配
function compilerTemplate(str, obj) {
  let match = str.replace(regex, (a, b, c, d) => {
    b = b.trim().split('.')[1]
    return obj[b]
  })
  return match
}
```


## 3.使用proxy定义响应式对象
```js
const reactive = (data) => {
  if (!isObject(data)) return
  return proxyData(data)
}

export function proxyData(target) {
  return new Proxy(target, handler)
}

// getter
function get (target, key, receiver) {
  console.log('get: ' + key)
  const res = target[key]
  // 对象进行递归代理
  if (isObject(res)) {
    return proxyData(res)
  }
  return Reflect.get(target, key, receiver)
}
// setter
function set (target, key, value, receiver) {
  if (key === 'length') {
    // 更新
    update()
  }
  console.log('set: ' + key)
  return Reflect.set(target, key, value, receiver)
}

export const handler = {
  get,
  set
}
```