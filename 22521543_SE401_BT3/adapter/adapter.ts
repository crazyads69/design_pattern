// Define Course interface
interface Course {
  start(): void;
  getDetails(): string;
}

// Define InPersonCourse class that implements Course interface
class InPersonCourse implements Course {
  start(): void {
    console.log("InPersonCourse started");
  }

  getDetails(): string {
    return "InPersonCourse";
  }

  attendClass(): void {
    console.log("Attending class in person");
  }

  getSchedule(): string {
    return "InPersonCourse schedule";
  }
}

// Define OnlineCourse class that not implements Course interface to use adapter
class OnlineCourse {
  joinSession(): void {
    console.log("Joining online session");
  }

  viewTimetable(): string {
    return "OnlineCourse timetable";
  }
}

// Define SelfStudyCourse class that not implements Course interface to use adapter
class SelfStudyCourse {
  accessCourseMaterial(): void {
    console.log("Accessing course material");
  }

  getDeadline(): string {
    return "SelfStudyCourse deadline";
  }
}

// Define Adapter class that implements Course interface
class OnlineCourseAdapter implements Course {
  private onlineCourse: OnlineCourse;

  constructor(onlineCourse: OnlineCourse) {
    this.onlineCourse = onlineCourse;
  }

  start(): void {
    this.onlineCourse.joinSession();
  }

  getDetails(): string {
    return "OnlineCourse";
  }
}

// Define Adapter class that implements Course interface
class SelfStudyCourseAdapter implements Course {
  private selfStudyCourse: SelfStudyCourse;

  constructor(selfStudyCourse: SelfStudyCourse) {
    this.selfStudyCourse = selfStudyCourse;
  }

  start(): void {
    this.selfStudyCourse.accessCourseMaterial();
  }

  getDetails(): string {
    return "SelfStudyCourse";
  }
}

// Client class that uses Course interface
class Client {
  useCourse(course: Course): void {
    course.start();
    console.log(course.getDetails());
  }

  main(): void {
    // Using InPersonCourse
    const inPersonCourse = new InPersonCourse();
    console.log("Using InPersonCourse:");
    this.useCourse(inPersonCourse);
    console.log("Additional InPersonCourse methods:");
    inPersonCourse.attendClass();
    console.log(inPersonCourse.getSchedule());
    console.log();

    // Using OnlineCourse with adapter
    const onlineCourse = new OnlineCourse();
    const onlineCourseAdapter = new OnlineCourseAdapter(onlineCourse);
    console.log("Using OnlineCourse through adapter:");
    this.useCourse(onlineCourseAdapter);
    console.log("Direct access to OnlineCourse method:");
    console.log(onlineCourse.viewTimetable());
    console.log();

    // Using SelfStudyCourse with adapter
    const selfStudyCourse = new SelfStudyCourse();
    const selfStudyCourseAdapter = new SelfStudyCourseAdapter(selfStudyCourse);
    console.log("Using SelfStudyCourse through adapter:");
    this.useCourse(selfStudyCourseAdapter);
    console.log("Direct access to SelfStudyCourse method:");
    console.log(selfStudyCourse.getDeadline());
  }
}

// Run the client
const client = new Client();
client.main();
