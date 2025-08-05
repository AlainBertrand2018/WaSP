
export type RecentFile = {
  id:string;
  name: string;
  date: string;
  size: string;
};

export const recentFiles: RecentFile[] = [
  {
    id: '1',
    name: 'Q3_Marketing_Deck.pdf',
    date: '2024-07-29',
    size: '2.3 MB',
  },
  {
    id: '2',
    name: 'New_Feature_Launch.txt',
    date: '2024-07-28',
    size: '12 KB',
  },
  {
    id: '3',
    name: 'Weekly_Update.txt',
    date: '2024-07-26',
    size: '5 KB',
  },
  {
    id: '4',
    name: 'Investor_Pitch_v2.pdf',
    date: '2024-07-25',
    size: '4.1 MB',
  },
];
