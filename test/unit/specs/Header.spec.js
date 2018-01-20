require('es6-promise').polyfill();

import { mount } from 'avoriaz';

import Header from '@/components/Header';

describe('Header.vue', () => {

    it('Should render correct contents with header class attributes', () => {
        const HeaderComponent = mount(Header);
        const headerDom = HeaderComponent.find('div')[0];

        expect(headerDom.hasClass('header')).to.equal(true);
    });
    it('Adds a new todo item to list on enter', () => {
        const HeaderComponent = mount(Header);
        const clickEvent = new window.Event('click');

        HeaderComponent.setData({
            newItem: 'test3'
        });

        const input = HeaderComponent.find('input')[0];
        input.trigger('keydown.enter');

        expect(HeaderComponent.data().items).to.contain('test3');
    });
})
