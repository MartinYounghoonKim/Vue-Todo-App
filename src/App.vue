<template>
    <div id="app">
        <div class="image-wrapper">
            <img src="./assets/logo.png">
        </div>
        <div class="todoapp">
            <app-header
                @addTodo="addTodo"
            />
            <todo-list
                :todos="todoList"
                @deleteTodo="deleteTodo"
                @completedTodo="completedTodo"
                @editTodo="editTodo"
                :currentLocation="currentLocation"
                @toggleAllTodo="toggleAllTodo"
            />
            <app-footer
                :todoFilters="todoFilters"
                :currentLocation="currentLocation"
                @changeLocation="changeLocation"
            />
        </div>
    </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    import AppHeader from './components/Header.vue';
    import AppFooter from './components/Footer.vue';
    import TodoList from './components/TodoList.vue';
    import TODO from './constant/mutation-type';

    export default {
        name: 'app',
        data() {
            return {
                currentLocation: window.location.pathname,
                todoFilters: ['/all', '/active', '/completed']
            }
        },
        watch: {
            currentLocation() {
                this.setCurrentLocation(this.currentLocation);
            }
        },
        computed: {
            ...mapGetters({
                todoList: 'getTodoList'
            })
        },
        created() {
            this.getTodoList();
            this.setCurrentLocation(this.currentLocation);
        },
        methods: {
            addTodo(userValue) {
                this.$store.dispatch('addTodo', userValue)
            },
            editTodo(id, editedTodo) {
                this.$store.dispatch('editTodo', {id, editedTodo});
            },
            deleteTodo(targetKey) {
                this.$store.dispatch('deleteTodo', targetKey);
            },
            completedTodo(checked, id) {
                const isDone = checked;

                this.$store.dispatch('completeTodo', {isDone, id});
            },
            toggleAllTodo() {
                this.$store.dispatch('completeAllTodos');
            },
            changeLocation(currentLocation) {
                if (currentLocation.length < 0) return false;
                this.currentLocation = currentLocation;

                window.history.pushState(
                    null,
                    '',
                    this.currentLocation
                )
            },
            ...mapActions({
                getTodoList: 'getTodoList',
                setCurrentLocation: 'setCurrentLocation'
            })
        },
        components: {
            AppHeader,
            AppFooter,
            TodoList
        }
    }
</script>

<style>

    body {
        margin: 0;
        padding: 0;
    }

    button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        font-size: 100%;
        vertical-align: baseline;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        -webkit-appearance: none;
        appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
    }

    body {
        font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 1.4em;
        background: #f5f5f5;
        color: #4d4d4d;
        min-width: 230px;
        max-width: 550px;
        margin: 0 auto;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
        font-weight: 300;
    }

    button,
    input[type="checkbox"] {
        outline: none;
    }

    .hidden {
        display: none;
    }

    .image-wrapper {
        text-align: center;
    }

    .todoapp {
        background: #fff;
        margin: 130px 0 40px 0;
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
        0 25px 50px 0 rgba(0, 0, 0, 0.1);
    }

    label {
        margin: 0;
        padding: 0;
    }
</style>
