
'use client';

import { ChevronRight } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function SidebarFooter() {
  const { setOpen, open } = useSidebar();

  if (open) {
    return null; // Don't show the button if the sidebar is already open
  }

  return (
    <div className="mt-auto">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => setOpen(true)}
            tooltip={{
              children: 'Expand for more',
              side: 'right',
              align: 'center',
            }}
          >
            <ChevronRight />
            <span className="sr-only">Expand for more</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
