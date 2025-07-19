import dayjs from 'dayjs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export const useDate = create(
  persist(
    (set) => ({
      tuNgay:  dayjs().startOf("month").toISOString(),
      setTuNgay: (date) => set({ tuNgay: date.toISOString() }),
      denNgay: dayjs().endOf("month").toISOString(),
      setDenNgay : (date) => set({denNgay : date.toISOString()})
    }),
    {
      name: 'date-storage', 
    }
  )
);