import Joi from "joi";

// * creating a schema validation using joi:
const userNameSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .required()
      .regex(/^[A-Z][a-z]*$/)
      .messages({
        'string.empty': 'First name is required.',
        'string.pattern.base': '{#value} is not in capitalized format.',
      }),
    middleName: Joi.string().trim().optional(),
    lastName: Joi.string()
      .trim()
      .required()
      .regex(/^[A-Za-z]+$/)
      .messages({
        'string.empty': 'Last name is required.',
        'string.pattern.base': '{#value} is not valid.',
      }),
  });

  const guardianSchema = Joi.object({
    fatherName: Joi.string().trim().required().messages({
      'string.empty': 'Father name is required.',
    }),
    fatherOccupation: Joi.string().trim().required().messages({
      'string.empty': 'Father occupation is required.',
    }),
    fatherContactNo: Joi.string().trim().required().messages({
      'string.empty': 'Father contact number is required.',
    }),
    motherName: Joi.string().trim().required().messages({
      'string.empty': 'Mother name is required.',
    }),
    motherOccupation: Joi.string().trim().required().messages({
      'string.empty': 'Mother occupation is required.',
    }),
    motherContactNo: Joi.string().trim().required().messages({
      'string.empty': 'Mother contact number is required.',
    }),
  });

  const localGuardianSchema = Joi.object({
    name: Joi.string().trim().required().messages({
      'string.empty': 'Local guardian name is required.',
    }),
    occupation: Joi.string().trim().required().messages({
      'string.empty': 'Local guardian occupation is required.',
    }),
    contactNo: Joi.string().trim().required().messages({
      'string.empty': 'Local guardian contact number is required.',
    }),
    address: Joi.string().trim().required().messages({
      'string.empty': 'Local guardian address is required.',
    }),
  });

  const studentValidationSchema = Joi.object({
    id: Joi.string().trim().required().messages({
      'string.empty': 'Student ID is required.',
    }),
    name: userNameSchema.required().messages({
      'object.base': 'Student name is required.',
    }),
    gender: Joi.string()
      .valid('Male', 'Female', 'Other')
      .required()
      .messages({
        'any.only': "Gender must be 'Male', 'Female', or 'Other'.",
        'string.empty': 'Gender is required.',
      }),
    dateOfBirth: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required()
      .messages({
        'string.pattern.base': 'Date of birth must be in YYYY-MM-DD format.',
        'string.empty': 'Date of birth is required.',
      }),
    email: Joi.string().email().required().messages({
      'string.email': '{#value} is not a valid email.',
      'string.empty': 'Email is required.',
    }),
    contactNo: Joi.string().trim().required().messages({
      'string.empty': 'Student contact number is required.',
    }),
    emergencyContactNo: Joi.string().trim().required().messages({
      'string.empty': 'Emergency contact number is required.',
    }),
    bloodGroup: Joi.string()
      .valid('A+', 'A-', 'B+', 'AB+', 'O+', 'O-', 'B-', 'AB-')
      .messages({
        'any.only':
          'Invalid blood group. Choose from A+, A-, B+, AB+, O+, O-, B-, AB-.',
      }),
    presentAddress: Joi.string().trim().required().messages({
      'string.empty': 'Present address is required.',
    }),
    permanentAddress: Joi.string().trim().required().messages({
      'string.empty': 'Permanent address is required.',
    }),
    guardian: guardianSchema.required().messages({
      'object.base': 'Guardian information is required.',
    }),
    localGuardian: localGuardianSchema.required().messages({
      'object.base': 'Local guardian information is required.',
    }),
    profileImage: Joi.string()
      .pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/)
      .messages({
        'string.pattern.base': 'Profile image must be a valid URL.',
      }),
    isActive: Joi.string()
      .valid('Active', 'Blocked')
      .default('Active')
      .required()
      .messages({
        'any.only': "Status must be 'Active' or 'Blocked'.",
        'string.empty': 'Status is required.',
      }),
  });

  export default studentValidationSchema;