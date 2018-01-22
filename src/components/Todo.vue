<template>
    <li :class="{ completed:todo.isDone, editing:this.isEditing == this.todo.id, todo }">
        <div class="view">
            <input
                type="checkbox"
                class="toggle"
                v-model="todo.isDone"
            >
            <label @dblclick="startEdit">{{ todo.todo }}</label>
            <button
                class="destroy"
                @click="deleteTodo"
            ></button>
        </div>
        <input
            ref="editInput"
            type="text"
            class="edit"
            :value="this.todo.todo"
            @blur="finishEdit"
            @keyup.13="finishEdit"
        />
    </li>
</template>
<script>
    export default {
        name: 'Todo',
        props: {
            todo: Object,
            isEditing: String,
        },
        methods: {
            deleteTodo() {
                this.$emit('deleteTodo', this.todo.id);
            },
            startEdit() {
                this.$emit('startEdit', this.todo.id);
                setTimeout(() => this.$refs.editInput.focus());
            },
            finishEdit(e) {
                const editedText = e.target.value;
                this.$emit('finishEdit', this.todo.id, editedText);
            }
        }
    }
</script>
<style scoped>
    .todo-list li {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;
    }

    .todo-list li:last-child {
        border-bottom: none;
    }

    .todo-list li.editing {
        border-bottom: none;
        padding: 0;
    }

    .todo-list li.editing .view {
        display: none;
    }

    .todo-list li .edit {
        display: none;
    }

    .todo-list li.editing .edit{
        display: block;
        width: 506px;
        padding: 13px 17px 12px 17px;
        margin: 0 0 0 43px;
    }

    .todo-list li:last-child {
        margin-bottom: -1px;
    }

    .todo-list li.completed label {
        color: #d9d9d9;
        text-decoration: line-through;
    }

    .todo-list li label {
        white-space: pre-line;
        word-break: break-all;
        padding: 15px 60px 15px 15px;
        margin-left: 45px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
    }

    .todo-list li .destroy {
        display: none;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
    }

    .todo-list li .destroy:hover {
        color: #af5b5e;
    }

    .todo-list li .destroy:after {
        content: '×';
    }

    .todo-list li:hover .destroy {
        display: block;
    }

    .todo-list li .edit {
        display: none;
        position: relative;
        margin: 0;
        width: 506px;
        padding: 13px 17px 12px 17px;
        margin: 0 0 0 43px;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
    }

    .todo-list li .toggle {
        text-align: center;
        width: 40px;
        /* auto, since non-WebKit browsers doesn't support input styling */
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none; /* Mobile Safari */
        -webkit-appearance: none;
        appearance: none;
    }

    .todo-list li .toggle:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
    }

    .todo-list li .toggle:checked:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
    }
</style>
