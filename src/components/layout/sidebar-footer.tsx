
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function SidebarFooter() {
  const { setOpen, open } = useSidebar();

  return (
    <div className="mt-auto">
      <SidebarMenu>
        <SidebarMenuItem>
          {open ? (
            <SidebarMenuButton onClick={() => setOpen(false)}>
              <ChevronLeft />
              <span>Collapse</span>
            </SidebarMenuButton>
          ) : (
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
          )}
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
