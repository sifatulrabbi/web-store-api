import { IUser } from "../../typings";

export function createUserDto(body: any): IUser {
  if (!body.name) {
    throw "Name is required";
  }

  if (!body.email) {
    throw "Email is required";
  }

  if (!body.password) {
    throw "Password is required";
  }

  if (!body.confirm_pass) {
    throw "Confirm password is required";
  }

  if (body.password !== body.confirm_pass) {
    throw "Passwords doesn't match";
  }

  return {
    email: body.email,
    name: body.name,
    password: body.password,
  };
}
