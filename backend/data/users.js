// download bcrypt for crypt password
import bcrypt from 'bcryptjs';

const users = [
  {
    cin: '00000000',
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
  },
  {
    cin: '00000001',
    name: 'John Doe',
    email: 'john@email.com',
    class: "DSI22",
    subjects:["math","database"],
    password: bcrypt.hashSync('123456', 10),
    role: 'student',
  },
  {
    cin: '00000002',
    name: 'Jane Doe',
    email: 'jane@email.com',
    class:'DSI21',
    subjects:['sport', 'program', 'math', 'physique', 'database'],
    password: bcrypt.hashSync('123456', 10),
    role: 'student',
  },
  {
    cin: '00000003',
    name: 'teacher Doe',
    email:'teacher@email.com',
    department:["dsi21","dsi22"],
    password: bcrypt.hashSync('123456', 10),
    role: 'teacher',
  },
  {
    cin: '00000003',
    name: 'Mary Doe',
    email:'mary@email.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'secretary',
  },
  {
    cin: '00000004',
    name: 'chief Doe',
    email: 'chief@email.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'director',
  },
  {
    cin: '00000005',
    name: 'supervisor Doe',
    email: 'supervisor@email.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'supervisor',
  }

];

export default users;
