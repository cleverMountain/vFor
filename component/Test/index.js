import { reactive } from "../../src/reactive"



function TestA() {
  return {
    template: `
  <ul class="ul" v-for="item of list" :key="item.id">
    <li>{{ item.name }}</li>
    <li>{{ item.price }}</li>
  </ul>
`,
    data: reactive({
      list: [
        {
          name: '标题',
          price: 200
        },
        {
          name: '标题1',
          price: 2001
        }
      ],
      obj: {
        name: 1,
        price: 2
      },
      a: 1
    })
  }
}

export default TestA