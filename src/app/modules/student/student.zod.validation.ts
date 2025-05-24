import { z } from 'zod';


// Define enums for gender, blood group, and status
const GenderEnum = z.enum(['Male', 'Female', 'Other']);
const BloodGroupEnum = z
  .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
  .optional();

// Name Schema
const UserNameValidationSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required.'),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, 'Last name is required.'),
});

// Guardian Schema
const GuardianValidationSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required.'),
  fatherOccupation: z.string().min(1, 'Father occupation is required.'),
  fatherContactNo: z.string().min(1, 'Father contact number is required.'),
  motherName: z.string().min(1, 'Mother name is required.'),
  motherOccupation: z.string().min(1, 'Mother occupation is required.'),
  motherContactNo: z.string().min(1, 'Mother contact number is required.'),
});

// Local Guardian Schema
const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Local guardian name is required.'),
  occupation: z.string().min(1, 'Local guardian occupation is required.'),
  contactNo: z.string().min(1, 'Local guardian contact number is required.'),
  address: z.string().min(1, 'Local guardian address is required.'),
});

// Main Student Schema
const studentZodValidationSchema = z.object({
  id: z.string().trim().min(1, 'Student ID is required.'),
  password: z.string().max(20) ,
  name: UserNameValidationSchema,
  gender: GenderEnum,
  dateOfBirth: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'Date of birth must be in YYYY-MM-DD format.',
    ),
  email: z.string().email('Invalid email format.'),
  contactNo: z.string().min(1, 'Student contact number is required.'),
  emergencyContactNo: z
    .string()
    .min(1, 'Emergency contact number is required.'),
  bloodGroup: BloodGroupEnum,
  presentAddress: z.string().min(1, 'Present address is required.'),
  permanentAddress: z.string().min(1, 'Permanent address is required.'),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImage: z.string().url('Profile image must be a valid URL.').optional(),
  isDeleted: z.boolean(),
});

export default studentZodValidationSchema;
