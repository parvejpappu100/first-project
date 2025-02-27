import { Schema, model } from 'mongoose';
import validator from 'validator';

import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
    // validate: {
    //   validator: function (value: string){
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: "{VALUE} is not capitalize format"
    // }
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: "{VALUE} is not valid"
    // }
  },
});

const guardianSchema = new Schema<Guardian>({
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
    required: [true, 'Mother contact number is required.']
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
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
const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: [true, 'Student ID is required.'],
    unique: true,
    trim: true,
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
      validator: (value: string)=> validator.isEmail(value),
      message: "{VALUE} is not valid email"
    }
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
    match: [
      /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/,
      'Profile image must be a valid URL.',
    ],
  },
  isActive: {
    type: String,
    enum: {
      values: ['Active', 'Blocked'],
      message: "Status must be 'Active' or 'Blocked'.",
    },
    default: 'Active',
    required: [true, 'Status is required.'],
  },
});

//* 3. Create a Model.
const StudentModel = model<Student>('Student', studentSchema);

export default StudentModel;
