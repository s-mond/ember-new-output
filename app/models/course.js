import Model, { attr, hasMany } from '@ember-data/model';

export default class Course extends Model {

  @attr('string')
  name;

  @hasMany('lesson', { async: false, inverse: 'course' })
  lessons;
}
