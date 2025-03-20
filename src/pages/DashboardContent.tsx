
import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ContentList from '@/components/dashboard/ContentList';
import ContentForm from '@/components/dashboard/ContentForm';
import { ContentItem, ContentFormData } from '@/types/content';
import { 
  fetchContents, 
  uploadImage, 
  createContent, 
  updateContent, 
  deleteContent 
} from '@/services/contentService';

const emptyContentItem: ContentFormData = {
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
  const [formData, setFormData] = useState<ContentFormData>(emptyContentItem);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadContents();
  }, []);

  const loadContents = async () => {
    try {
      setLoading(true);
      const data = await fetchContents();
      setContents(data);
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

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = formData.image_url;
      
      if (selectedFiles && selectedFiles.length > 0) {
        const uploadedUrl = await uploadImage(selectedFiles[0]);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const contentData = {
        ...formData,
        image_url: imageUrl,
      };

      if (selectedContent) {
        // Update existing content
        await updateContent(selectedContent.id, contentData);
        
        toast({
          title: "Success",
          description: "Content updated successfully",
        });
      } else {
        // Insert new content
        await createContent(contentData);
        
        toast({
          title: "Success",
          description: "Content created successfully",
        });
      }

      setDialogOpen(false);
      loadContents();
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
      await deleteContent(id);
      
      toast({
        title: "Success",
        description: "Content deleted successfully",
      });
      
      loadContents();
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
        <ContentList 
          contents={contents}
          isLoading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
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
          <ContentForm
            formData={formData}
            selectedContent={selectedContent}
            isSubmitting={isSubmitting}
            onInputChange={handleInputChange}
            onSwitchChange={handleSwitchChange}
            onSelectChange={handleSelectChange}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default DashboardContent;
