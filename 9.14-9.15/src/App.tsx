import React from 'react';
const App = () => {
  const courseName = "Half Stack application development";

  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

  interface CourseDescriptionBase extends CoursePartBase {
    description: string;
  }

  interface CourseNormalPart extends CourseDescriptionBase {
    type: "normal";
  }

  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CourseDescriptionBase {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseSpecialPart extends CourseDescriptionBase {
    type: "special";
    requirements: string[];
  }

  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;


  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    }
  ]

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const Part = ({ course }: { course: CoursePart }) => {
    switch (course.type) {
      case "normal":
        return (
          <div>
            <p><b>{course.name} {course.exerciseCount}</b> <br /><i>{course.description}</i></p>
          </div>
        )
      case "groupProject":
        return (
          <div>
            <p><b>{course.name} {course.exerciseCount}</b> <br /> project exercises {course.exerciseCount}</p>
          </div>
        )
      case "submission":
        return (
          <div>
            <p><b>{course.name} {course.exerciseCount}</b> <br /><i>{course.description}</i> <br /> submit to {course.exerciseSubmissionLink}</p>
          </div>
        )
      case "special":
        return (
          <div>
            <p><b>{course.name} {course.exerciseCount}</b> <br /> <i>{course.description}</i> <br />required skills: {course.requirements}</p>
          </div>
        )

      default:
        return assertNever(course);
    }
  };

  const Header = ({ name }: { name: string }) => (
    <h1>{name}</h1>
  );

  const Content = ({ parts }: { parts: CoursePart[] }) => (
    <div>
      {parts.map(part => <Part key={part.name} course={part} />)}
    </div>
  );

  const Total = ({ parts }: { parts: CoursePart[] }) => (
    <div>
      <p>
        Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;