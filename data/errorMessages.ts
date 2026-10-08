export const errors = {
  name:    { blank: /name may not be blank/i },
  email:   { blank: /email may not be blank/i, malformed: /well-formed email/i },
  phone:   { blank: /phone may not be blank/i, length: /phone must be between 11 and 21/i },
  subject: { blank: /subject may not be blank/i, length: /subject must be between 5 and 100/i },
  message: { blank: /message may not be blank/i, length: /message must be between 20 and 2000/i },
} as const;