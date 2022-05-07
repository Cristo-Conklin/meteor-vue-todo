import { Meteor } from 'meteor/meteor';
import { Tasks } from '../collections/Tasks';

Meteor.publish('tasks', function publishTasks() {
  return Tasks.find({ userId: this.userId });
});