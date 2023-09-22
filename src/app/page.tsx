import Feed from '@components/Feed';
import React from 'react';

const Home = () => {
  return (
    <section className='w-full h-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>AI Powerd Prompt</span>
      </h1>
      <p className='desc text-center'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab praesentium dolor, fugit quia exercitationem nulla alias voluptates provident, officia dignissimos cumque ducimus tenetur nemo. Placeat quae fugit soluta nobis voluptatibus?      </p>
      <Feed />
    </section>
  );
};

export default Home;