import { mount } from 'avoriaz';
import App from '@/components/Todo.vue';

describe('Todo.vue', () => {
    it('Should render correct todo item', () => {
        const todo = {
            id: "223362f9637d2895",
            isDone: true,
            todo: "Todo01"
        };
        const TodoComponent = mount(App, { propsData: { todo }});
        const textElement = TodoComponent.find('label')[0];

        expect(textElement.text()).to.equal(todo.todo);
    });
})
