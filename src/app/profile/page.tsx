'use client';

import Profile from '@components/Profile';
import { IPrompt } from '@models/prompt';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState<IPrompt[]>([]);
  async function handleEdit(id: string) {
    router.push(`/update-prompt?id=${id}`);
  }
  async function handleDelete(id: string) {
    const hasComfirmed = confirm("are you sure to delete this prompt?");
    if (hasComfirmed) {
      try {
        await fetch('/api/prompt/' + id, {
          method: 'DELETE',
        })
        const filterred = posts.filter(e => e._id !== id);
        setPosts(filterred);
      } catch (error) {
        console.error(error);
      }
    }
  }
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    })();
  }, [session?.user?.id]);

  return (
    <Profile name='My' desc='Welcome to my profile' data={posts} handleDelete={handleDelete} handleEdit={handleEdit} />
  );
};

export default MyProfile;