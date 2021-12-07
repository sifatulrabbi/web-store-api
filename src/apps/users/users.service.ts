import { IUser, IUserDocument, IUserPreview, IUsersModel } from "../../typings";
import { usersModel } from "./users.model";
import { Passwords } from "../../libs";

class UsersService {
  constructor(private readonly usersModel: IUsersModel) {}

  public trimUser(user: IUserDocument): IUserPreview {
    return {
      _id: user._id,
      email: user.email,
      username: user.username,
      full_name: user.full_name,
      shop_id: user.shop_id,
      shop_name: user.shop_name,
    };
  }

  public async findAll(): Promise<IUserDocument[]> {
    const users: IUserDocument[] = await this.usersModel.find(
      {},
      "_id username email full_name shop_id shop_name",
    );

    return users;
  }

  public async findOne(userInfo: { _id: string }): Promise<IUserDocument>;
  public async findOne(userInfo: { username: string }): Promise<IUserDocument>;
  public async findOne(userInfo: { email: string }): Promise<IUserDocument>;
  public async findOne(userInfo: {
    _id: string;
    email: string;
    username: string;
  }): Promise<IUserDocument | null> {
    const user: IUserDocument | null = await this.usersModel.findOne(userInfo);
    return user;
  }

  public async create(data: IUser): Promise<IUserDocument> {
    if (
      (await this.findOne({ email: data.email })) ||
      (await this.findOne({ username: data.username }))
    ) {
      throw "Username or Email already in use";
    }

    const hash: string = await Passwords.genPass(data.password);

    const newUser: IUserDocument = new this.usersModel({
      email: data.email,
      full_name: data.full_name,
      username: data.username,
      password: hash,
    });

    const createdUser: IUserDocument = await newUser.save();
    return createdUser;
  }

  public async update(userId: string, data: IUser): Promise<IUserDocument> {
    const user: IUserDocument = await this.findOne({ _id: userId });
    const updateData: IUser = {
      email: user.email,
      full_name: user.email,
      username: user.email,
      password: user.password,
    };

    if (data.password) {
      const hash: string = await Passwords.genPass(data.password);
      updateData.password = hash;
    }

    if (data.email) {
      updateData.email = data.email;
    }

    if (data.full_name) {
      updateData.full_name = data.full_name;
    }

    if (data.username) {
      updateData.username = data.username;
    }

    const updatedUser: IUserDocument | null = await this.usersModel.findByIdAndUpdate(
      { ...updateData },
      {
        new: true,
      },
    );

    if (!updatedUser) {
      throw "Unable to update user info";
    }
    return updatedUser;
  }

  public async remove(userId: string): Promise<string> {
    const user: IUserDocument = await this.findOne({ _id: userId });
    await user.remove();

    return "User deleted";
  }
}

export const usersService: UsersService = new UsersService(usersModel.getModel());
