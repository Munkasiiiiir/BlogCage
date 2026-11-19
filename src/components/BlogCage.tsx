import { useState, useMemo } from 'react';
import { Blog } from '@/hooks/useBlogs';
import { BlogCard } from './BlogCard';
import { Input } from '@/components/ui/input';
import { Search, FileText } from 'lucide-react';

interface BlogCageProps {
  blogs: Blog[];
  loading: boolean;
  onEdit: (blog: Blog) => void;
  onDelete: (blog: Blog) => void;
}

export function BlogCage({ blogs, loading, onEdit, onDelete }: BlogCageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;
    
    const query = searchQuery.toLowerCase();
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.content.toLowerCase().includes(query) ||
        (blog.description?.toLowerCase().includes(query) ?? false)
    );
  }, [blogs, searchQuery]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search blogs..."
            className="pl-10"
            disabled
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by title or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-display text-lg font-medium text-foreground">
            {searchQuery ? 'No blogs found' : 'No blogs yet'}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchQuery
              ? 'Try adjusting your search terms'
              : 'Create your first blog to get started'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog, index) => (
            <div
              key={blog.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <BlogCard blog={blog} onEdit={onEdit} onDelete={onDelete} />
            </div>
          ))}
        </div>
      )}

      {searchQuery && filteredBlogs.length > 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Showing {filteredBlogs.length} of {blogs.length} blogs
        </p>
      )}
    </div>
  );
}
