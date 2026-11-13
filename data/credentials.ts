function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}.`);
  }
  return value;
}

export const admin = {
  username: required('ADMIN_USERNAME'),
  password: required('ADMIN_PASSWORD'),
};