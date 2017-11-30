<template>
<div>
    <footer class="footer">
        <span class="todo-count">
            <strong>{{ getTodosCounter }}</strong> {{itemText}} left
        </span> 
        <ul class="filters">
            <li v-for="filter in this.todoFilters">
                <a 
                    :href="filter" 
                    :todoFilters="todoFilters" 
                    :class="[filter == currentLocation ? 'selected' : '']"
                    @click="changeLocation" 
                >
                    {{filter.replace("/","").substring(0,1).toUpperCase() + filter.replace("/","").substring(1).toLowerCase()}}
                </a>
            </li>
        </ul> 
        <button class="clear-completed" style="display: none;">Clear completed </button>
    </footer>
</div>
</template>
<script>
import { mapGetters } from 'vuex';

export default{
    name: 'Footer',
    props: {
        todoFilters: Array,
        currentLocation: String,
        leftItems: Number
    },
    computed: {
        ...mapGetters([
            'getTodosCounter'
        ]),
        itemText () {
            return this.leftItems > 1 ? 'items' : 'item'
        }
    },
    methods: {
       changeLocation (e) {
           e.preventDefault();
           this.$emit('changeLocation', e.target.pathname)
       }
    }
}
</script>
<style scoped>

.footer {
	color: #777;
	padding: 10px 15px;
	height: 20px;
	text-align: center;
	border-top: 1px solid #e6e6e6;
}
.footer .todo-count {
    float: left;
    text-align: left;
}
.footer .todo-count strong {
    font-weight: 300;
}
.footer .filters {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
}
.footer .filters li {
    display: inline;
}
.footer .filters li a {
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
}
.footer .filters li a.selected{
    border-color: rgba(175, 47, 47, 0.2);
}
.footer .filters li a:hover{
    border-color: rgba(175, 47, 47, 0.1);
}
.footer .clear-completed {
    float: right;
    position: relative;
    line-height: 20px;
    text-decoration: none;
    cursor: pointer;
    position: relative;
    
}
.footer .clear-completed:hover{
    text-decoration: underline;
}
.footer .clear-completed:before{
    content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 50px;
        overflow: hidden;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
                    0 8px 0 -3px #f6f6f6,
                    0 9px 1px -3px rgba(0, 0, 0, 0.2),
                    0 16px 0 -6px #f6f6f6,
                    0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

@media screen and (-webkit-min-device-pixel-ratio:0) {
	.toggle-all,
	.todo-list li .toggle {
		background: none;
	}

	.todo-list li .toggle {
		height: 40px;
	}

	.toggle-all {
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
		-webkit-appearance: none;
		appearance: none;
	}
}

@media (max-width: 430px) {
	.footer {
		height: 50px;
	}

	.filters {
		bottom: 10px;
	}
}

</style>