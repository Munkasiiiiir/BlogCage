import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Blog {
  id: string;
  user_id: string;
  title: string;
  content: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchBlogs = async () => {
    if (!user) {
      setBlogs([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error: any) {
      toast({
        title: 'Error fetching blogs',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [user]);

  const createBlog = async (title: string, content: string, description?: string) => {
    if (!user) return { error: new Error('Not authenticated') };

    try {
      const { data, error } = await supabase
        .from('blogs')
        .insert({
          title,
          content,
          description: description || null,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      setBlogs(prev => [data, ...prev]);
      toast({
        title: 'Blog created',
        description: 'Your blog has been created successfully.',
      });
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: 'Error creating blog',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  const updateBlog = async (id: string, title: string, content: string, description?: string) => {
    if (!user) return { error: new Error('Not authenticated') };

    try {
      const { data, error } = await supabase
        .from('blogs')
        .update({
          title,
          content,
          description: description || null,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setBlogs(prev => prev.map(blog => blog.id === id ? data : blog));
      toast({
        title: 'Blog updated',
        description: 'Your blog has been updated successfully.',
      });
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: 'Error updating blog',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  const deleteBlog = async (id: string) => {
    if (!user) return { error: new Error('Not authenticated') };

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBlogs(prev => prev.filter(blog => blog.id !== id));
      toast({
        title: 'Blog deleted',
        description: 'Your blog has been deleted successfully.',
      });
      return { error: null };
    } catch (error: any) {
      toast({
        title: 'Error deleting blog',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  return {
    blogs,
    loading,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
  };
}
