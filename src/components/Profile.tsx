import { IPrompt } from '@models/prompt';
import React from 'react';
import PromptCard from './PromptCard';

interface IProfileProps {
  name: string;
  desc: string;
  data: IPrompt[],
  handleEdit?: (id: string) => void;
  handleDelete?: (id: string) => void;
}
const Profile = ({ name, desc, data, handleEdit, handleDelete }: IProfileProps) => {
  return (
    <div className='w-full'>
      <h1 className='blue_gradient'>{name} Profile</h1>
      <p className='desc text-left'>{desc}</p>
      <div className='mt-16 prompt_layout'>
        {data.map((post) => (
          <PromptCard key={post._id} post={post} handleEdit={handleEdit} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Profile;