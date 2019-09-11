import { object, string } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      email: string()
        .email()
        .required(),
      password: string()
        .required()
        .min(6),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation failed', messages: err.inner });
  }
};
