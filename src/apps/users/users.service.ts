import { IUser, IUserDocument, IUserPreview, IUsersModel } from "../../typings";
import { usersModel } from "./users.model";
import { Passwords } from "../../common";

class UsersService {
  constructor(private readonly usersModel: IUsersModel) {}

  public trimUser(user: IUserDocument): IUserPreview {
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      shop_id: user.shop_id,
      shop_name: user.shop_name,
    };
  }

  public async findAll(): Promise<IUserDocument[]> {
    const users: IUserDocument[] = await this.usersModel.find({});

    return users;
  }

  public async findOne(userInfo: { _id: string }): Promise<IUserDocument>;
  public async findOne(userInfo: { email: string }): Promise<IUserDocument>;
  public async findOne(userInfo: { _id: string; email: string }): Promise<IUserDocument | null> {
    const user: IUserDocument | null = await this.usersModel.findOne(userInfo);
    return user;
  }

  public async create(data: IUser): Promise<IUserDocument> {
    if (await this.findOne({ email: data.email })) {
      throw "Email already in use";
    }

    const hash: string = await Passwords.genPass(data.password);

    const newUser: IUserDocument = new this.usersModel({ ...data, password: hash });

    const createdUser: IUserDocument = await newUser.save();
    return createdUser;
  }

  public async update(userId: string, data: IUser): Promise<IUserDocument> {
    const user: IUserDocument = await this.findOne({ _id: userId });
    const updateData: IUser = {
      email: user.email,
      password: user.password,
      name: user.email,
    };

    if (data.password) {
      const hash: string = await Passwords.genPass(data.password);
      updateData.password = hash;
    }

    if (data.email) {
      updateData.email = data.email;
    }

    if (data.name) {
      updateData.name = data.name;
    }

    const updatedUser: IUserDocument | null = await this.usersModel.findByIdAndUpdate(updateData, {
      new: true,
    });

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

  public async bulkRemove(data?: IUser): Promise<string> {
    await this.usersModel.remove({ ...data });

    return "Users removed";
  }
}

export const usersService: UsersService = new UsersService(usersModel.getModel());
