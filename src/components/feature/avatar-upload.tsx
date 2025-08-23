
'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, UploadCloud } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type AvatarUploadProps = {
  onUpload: (url: string) => void;
  bucket: 'avatars' | 'covers';
  buttonText?: string;
};

export function AvatarUpload({ onUpload, bucket, buttonText = 'Upload' }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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

      // Upload to Supabase in the specified bucket
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
      
      toast({
        title: 'Upload Successful!',
        description: 'Your image has been uploaded.',
      });

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

  const handleClick = () => {
    fileInputRef.current?.click();
  };


  return (
    <div className="flex flex-col items-center gap-2">
      <Button onClick={handleClick} disabled={uploading} variant="secondary">
        {uploading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <UploadCloud className="mr-2 h-4 w-4" />
        )}
        <span>{uploading ? 'Uploading...' : buttonText}</span>
      </Button>
      <Input
        id={`upload-${bucket}`}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
        ref={fileInputRef}
      />
    </div>
  );
}
