export function loginDto(body: any): { email?: string; username?: string; password: string } {
  if (!body.email && !body.username) {
    throw "Please enter your Email or Username";
  }

  if (!body.password) {
    throw "Please enter your password";
  }

  if (body.password.length < 8) {
    throw "Password should be 8 characters long";
  }

  return {
    email: body.email,
    username: body.email,
    password: body.password,
  };
}
