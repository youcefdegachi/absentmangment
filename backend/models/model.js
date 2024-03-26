import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    cin:{type: Number,required: true,unique: true},
    name: {type: String, required: true},
    // phone: {type: String, required: false}, //todo:
    // dateBirth: {type: Number, required: false}, //TODO: change to birth date
    // gender: { type: String, required: false}, //TODO: change to enum 
    // image: {type: String, required: false}, //TODO: 
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},

    role: { 
      type: String,
      required: true,
      enum: ['student', 'teacher', 'supervisor', 'director', 'secretary', 'admin'],
      lowercase: true,
    },
    // Additional attributes based on roles
    class: { 
      type: String,
      required: function() {
        return this.role === 'Student'; // Class is required only when role is 'Student'
      }
    }, // Only for students
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department',
      required: ()=>{
        return this.role === 'Teacher';
      }
    }, // Reference to department for all roles
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject',
      enum: ['sport', 'program', 'math', 'physique', 'database']
    }], // Reference to subjects for students
    // subjects: [subjectSchema], // Reference to subjects for students
    teachingSubjects: [{ type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      enum: ['sport', 'program', 'math', 'physique', 'database']
      }], // Reference to subjects for teachers
    // Any other role-specific attributes can be added here
  },
  {
    timestamps: true,
  }
);

// Define a schema for managing student attendance
const attendanceSchema = mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sessionDate: { type: Date, required: true }, // Date of the session
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    isAbsent: { type: Boolean, default: false }, // Whether the student is absent or not
    // You can add more fields here as needed, such as session time, reason for absence, etc.
  },
  {
    timestamps: true,
  }
);

// Define a schema for subjects
const subjectSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    studyDays: [{ type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] }],
    eliminationThreshold: { type: Number, default: 0 }, // Absence threshold leading to elimination
    // Any other subject-related fields can be added here
  },
  {
    timestamps: true,
  }
);

// Define models based on schemas
const User = mongoose.model('User', userSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);
const Subject = mongoose.model('Subject', subjectSchema);

export { User, Attendance, Subject };
