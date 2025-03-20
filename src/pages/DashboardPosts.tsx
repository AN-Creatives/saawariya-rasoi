
import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loader2, Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  image_url: string | null;
  excerpt: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  author_id: string;
}

const emptyPost = {
  title: '',
  slug: '',
  content: '',
  image_url: '',
  excerpt: '',
  published: false
};

const DashboardPosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState(emptyPost);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to fetch posts',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from title if slug field is empty
    if (name === 'title' && (!formData.slug || formData.slug === '')) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      setFormData((prev) => ({ ...prev, [name]: value, slug }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSwitchChange = (value: boolean) => {
    setFormData((prev) => ({ ...prev, published: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files);
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content || '',
      image_url: post.image_url || '',
      excerpt: post.excerpt || '',
      published: post.published
    });
    setDialogOpen(true);
  };

  const handleNew = () => {
    setSelectedPost(null);
    setFormData(emptyPost);
    setDialogOpen(true);
  };

  const uploadImage = async () => {
    if (!selectedFile || selectedFile.length === 0) return null;

    const file = selectedFile[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('site-images').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || 'Error uploading image',
      });
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!user) throw new Error('You must be logged in to create or edit posts');

      let imageUrl = formData.image_url;
      
      if (selectedFile && selectedFile.length > 0) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      if (selectedPost) {
        // Update existing post
        const { error } = await supabase
          .from('posts')
          .update({
            ...formData,
            image_url: imageUrl,
            updated_at: new Date().toISOString()
          })
          .eq('id', selectedPost.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Post updated successfully",
        });
      } else {
        // Insert new post
        const { error } = await supabase
          .from('posts')
          .insert([{
            ...formData,
            image_url: imageUrl,
            author_id: user.id
          }]);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Post created successfully",
        });
      }

      setDialogOpen(false);
      fetchPosts();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to save post',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
      
      setPostIdToDelete(null);
      fetchPosts();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to delete post',
      });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground mt-2">
            Manage your blog articles, news, and content.
          </p>
        </div>
        <Button onClick={handleNew}>
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="rounded-md border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No posts found. Click "New Post" to create your first blog post.
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          post.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(post.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(post)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive"
                              onClick={() => setPostIdToDelete(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the
                                post and remove it from your blog.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setPostIdToDelete(null)}>
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => postIdToDelete && handleDelete(postIdToDelete)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Post form dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>
              {selectedPost ? 'Edit Post' : 'Create New Post'}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for your blog post.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Post title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="url-friendly-title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief summary of the post (displayed in previews)"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Full content of the post"
                  rows={8}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Featured Image</Label>
                <div className="flex items-center gap-4">
                  {formData.image_url && (
                    <div className="h-12 w-12 overflow-hidden rounded-md border">
                      <img
                        src={formData.image_url}
                        alt="Featured"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="published">Published</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {selectedPost ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default DashboardPosts;
