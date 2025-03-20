
export interface ContentItem {
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

export interface ContentFormData extends Omit<ContentItem, 'id'> {}
