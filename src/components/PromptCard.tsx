'use client';
import { IPrompt } from '@models/prompt';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
interface IPromptCard {
  post: IPrompt;
  handleTagClick?: (tag: string) => void;
  handleDelete?: (id: string) => void;
  handleEdit?: (id: string) => void;
}
const PromptCard = ({ post, handleTagClick, handleDelete, handleEdit }: IPromptCard) => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");

  function handleCopy() {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex -justify-start items-center gap-3 cursor-pointer'>
          <Link href={'/profile/' + post.creator._id}>
            <Image
              src={post?.creator?.image ?? '/assets/images/logo.svg'}
              alt='user_image'
              width={40}
              height={40}
              className='rounded-full object-contain'
            />
          </Link>

          <div className='flex flex-col '>
            <h3 className='font-satoshi font-semibold text-gray-500'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={() => handleCopy()}>
          <Image
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt='copy_prompt'
            width={12}
            height={12} />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => {
          handleTagClick && handleTagClick(post.tag);
        }}>#{post.tag}</p>

      {session?.user.id === post.creator._id && pathName == '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className='font-inter text-sm green_gradient cursor-pointer' onClick={() => handleEdit && handleEdit(post._id)}>Edit</p>
          <p className='font-inter text-sm green_gradient cursor-pointer' onClick={() => handleDelete && handleDelete(post._id)}>Delete</p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;