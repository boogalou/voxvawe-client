import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppState} from "app/store";

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;