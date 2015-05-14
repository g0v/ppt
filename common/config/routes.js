export default {
  home: {
        path: '/',
        method: 'get',
        handler: require('../views/Home.jsx'),
        label: 'Home',
        action: (context, payload, done) => {
            context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: '政治承諾追蹤網 :: Home' });
            done();
        }
    },
  about: {
      path: '/about',
      method: 'get',
      handler: require('../views/About.jsx'),
      label: 'About',
      action: (context, payload, done) => {
          context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: '政治承諾追蹤網 :: About' });
          done();
      }
  },
  governor: {
      path: '/governor/:name',
      method: 'get',
      handler: require('../views/Governor.jsx'),
      label: 'Governor',
      action: (context, payload, done) => {
          var governorName = payload.get('params').get('name');
          context.dispatch('LOAD_PAGE', { name: governorName });
          context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: '政治承諾追蹤網 :: ' + governorName });
          done();
      }
  },
  promise: {
      path: '/promise/:id',
      method: 'get',
      handler: require('../views/Promise.jsx'),
      label: 'Promise',
      action: (context, payload, done) => {
          var promiseId = payload.get('params').get('id');
          context.dispatch('LOAD_PAGE', { id: promiseId });
          context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: '政治承諾追蹤網 :: ' + promiseId });
          done();
      }
  }
};
