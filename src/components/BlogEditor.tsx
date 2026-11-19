import { useState, useEffect } from 'react';
import { Blog } from '@/hooks/useBlogs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Save, FileText } from 'lucide-react';
import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  content: z.string().min(1, 'Content is required').max(50000, 'Content must be less than 50,000 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
});

interface BlogEditorProps {
  blog?: Blog | null;
  onSave: (title: string, content: string, description?: string) => Promise<void>;
  onCancel: () => void;
  saving?: boolean;
}

export function BlogEditor({ blog, onSave, onCancel, saving = false }: BlogEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string; content?: string; description?: string }>({});

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setDescription(blog.description || '');
    } else {
      setTitle('');
      setContent('');
      setDescription('');
    }
    setErrors({});
  }, [blog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = blogSchema.safeParse({ title, content, description });
    
    if (!result.success) {
      const fieldErrors: { title?: string; content?: string; description?: string } = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as string;
        fieldErrors[field as keyof typeof fieldErrors] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    await onSave(title.trim(), content.trim(), description.trim() || undefined);
  };

  return (
    <Card className="border-border bg-card shadow-card animate-scale-in">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2 font-display text-xl">
          <FileText className="h-5 w-5 text-accent" />
          {blog ? 'Edit Blog' : 'Create New Blog'}
        </CardTitle>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title..."
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Short Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of your blog..."
              className={errors.description ? 'border-destructive' : ''}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium">
              Content <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              rows={12}
              className={`resize-none font-body ${errors.content ? 'border-destructive' : ''}`}
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content}</p>
            )}
            <p className="text-xs text-muted-foreground text-right">
              {content.length.toLocaleString()} characters
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3 border-t border-border bg-muted/30 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={saving}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : blog ? 'Update' : 'Create'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
