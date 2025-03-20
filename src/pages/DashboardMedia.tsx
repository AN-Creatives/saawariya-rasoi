
import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader2, Plus, MoreVertical, Copy, Trash2, X, ImageIcon } from 'lucide-react';

interface Media {
  id: string;
  name: string;
  url: string;
  created_at: string;
  size: number;
}

const DashboardMedia = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<Media | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .storage
        .from('site-images')
        .list('', {
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;

      const mediaWithUrls = await Promise.all(
        (data || []).map(async (file) => {
          const { data: urlData } = supabase
            .storage
            .from('site-images')
            .getPublicUrl(file.name);

          return {
            id: file.id,
            name: file.name,
            url: urlData.publicUrl,
            created_at: file.created_at,
            size: file.metadata?.size || 0
          };
        })
      );

      setMedia(mediaWithUrls);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to fetch media',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: 'Please select files to upload',
      });
      return;
    }

    setUploading(true);
    try {
      const results = await Promise.all(
        Array.from(selectedFiles).map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
          
          const { error } = await supabase
            .storage
            .from('site-images')
            .upload(fileName, file);

          if (error) throw error;
          return fileName;
        })
      );

      toast({
        title: "Success",
        description: `${results.length} file(s) uploaded successfully`,
      });
      fetchMedia();
      setSelectedFiles(null);
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || 'Error uploading files',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileName: string) => {
    try {
      const { error } = await supabase
        .storage
        .from('site-images')
        .remove([fileName]);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
      
      setFileToDelete(null);
      fetchMedia();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to delete file',
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Image URL has been copied to your clipboard",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground mt-2">
            Upload and manage images for your website.
          </p>
        </div>
      </div>

      <div className="mb-8 rounded-lg border bg-background p-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-end sm:space-x-4 sm:space-y-0">
          <div className="flex-1">
            <Input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              multiple
              className="h-auto py-2"
            />
          </div>
          <Button onClick={handleUpload} disabled={uploading || !selectedFiles}>
            {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Plus className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {media.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed text-center">
              <ImageIcon className="mb-4 h-8 w-8 text-muted-foreground" />
              <h3 className="text-lg font-medium">No media files found</h3>
              <p className="text-sm text-muted-foreground">
                Upload images to use them in your website.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {media.map((file) => (
                <Card key={file.id} className="overflow-hidden">
                  <div className="relative aspect-square w-full overflow-hidden bg-muted">
                    <img
                      src={file.url}
                      alt={file.name}
                      className="h-full w-full object-cover"
                      onClick={() => setSelectedFile(file)}
                    />
                    <div className="absolute right-2 top-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary" size="icon" className="h-8 w-8 bg-background/80 backdrop-blur-sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => copyToClipboard(file.url)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy URL
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive" 
                            onClick={() => setFileToDelete(file.name)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="truncate text-xs text-muted-foreground">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* Image Preview Dialog */}
      {selectedFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-4 -top-4 z-10 h-8 w-8 rounded-full bg-background text-foreground"
              onClick={() => setSelectedFile(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            <img
              src={selectedFile.url}
              alt={selectedFile.name}
              className="max-h-[90vh] max-w-[90vw] rounded-md object-contain"
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <div className="rounded-full bg-background/80 px-4 py-2 text-sm backdrop-blur-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={() => copyToClipboard(selectedFile.url)}
                >
                  <Copy className="mr-2 h-3 w-3" />
                  Copy URL
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!fileToDelete} onOpenChange={() => setFileToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              file from your media library.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => fileToDelete && handleDelete(fileToDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default DashboardMedia;
