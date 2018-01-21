require('es6-promise').polyfill();

import { mount } from 'avoriaz';
import chai from 'chai';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

import Header from '@/components/Header';

describe('Header.vue', () => {

    it('Should render correct contents with header class attributes', () => {
        const HeaderComponent = mount(Header);
        const headerDom = HeaderComponent.find('div')[0];

        expect(headerDom.hasClass('header')).to.equal(true);
    });

    it('Should add a new todo item and after that deleted text field', () => {
        const newItem = 'Todo Item01';
        const HeaderComponent = mount(Header);
        const inputField = HeaderComponent.find('input')[0];

        HeaderComponent.setData({ newItem });

        const event = sinon.spy();
        HeaderComponent.vm.$on( 'addTodo', event );

        inputField.trigger('keydown.enter');

        expect(HeaderComponent.data().newItem).to.equal('');
        expect(event.calledOnce).to.equal(true);
    })
})
