import dayjs from 'dayjs';
import { set } from 'lodash';
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
export const useMenuStore = create(
  persist(
    (set) => ({
      menuId: '00000000-0000-0000-0000-000000000000',
      setMenuId: (id) => set({ menuId: id }),
    }),
    {
      name: 'menu-storage', 
      getStorage: () => localStorage,
    }
  )
);