
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, UploadCloud } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type AvatarUploadProps = {
  onUpload: (url: string) => void;
};

export function AvatarUpload({ onUpload }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `public/${fileName}`;

      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      onUpload(data.publicUrl);
      
    } catch (error: any) {
      toast({
        title: 'Upload Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={preview || 'https://placehold.co/100x100.png'} alt="Avatar preview" />
        <AvatarFallback>
            <UploadCloud />
        </AvatarFallback>
      </Avatar>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture-upload" className="sr-only">Picture</Label>
        <Input id="picture-upload" type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        {uploading && <p className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="animate-spin" /> Uploading...</p>}
      </div>
    </div>
  );
}
