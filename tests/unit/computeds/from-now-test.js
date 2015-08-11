import Ember from 'ember';
import moment from 'moment';
import momentFromNow from 'ember-moment/computeds/from-now';

module('agoComputed', {
  setup() {
    moment.locale('en');
  }
});

function createSubject(attrs) {
  return Ember.Object.extend(Ember.$.extend({
    date: new Date(new Date().valueOf() - (60*60*1000)),
    ago: momentFromNow('date')
  }, attrs || {})).create();
}

test('Formatter - get', (assert) => {
  assert.expect(1);
  const subject = createSubject();
  assert.equal(subject.get('ago'), 'an hour ago');
});

test('Formatter - get #2', (assert) => {
  assert.expect(2);
  const subject = createSubject();
  assert.equal(subject.get('ago'), 'an hour ago');
  subject.set('date', new Date(new Date().valueOf() - (60*60*2000)));
  assert.equal(subject.get('ago'), '2 hours ago');
});
