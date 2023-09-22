import { InferSchemaType, Model, Schema, model, models } from "mongoose";
import { ProfileModel } from "./user";

const PromptShcema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.']
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.']
  },
})

export type IPrompt = InferSchemaType<typeof PromptShcema> & { _id: string } & { creator: ProfileModel };
const Prompt = models.Prompt as Model<IPrompt> || model('Prompt', PromptShcema)
export default Prompt;