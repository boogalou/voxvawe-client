import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";

import { Im, Auth } from "@/pages";
export const router = createBrowserRouter([
  {
    path: routes.IM_PAGE,
    element: <Im/>,
    children: [

    ]
  },
  {
    path: routes.AUTH_PAGE,
    element: <Auth/>,
    children: [
      // {
      //   path: routes.SIGNUP_PAGE,
      //    element: <Signup/>
      // },
      // {
      //   path: routes.SIGNIN_PAGE,
      //   element:
        // <Signin/>

      // },
    ],
  }
]);