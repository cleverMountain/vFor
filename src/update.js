import { app, domRoot } from ".";
import { initComponent } from "./compiler";

export function update () {
  initComponent(app.component, app)
  app.mount(domRoot)
}