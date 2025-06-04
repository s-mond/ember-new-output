import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service store;

  courseData = {
    id: '1',
    type: 'course',
    attributes: {
      name: 'Course One',
    },
    relationships: {
      lessons: {
        data: [
          { type: 'lesson', id: 'l1' },
          { type: 'lesson', id: 'l2' }
        ]
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

    await this.store.push({ data: this.lesson1Data });
    await this.store.push({ data: this.lesson2Data });
    let course = await this.store.push({ data: this.courseData });

    // At this point on this.store._graph.identifiers we have 3 identifiers, course, lesson, lesson
    //all of those identifiers has isDirty = true state, so when we do .value() for first time instead of triggering the localState error, it sets up localState = []
    console.log(course.hasMany('lessons').value());

    //when we unload all the courses, course is removed from the this.store._graph.identifiers
    await this.store.unloadAll('course');

    //we push again the course values, so the identifier is added again with isDirty = true
    //and all the relationships are on remoteState
    course = await this.store.push({ data: this.courseData });

    //the first time we call .value() looks at the isDirty state and because is true it sets the localState with the remoteState value being the relationships or []
    // console.log(course.hasMany('lessons').value());
    // console.log(course.hasMany('lessons').value());

    // set isDirty property to false before calling .hasMany('...').value()
    for (const [ identifier, value ] of this.store._graph.identifiers) {
      if (identifier?.type === 'course') {
        value.lessons.isDirty = false;
      }
    }

    //triggers the error
    course.hasMany('lessons').value();

    //in our application when we do .unloadAll('some model') it doesnt remove the identifier from the graph
    //that causes the identifier be always isDirty = false
    //so when we load again the information we ended up skipping that step of setting the localState with the remoteState data
    //and that triggers the error: Expected localState to be present
  }
}
