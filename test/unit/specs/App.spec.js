import { mount, shallow } from 'avoriaz';

import Vue from 'vue';
import Vuex from 'vuex';
import App from '@/App';
import Header from '@/components/Header';

describe('App.vue', () => {
  it('Should render correct contents', () => {
    const AppComponent = mount(App);
    expect(AppComponent.isVueComponent).to.equal(true);
  })
})