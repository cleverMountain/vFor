import { initComponent } from "./compiler"

let app
let domRoot
const createApp = (component) => {
  const vm = {}
  vm.component = component()
  vm.mount = mount

  initComponent(vm.component, vm)
  app = vm
  return vm
}

function mount(root) {
  domRoot = root
  const vm  = this,
        container = document.querySelector(root)
  container.innerHTML = vm.compilerTemplate
  document.body.appendChild(container)
}

export { createApp, app, domRoot }