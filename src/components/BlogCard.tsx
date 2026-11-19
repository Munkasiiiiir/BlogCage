import { format } from 'date-fns';
import { Blog } from '@/hooks/useBlogs';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Calendar, Clock } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
}

export function BlogCard({ blog, onEdit, onDelete }: BlogCardProps) {
  const createdDate = format(new Date(blog.created_at), 'MMM d, yyyy');
  const updatedDate = format(new Date(blog.updated_at), 'MMM d, yyyy');
  const isUpdated = blog.created_at !== blog.updated_at;

  // Get first 150 characters of content for preview
  const contentPreview = blog.content.length > 150 
    ? blog.content.substring(0, 150) + '...' 
    : blog.content;

  return (
    <Card className="group relative overflow-hidden border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-accent/20">
      <CardHeader className="pb-3">
        <h3 className="font-display text-xl font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
          {blog.title}
        </h3>
        {blog.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {blog.description}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {contentPreview}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {createdDate}
          </span>
          {isUpdated && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Updated {updatedDate}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => onEdit(blog)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(blog)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
