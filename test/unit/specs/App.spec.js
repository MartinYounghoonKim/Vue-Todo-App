import Vue from 'vue';
import Vuex from 'vuex';

import { mount } from 'avoriaz';
import sinon from 'sinon';
import axios from 'axios';
import App from '@/App';
import mutations from '@/store/mutations';
import getters from '@/store/getters';
import state from '@/store/states.js';

Vue.use(Vuex);

describe('App.vue', () => {
    let store, actions;
    beforeEach(() => {
        actions = {
            getTodoList: sinon.stub(),
            setCurrentLocation: sinon.stub()
        };
        const states = state;
        store = new Vuex.Store({
            state: states,
            getters,
            actions
        });
    });

    it('Should render correct contents', () => {
        const AppComponent = mount(App, { store });

        expect(AppComponent.isVueComponent).to.equal(true);
    });

    it('Should get correct data for todo app', () => {
        const mockData01 = {
            todos: [{
                id: "223362f9637d2895",
                isDone: true,
                todo: "Todo01"
            }, {
                id: "fd099c2132a22a42",
                isDone: true,
                todo: "Todo02"
            }],
            location: '/all'
        };
        const mockData02 = {
            todos: [{
                id: "223362f9637d2895",
                isDone: true,
                todo: "Todo01"
            }, {
                id: "fd099c2132a22a42",
                isDone: false,
                todo: "Todo02"
            }],
            location: '/active'
        };
        const mockData03 = {
            todos: [{
                id: "223362f9637d2895",
                isDone: true,
                todo: "Todo01"
            }, {
                id: "fd099c2132a22a42",
                isDone: true,
                todo: "Todo02"
            }, {
                id: "b575383156ca3a00",
                isDone: false,
                todo: "Todo02"
            }],
            location: '/completed'
        };
        const result01 = getters.getTodoList(mockData01);
        const result02 = getters.getTodoList(mockData02);
        const result03 = getters.getTodoList(mockData03);

        expect(result01.length).to.equal(2);
        expect(result02.length).to.equal(1);
        expect(result03.length).to.equal(2);
    })
})
