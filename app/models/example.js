import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class Example extends Model {

  @attr('string')
  name;

  @belongsTo('example', { async: false, inverse: 'children' })
  parent;

  @hasMany('example', { async: false, inverse: 'parent' })
  children;
}
