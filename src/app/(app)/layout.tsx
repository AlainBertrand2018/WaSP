
import ClientAppLayout from '@/components/layout/client-app-layout';
import React from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <ClientAppLayout>{children}</ClientAppLayout>;
}
