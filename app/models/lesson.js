import Model, { attr, belongsTo } from '@ember-data/model';

export default class Lesson extends Model {

  @attr('string')
  name;

  @belongsTo('course', { async: false, inverse: 'lessons' })
  course;
}
