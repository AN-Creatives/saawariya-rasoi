
import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Switch } from '@/components/ui/switch';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';

interface ContentItem {
  id: string;
  section: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  order_index: number;
  is_active: boolean;
  mode: 'delivery' | 'takeaway' | 'both';
}

// Helper function to validate mode
const validateMode = (mode: string): 'delivery' | 'takeaway' | 'both' => {
  if (mode === 'delivery' || mode === 'takeaway' || mode === 'both') {
    return mode as 'delivery' | 'takeaway' | 'both';
  }
  return 'both'; // Default fallback
};

const emptyContentItem: Omit<ContentItem, 'id'> = {
  section: '',
  title: '',
  subtitle: '',
  description: '',
  image_url: '',
  order_index: 0,
  is_active: true,
  mode: 'both',
};

const DashboardContent = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [formData, setFormData] = useState<Omit<ContentItem, 'id'>>(emptyContentItem);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contentIdToDelete, setContentIdToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('order_index', { ascending: true })
        .order('section', { ascending: true });

      if (error) throw error;
      
      // Map and validate the data before setting it to state
      const validatedContents = (data || []).map(item => ({
        id: item.id,
        section: item.section,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        image_url: item.image_url,
        order_index: item.order_index || 0,
        is_active: item.is_active ?? true,
        mode: validateMode(item.mode || 'both')
      }));
      
      setContents(validatedContents);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to fetch content',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (value: boolean) => {
    setFormData((prev) => ({ ...prev, is_active: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleEdit = (content: ContentItem) => {
    setSelectedContent(content);
    setFormData({
      section: content.section,
      title: content.title,
      subtitle: content.subtitle,
      description: content.description,
      image_url: content.image_url,
      order_index: content.order_index,
      is_active: content.is_active,
      mode: content.mode,
    });
    setDialogOpen(true);
  };

  const handleNew = () => {
    setSelectedContent(null);
    setFormData(emptyContentItem);
    setDialogOpen(true);
  };

  const uploadImage = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return null;

    const file = selectedFiles[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `content/${fileName}`;

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
      let imageUrl = formData.image_url;
      
      if (selectedFiles && selectedFiles.length > 0) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      if (selectedContent) {
        // Update existing content
        const { error } = await supabase
          .from('content')
          .update({
            ...formData,
            image_url: imageUrl,
          })
          .eq('id', selectedContent.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Content updated successfully",
        });
      } else {
        // Insert new content
        const { error } = await supabase
          .from('content')
          .insert([{
            ...formData,
            image_url: imageUrl,
          }]);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Content created successfully",
        });
      }

      setDialogOpen(false);
      fetchContents();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to save content',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Content deleted successfully",
      });
      
      setContentIdToDelete(null);
      fetchContents();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to delete content',
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage website content sections, titles, and descriptions.
          </p>
        </div>
        <Button onClick={handleNew}>
          <Plus className="mr-2 h-4 w-4" /> Add Content
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
                <TableHead>Section</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No content found. Click "Add Content" to create your first content section.
                  </TableCell>
                </TableRow>
              ) : (
                contents.map((content) => (
                  <TableRow key={content.id}>
                    <TableCell className="font-medium">{content.section}</TableCell>
                    <TableCell>{content.title || '-'}</TableCell>
                    <TableCell className="capitalize">{content.mode}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          content.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {content.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(content)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive"
                              onClick={() => setContentIdToDelete(content.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the
                                content section.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setContentIdToDelete(null)}>
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => contentIdToDelete && handleDelete(contentIdToDelete)}
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

      {/* Content form dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedContent ? 'Edit Content' : 'Create New Content'}
            </DialogTitle>
            <DialogDescription>
              Add or update content sections for your website.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="section">Section Name *</Label>
                  <Input
                    id="section"
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    placeholder="e.g., hero, features, testimonials"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order_index">Display Order</Label>
                  <Input
                    id="order_index"
                    name="order_index"
                    type="number"
                    value={formData.order_index}
                    onChange={handleInputChange}
                    min={0}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  placeholder="Section title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  name="subtitle"
                  value={formData.subtitle || ''}
                  onChange={handleInputChange}
                  placeholder="Section subtitle"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  placeholder="Detailed description"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <div className="flex items-center gap-4">
                  {formData.image_url && (
                    <div className="h-12 w-12 overflow-hidden rounded-md border">
                      <img
                        src={formData.image_url}
                        alt="Section image"
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mode">Display Mode</Label>
                  <Select
                    name="mode"
                    value={formData.mode}
                    onValueChange={(value) => handleSelectChange('mode', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="both">Both (Delivery & Takeaway)</SelectItem>
                      <SelectItem value="delivery">Delivery Only</SelectItem>
                      <SelectItem value="takeaway">Takeaway Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-6">
                  <Label htmlFor="is_active">Active</Label>
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={handleSwitchChange}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {selectedContent ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default DashboardContent;
