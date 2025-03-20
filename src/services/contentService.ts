
import { supabase } from '@/integrations/supabase/client';
import { ContentItem, ContentFormData } from '@/types/content';

// Helper function to validate mode
export const validateMode = (mode: string): 'delivery' | 'takeaway' | 'both' => {
  if (mode === 'delivery' || mode === 'takeaway' || mode === 'both') {
    return mode as 'delivery' | 'takeaway' | 'both';
  }
  return 'both'; // Default fallback
};

export const fetchContents = async (): Promise<ContentItem[]> => {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .order('order_index', { ascending: true })
    .order('section', { ascending: true });

  if (error) throw error;
  
  // Map and validate the data before returning
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
  
  return validatedContents;
};

export const uploadImage = async (file: File): Promise<string | null> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = `content/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('site-images')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from('site-images').getPublicUrl(filePath);
  return data.publicUrl;
};

export const createContent = async (formData: ContentFormData): Promise<void> => {
  const { error } = await supabase
    .from('content')
    .insert([formData]);

  if (error) throw error;
};

export const updateContent = async (id: string, formData: ContentFormData): Promise<void> => {
  const { error } = await supabase
    .from('content')
    .update(formData)
    .eq('id', id);

  if (error) throw error;
};

export const deleteContent = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('content')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
