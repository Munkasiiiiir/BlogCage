import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useBlogs, Blog } from '@/hooks/useBlogs';
import { Header } from '@/components/Header';
import { BlogCage } from '@/components/BlogCage';
import { BlogEditor } from '@/components/BlogEditor';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const { blogs, loading: blogsLoading, createBlog, updateBlog, deleteBlog } = useBlogs();
  const navigate = useNavigate();

  const [showEditor, setShowEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [deletingBlog, setDeletingBlog] = useState<Blog | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth?mode=login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) return null;

  const handleCreateNew = () => {
    setEditingBlog(null);
    setShowEditor(true);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setShowEditor(true);
  };

  const handleDelete = (blog: Blog) => {
    setDeletingBlog(blog);
  };

  const handleSave = async (title: string, content: string, description?: string) => {
    setSaving(true);
    try {
      if (editingBlog) {
        const { error } = await updateBlog(editingBlog.id, title, content, description);
        if (!error) {
          setShowEditor(false);
          setEditingBlog(null);
        }
      } else {
        const { error } = await createBlog(title, content, description);
        if (!error) {
          setShowEditor(false);
        }
      }
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingBlog) return;
    setDeleting(true);
    try {
      await deleteBlog(deletingBlog.id);
      setDeletingBlog(null);
    } finally {
      setDeleting(false);
    }
  };

  const handleCancelEditor = () => {
    setShowEditor(false);
    setEditingBlog(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Your Blogs
            </h1>
            <p className="mt-1 text-muted-foreground">
              Create, edit, and manage all your blog posts
            </p>
          </div>

          <Button
            onClick={handleCreateNew}
            className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90 w-fit"
          >
            <Plus className="h-4 w-4" />
            Create New Blog
          </Button>
        </div>

        {showEditor ? (
          <BlogEditor
            blog={editingBlog}
            onSave={handleSave}
            onCancel={handleCancelEditor}
            saving={saving}
          />
        ) : (
          <BlogCage
            blogs={blogs}
            loading={blogsLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>

      <DeleteConfirmDialog
        open={!!deletingBlog}
        onOpenChange={(open) => !open && setDeletingBlog(null)}
        onConfirm={handleConfirmDelete}
        title={deletingBlog?.title || ''}
        deleting={deleting}
      />
    </div>
  );
}
