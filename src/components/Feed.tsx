'use client';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import PromptCard from './PromptCard';
import { useSession } from 'next-auth/react';
import { IPrompt } from '@models/prompt';
interface IPromptCardList {
  data: IPrompt[],
  handleTagClick: (tag: string) => void;
}
const PromptCardList = ({ data, handleTagClick }: IPromptCardList) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
}

const Feed = () => {
  const [posts, setPosts] = useState<IPrompt[]>([]);
  const [textSearch, setTextSearch] = useState('');

  async function handleSearchChange() {
    try {
      const response = await fetch('/api/prompt/search-text?search=' + encodeURI(textSearch));
      const prompts = await response.json();
      setPosts(prompts);
    } catch (error) {
      console.error(error);
    }
  }
  async function handleTagClick(tag: string) {
    setTextSearch(tag);
    try {
      const response = await fetch('/api/prompt/search-tag?tag_search=' + encodeURI(tag));
      const prompts = await response.json();
      setPosts(prompts);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    })()
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      (async () => handleSearchChange())();
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [textSearch]);

  return (
    <section className='feed'>
      <div className='relative w-full flex-center'>
        <input
          type="text"
          name="search"
          id="search-prompt"
          placeholder='Search for a tag or username'
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
          required
          className='search_input peer'
        />
      </div>
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;