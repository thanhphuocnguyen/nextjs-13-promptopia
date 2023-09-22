'use client';
import Form from '@components/Form';
import { IPrompt } from '@models/prompt';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id');
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<IPrompt>({} as IPrompt)
  const handleEditPrompt = async (e: FormEvent) => {
    e.preventDefault();
    if (!promptId) return alert('Prompt ID not found');
    try {
      const response = await fetch(`api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify(post)
      });
      if (response.ok) router.push('/')
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost(data)
    })();
  }, [promptId]);

  return (
    <Form type='Update' post={post} submitting={submitting} handleSubmit={handleEditPrompt} setPost={setPost} />
  );
};

export default UpdatePrompt;