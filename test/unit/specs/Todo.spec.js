import { mount } from 'avoriaz';
import App from '@/components/Todo.vue';

describe('Todo.vue', () => {
    const todo = {
        id: "223362f9637d2895",
        isDone: true,
        todo: "Todo01"
    };
    const TodoComponent = mount(App, { propsData: { todo }});
    it('Should render correct todo item', () => {
        const textElement = TodoComponent.find('label')[0];

        expect(textElement.text()).to.equal(todo.todo);
    });
    describe('Delete todo item function', () => {
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
    describe('Edit todo item function', () => {
        it('Should starting to edit todo item', () => {
            const labelElement = TodoComponent.find('label')[0];
            const event = sinon.spy();

            TodoComponent.vm.$on( 'startEdit', event );
            labelElement.trigger('dblclick');

            expect(event.calledOnce).to.equal(true);
            console.log(TodoComponent.vm.$refs.editInput)
        })
    });
});
