import { InferSchemaType, Model, Schema, model, models } from "mongoose";
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
})
export type ProfileModel = InferSchemaType<typeof UserSchema> & { _id: string };

const User = models.User as Model<ProfileModel> || model('User', UserSchema);
export default User