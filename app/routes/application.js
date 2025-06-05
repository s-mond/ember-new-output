import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service store;

  schoolData = {
    id: 's1',
    type: 'school',
    attributes: {
      name: 'School One',
    }
  }

  courseData = {
    id: '1',
    type: 'course',
    attributes: {
      name: 'Course One',
    },
    relationships: {
      school: {
        data: { type: 'school', id: 's1' },
      }
    }
  }

  lesson1Data = {
    id: 'l1',
    type: 'lesson',
    attributes: {
      name: 'Lesson One',
    },
    relationships: {
      course: {
        data: { type: 'course', id: '1' }
      }
    }
  }

  lesson2Data = {
    id: 'l2',
    type: 'lesson',
    attributes: {
      name: 'Lesson Two',
    },
    relationships: {
      course: {
        data: { type: 'course', id: '1' }
      }
    }
  }

  async model() {

    await this.store.push({ data: this.schoolData });
    let course = await this.store.push({ data: this.courseData });

    console.log(course.hasMany('lessons').value());

    await this.store.push({ data: this.lesson1Data });
    await this.store.push({ data: this.lesson2Data });

    console.log(course.hasMany('lessons').value());

    await this.store.unloadAll('lesson');
    await this.store.unloadAll('course');

    course = await this.store.push({ data: this.courseData });

    course.hasMany('lessons').value();
  }
}
