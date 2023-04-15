import {withStore} from "@/app/providers/with-store";
import compose from "compose-function";


export const withProviders = compose(withStore);