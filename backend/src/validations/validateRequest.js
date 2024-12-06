export const validateRequest = (schema, body) => {
  const { error, value } = schema.validate(body);
  if (error) {
    throw {
      statusCode: 400,
      message: `Validation Error: ${error.details[0].message}`,
    };
  }
  return value;
};
