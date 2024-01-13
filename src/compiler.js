import { isObject } from "./utils"

export function initComponent({ template, data }, vm) {

  const container = document.createElement('div')
  container.innerHTML = template
  const nodes = [...container.getElementsByTagName('*')]


  nodes.forEach(node => {
    const vFor = node.getAttribute('v-for')
    if (vFor) {

    }
  })
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
      vm.compilerTemplate = getComplate(node.outerHTML, _data)

    }
  })
}


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


const regex = /{{(.*?)}}/g;  // 使用非贪婪匹配
function compilerTemplate(str, obj) {
  let match = str.replace(regex, (a, b, c, d) => {
    b = b.trim().split('.')[1]
    return obj[b]
  })
  return match
}
