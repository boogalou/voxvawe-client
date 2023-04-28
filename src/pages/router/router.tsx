import {createBrowserRouter} from "react-router-dom";
import {routes} from "./routes";

import {Auth, Im} from "@/pages";
import {Chat} from "@/components";
import {Signin, Signup} from "@/entities/auth";
import {PrivateRoutes} from "@/shared/ui/private-route/PrivateRoutes";
import {Unauthorization} from "@/shared/ui/unauthorization/unauthorization";

export const router = createBrowserRouter([
  {
    path: routes.IM_PAGE,
    element: (
        <PrivateRoutes>
          <Im/>
        </PrivateRoutes>
    ),
    children: [
      {
        path: routes.CHAT_PAGE,
        element: <Chat/>
      }
    ]
  },
  {
    path: routes.AUTH_PAGE,
    element: <Auth/>,
    children: [
      {
        path: routes.SIGNUP_PAGE,
         element: <Signup/>
      },
      {
        path: routes.SIGNIN_PAGE,
        element: (
            <Unauthorization>
              <Signin/>
            </Unauthorization>
            )


      },
    ],
  }
]);