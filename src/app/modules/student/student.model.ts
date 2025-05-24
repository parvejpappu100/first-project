import { Schema, model } from 'mongoose';
import validator from 'validator';


import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, 'Father name is required.'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required.'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required.'],
  },
  motherName: { type: String, required: [true, 'Mother name is required.'] },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required.'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required.'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'Local guardian name is required.'] },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required.'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contact number is required.'],
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required.'],
  },
});

//* 2. Create a Schema corresponding to the document interface.
const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'Student ID is required.'],
    unique: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref: 'User',
  },
  
  name: {
    type: userNameSchema,
    required: [true, 'Student name is required.'],
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female', 'Other'],
      message: "Gender must be 'Male', 'Female', or 'Other'.",
    },
    required: [true, 'Gender is required.'],
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Date of birth is required.'],
    match: [
      /^\d{4}-\d{2}-\d{2}$/,
      'Date of birth must be in YYYY-MM-DD format.',
    ],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid email',
    },
  },
  contactNo: {
    type: String,
    required: [true, 'Student contact number is required.'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required.'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'AB+', 'O+', 'O-', 'B-', 'AB-'],
      message:
        'Invalid blood group. Choose from A+, A-, B+, AB+, O+, O-, B-, AB-.',
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required.'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required.'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required.'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian information is required.'],
  },
  profileImage: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});



// * Query middleware:
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();

  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// * Creating a custom static method:
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//* 3. Create a Model.
export const Student = model<TStudent, StudentModel>('Student', studentSchema);


