import { Course } from '../models/Course';

export const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Angular',
    description:
      'Angular is a TypeScript-based open-source front-end web framework led by the Angular Team at Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS.',
    beginDate: new Date('2022-01-01'),
    endDate: new Date('2022-12-31'),
    teacherId: 1,
    isActive: true,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 2,
    title: 'React',
    description:
      'React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.',
    beginDate: new Date('2022-01-01'),
    endDate: new Date('2022-12-31'),
    teacherId: 2,
    isActive: true,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 3,
    title: 'Vue',
    description:
      'Vue (pronounced /vjuː/, like view) is a progressive JavaScript framework for building user interfaces. It is open source and is maintained by Evan You.',
    beginDate: new Date('2022-01-01'),
    endDate: new Date('2022-12-31'),
    teacherId: 3,
    isActive: true,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 4,
    title: 'NestJS',
    description:
      'Nest is a progressive Node.js framework for building efficient, scalable server-side applications. It provides a complete solution for building web, mobile, and even IoT applications.',
    beginDate: new Date('2022-01-01'),
    endDate: new Date('2022-12-31'),
    teacherId: 4,
    isActive: true,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 6,
    title: 'NodeJS',
    description:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.",
    beginDate: new Date('2022-01-01'),
    endDate: new Date('2022-12-31'),
    teacherId: 5,
    isActive: true,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
];
