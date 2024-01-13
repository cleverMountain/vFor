import { proxyData } from "./reactive"
import { update } from "./update"
import { isObject } from "./utils"

function get (target, key, receiver) {

  console.log('get: ' + key)
  const res = target[key]
  // 对象进行递归代理
  if (isObject(res)) {
    return proxyData(res)
  }
  return Reflect.get(target, key, receiver)
}

function set (target, key, value, receiver) {
  if (key === 'length') {
    update()
  }
  console.log('set: ' + key)
  return Reflect.set(target, key, value, receiver)
}

export const handler = {
  get,
  set
}