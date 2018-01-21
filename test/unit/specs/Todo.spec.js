import { mount } from 'avoriaz';
import App from '@/components/Todo.vue';

describe('Todo.vue', () => {
    const todo = {
        id: "223362f9637d2895",
        isDone: true,
        todo: "Todo01"
    };
    it('Should render correct todo item', () => {
        const TodoComponent = mount(App, { propsData: { todo }});
        const textElement = TodoComponent.find('label')[0];

        expect(textElement.text()).to.equal(todo.todo);
    });
    describe('Delete todo item function', () => {
        const TodoComponent = mount(App, { propsData: { todo }});
        const deleteButtonElement = TodoComponent.find('.destroy')[0];

        it('Should deleted todo item', () => {
            TodoComponent.vm.$on( 'deleteTodo', (todoId) => {
                expect(todoId).to.equal(todo.id);
            });
        });
        it('Should occur event bus', () => {
            const event = sinon.spy();
            TodoComponent.vm.$on( 'deleteTodo', event );
            deleteButtonElement.trigger('click');

            expect(event.calledOnce).to.equal(true);
        });
    });
});
