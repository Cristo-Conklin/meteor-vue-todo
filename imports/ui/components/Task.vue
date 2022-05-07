<template>
    <li v-bind:class="taskClassName">
        <input type="checkbox" readOnly v-bind:checked="!!this.task.isChecked" @click="toggleChecked" />
        <span class="text">{{ this.task.text }}</span>
        <button class="delete" @click="deleteThisTask">
            ×
        </button>
    </li>
</template>

<script>
// import { Tasks } from "/imports/api/collections/Tasks"
import { Meteor } from 'meteor/meteor';

export default {
    props: ["task"],
    data() {
        return {};
    },
    computed: {
        taskClassName: function () {
            return this.task.checked ? "checked" : "";
        }
    },
    methods: {
        toggleChecked() {
            // Set the checked property to the opposite of its current value
            /* Tasks.update(this.task._id, {
                $set: { checked: !this.task.checked }
            });*/
            Meteor.call('tasks.setIsChecked', this.task._id, !this.task.isChecked);
        },
        deleteThisTask() {
            // Tasks.remove(this.task._id);
            Meteor.call('tasks.remove', this.task._id);
        }
    }
};

</script>