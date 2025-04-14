export interface DockItem {
  id: string;
  name: string;
  icon: string;
}

export const dockItems: { current: DockItem[] } = $state({ current: [] });
