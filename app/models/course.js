import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class Course extends Model {

  @attr('string')
  name;

  @belongsTo('school', { async: false, inverse: null })
  school;

  @hasMany('lesson', { async: true, inverse: 'course' })
  lessons;
}
