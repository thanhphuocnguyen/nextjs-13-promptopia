import Profile from '@components/Profile';
import React from 'react';
async function fetchProfile(profileID: string) {
  // Fetch data from external API
  const response = await fetch(process.env.DOMAIN_INTERNAL + `/api/users/${profileID}/posts`);
  return response.json();
}

interface IOtherProfile {
  params: { id: string };
}
const OtherProfile = async ({ params }: { params: { id: string } }) => {
  const posts = await fetchProfile(params.id);

  return (
    <Profile name='My' desc={`Welcome to ${posts[0]?.creator?.username} profile`} data={posts} />
  );
};

export default OtherProfile;