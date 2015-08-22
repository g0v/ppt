import App from '../views/App.jsx';
import Home from '../views/Home.jsx';
import About from '../views/About.jsx';
import Governor from '../views/Governor.jsx';
import Commitment from '../views/Commitment.jsx';
import AddNewProgress from '../views/AddNewProgress.jsx';

export default function routes(store) {
  return {
    component: App,
    childRoutes: [
      {
        component: Home,
        path: '/',
      },
      {
        component: About,
        path: '/about',
      },
      {
        onEnter: Governor.onEnterCreator(store),
        component: Governor,
        path: '/governor/:name',
      },
      {
        onEnter: Commitment.onEnterCreator(store),
        component: Commitment,
        path: '/commitment/:id',
      },
      {
        onEnter: AddNewProgress.onEnterCreator(store),
        component: AddNewProgress,
        path: '/add',
      },
      {
        path: '*',
        onEnter(state, transition) {
          // You may choose to render a 404 PageView here.
          transition.to('/');
        },
      },
    ],
  };
}
