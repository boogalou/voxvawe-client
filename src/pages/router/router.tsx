import { createBrowserRouter } from 'react-router-dom';
import { routes } from 'shared/constants';
import { Auth } from 'pages/auth';
import { Im } from 'src/pages/im';
import { Chat } from 'components/chat';
import { Signin, Signup } from 'entities/auth';
import { AuthorizedRoute, PrivateRoute } from 'shared/ui';
import { Contactlist } from "components/left-sidebar/contactlist/contactlist";

export const router = createBrowserRouter([
  {
    path: routes.IM_PAGE,
    element: (
      <PrivateRoute>
        <Im />
      </PrivateRoute>
    ),
    children: [
      {
        path: routes.CHAT_PAGE,
        element: <Chat />,
      },
    ],
  },
  {
    path: routes.AUTH_PAGE,
    element: <Auth />,
    children: [
      {
        path: routes.SIGNUP_PAGE,
        element: <Signup />,
      },
      {
        path: routes.SIGNIN_PAGE,
        element: (
          <AuthorizedRoute>
            <Signin />
          </AuthorizedRoute>
        ),
      },
    ],
  },
]);
