
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DialogFooter,
} from '@/components/ui/dialog';
import { ContentFormData } from '@/types/content';

interface ContentFormProps {
  formData: ContentFormData;
  selectedContent: any | null;
  isSubmitting: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitchChange: (value: boolean) => void;
  onSelectChange: (name: string, value: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ContentForm: React.FC<ContentFormProps> = ({
  formData,
  selectedContent,
  isSubmitting,
  onInputChange,
  onSwitchChange,
  onSelectChange,
  onFileChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="section">Section Name *</Label>
            <Input
              id="section"
              name="section"
              value={formData.section}
              onChange={onInputChange}
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
              onChange={onInputChange}
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
            onChange={onInputChange}
            placeholder="Section title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            name="subtitle"
            value={formData.subtitle || ''}
            onChange={onInputChange}
            placeholder="Section subtitle"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={onInputChange}
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
              onChange={onFileChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mode">Display Mode</Label>
            <Select
              name="mode"
              value={formData.mode}
              onValueChange={(value) => onSelectChange('mode', value)}
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
              onCheckedChange={onSwitchChange}
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {selectedContent ? 'Update' : 'Create'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ContentForm;
