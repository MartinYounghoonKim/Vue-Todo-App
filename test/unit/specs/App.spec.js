import { mount } from 'avoriaz';

import Vue from 'vue';
import App from '@/App';

describe('App.vue', () => {
  it('Should render correct contents', () => {
    const AppComponent = mount(App);
    expect(AppComponent.isVueComponent).to.equal(true);
  })
})