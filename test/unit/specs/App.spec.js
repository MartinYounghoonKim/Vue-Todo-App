import Vue from 'vue';
import Vuex from 'vuex';

import { mount } from 'avoriaz';
import sinon from 'sinon';
import axios from 'axios';
import App from '@/App';
import mutations from '@/store/mutations';

Vue.use(Vuex);

describe('App.vue', () => {
    let actions;
    let store;

    it('Should render correct contents', () => {
        // const AppComponent = mount(App, { store });
        // expect(AppComponent.isVueComponent).to.equal(true);
    });

    it('Should get correct data for todo app', () => {

    })
})
