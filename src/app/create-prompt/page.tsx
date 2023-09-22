'use client';
import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useState } from 'react';
import { useRouter } from "next/navigation";
import { IPrompt } from '@models/prompt';

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<IPrompt>({} as IPrompt);

  const createPrompt = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const respone = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user?.id
        })
      });
      if (respone.ok) {
        router.push("/");
      }
    } catch (error) {

    }
  }
  return (
    <div>
      <Form
        handleSubmit={createPrompt}
        post={post}
        setPost={setPost}
        submitting={submitting}
        type='Create'
      />
    </div>
  );
};

export default CreatePrompt;