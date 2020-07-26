import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/post/:postSlug' component={Post} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
