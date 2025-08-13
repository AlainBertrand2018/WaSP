
import { create } from 'zustand';

type AudioPlayerState = {
  isOpen: boolean;
  audioSrc: string | null;
  openPlayer: (src: string) => void;
  closePlayer: () => void;
};

export const useAudioPlayerStore = create<AudioPlayerState>((set) => ({
  isOpen: false,
  audioSrc: null,
  openPlayer: (src) => set({ isOpen: true, audioSrc: src }),
  closePlayer: () => set({ isOpen: false, audioSrc: null }),
}));
