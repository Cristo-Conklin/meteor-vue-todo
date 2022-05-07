<template>
    <form className="new-task" @submit.prevent="handleSubmit">
        <input className="new-task" type="text" placeholder="Type to add new tasks" v-model="newTask" />
        <button type="submit">Add Task</button>
    </form>
</template>

<script>
// import { Tasks } from "/imports/api/collections/Tasks"
import { Meteor } from 'meteor/meteor';

export default {
    data() {
        return {
            newTask: ""
        }
    },
    methods: {
        handleSubmit(event) {

            if (this.newTask.length === 0) return;

            Meteor.call('tasks.insert', this.newTask.trim());
            /*
            const user = Meteor.user()
            Tasks.insert({
                text: this.newTask,
                createdAt: new Date(), // current time
                userId: user._id
            });*/

            // Clear form
            this.newTask = "";
        }
    },
}
</script>