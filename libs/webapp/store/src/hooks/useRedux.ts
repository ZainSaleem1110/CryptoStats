import {
  TypedUseSelectorHook,
  useDispatch as useDispatchLegacy,
  useSelector as useSelectorLegacy,
} from 'react-redux';

import { RootState, AppDispatch } from '..';

// !! Only use useDispatch and useSelector from here for type checking !!

export const useDispatch = () => useDispatchLegacy<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorLegacy;
