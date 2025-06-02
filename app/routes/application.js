import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service store;

  async model() {

    const  snapshot = {
      id: '1',
      type: 'example',
      attributes: {
        name: 'Parent'
      }
    };

    const test = this.store.push({
      data: { ...snapshot },
      relationships: {
        children: {
          data: [
            { type: 'example', id: '2' },
            { type: 'example', id: '3' },
          ],
        },
      },
      included: [
        {
          id: '2',
          type: 'example',
          attributes: { name: 'Child 1' },
          relationships: { parent: { data: { type: 'example', id: '1' } } },
        },
        {
          id: '3',
          type: 'example',
          attributes: { name: 'Child 2' },
          relationships: { parent: { data: { type: 'example', id: '1' } } },
        },
      ],
    });

    console.log(test.hasMany('children').value());
    this.store.unloadRecord(test);
    console.log(test.hasMany('children').value());
  }
}
