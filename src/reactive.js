import { handler } from "./handler"
import { isObject } from "./utils"

const reactive = (data) => {
  if (!isObject(data)) return
  return proxyData(data)
}

export function proxyData(target) {

  return new Proxy(target, handler)
}

export { reactive }