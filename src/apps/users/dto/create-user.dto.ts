import { IUser } from "../../../typings";

// export interface ICreateUserDto extends IUser {
//   confirm_pass: string;
// }

export function createUserDto(body: any): IUser {
  if (!body.username) {
    throw "Username is required";
  }

  if (!body.full_name) {
    throw "Full name is required";
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
    username: body.username,
    full_name: body.full_name,
    password: body.password,
  };
}
