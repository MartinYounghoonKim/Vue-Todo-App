import { mount } from 'avoriaz';

import Vue from 'vue';
import Header from '@/components/Header';

describe('Header.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Header);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.header h1').textContent)
    .to.equal('Vue Test')
  })
  it('adds a new todo item to list on enter', () => {
    const HeaderComponent = mount(Header);

    HeaderComponent.setData({
      newItem: 'test3'
    });

    const input = HeaderComponent.find('input')[0];
    input.trigger('keydown');

    expect(HeaderComponent.data().items).to.contain('test3');
  })
})
