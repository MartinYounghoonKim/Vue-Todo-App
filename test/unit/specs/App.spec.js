import { mount } from 'avoriaz';

import Vue from 'vue';
import App from '@/App';

describe('App.vue', () => {
  const AppComponent = mount(App);
  it('Should render correct contents', () => {
    expect(AppComponent.isVueComponent).to.equal(true);
  });
})
