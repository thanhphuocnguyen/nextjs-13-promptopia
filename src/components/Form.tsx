import { IPrompt } from '@models/prompt';
import { AnyCnameRecord } from 'dns';
import Link from 'next/link';
import React, { Dispatch, FormEvent, SetStateAction } from 'react';
interface IForm {
  type: string,
  post: IPrompt,
  setPost: Dispatch<SetStateAction<IPrompt>>,
  submitting: boolean,
  handleSubmit: (e: FormEvent) => void;
}
const Form = ({ type, post, setPost, submitting, handleSubmit }: IForm) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>{type} Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Veniam porro similique consectetur aut hic exercitationem, excepturi reprehenderit ea rem molestiae ducimus error ab distinctio maxime ullam pariatur ut explicabo commodi!</p>
      <form onSubmit={handleSubmit} className='w-full max-w-2xl flex flex-col mt-10 gap-7 glassmorphism'>
        <label htmlFor="prompt">
          <span className='font-satoshi font-semibold text-base text-gray-700 '>Your AI Prompt</span>
          <textarea
            name="prompt"
            id="prompt-content"
            className='form_textarea'
            value={post.prompt} placeholder="Write your prompt here..."
            required
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value })
            }}
          >
          </textarea>
        </label>
        <label htmlFor="tag">
          <span className='font-satoshi font-semibold text-base text-gray-700 '>Tag <span className='font-normal'>#product, #webdevelopment, #openAI, #idea</span></span>
          <input
            name="tag"
            id="tag-content"
            className='form_input'
            value={post.tag}
            placeholder="#tag"
            required
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value })
            }}
          />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href="/" className='text-gray-500 text-sm' >Cancel</Link>
          <button type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;