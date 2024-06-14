import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import LoginPage from './authentication/LoginPage';
import SignupPage from './authentication/Signup';
import Editor from './editor/Editor';

import firebaseConfig from './firebase/firebaseConfig';
import Authentication from './firebase/authentication';

import { initializeApp } from 'firebase/app';
import LoadingComponent from './component/loading';
import GiftCard from './components/giftCard';
import im1 from './components/im1.jpg';
import im2 from './components/im2.jpg';
import im3 from './components/im3.jpg';


const App = () => {

  initializeApp(firebaseConfig);

  const [initialised, setInitialized] = useState(null);

  let auth = new Authentication();
  useEffect(() => {
    auth.getAccess().then((result) => {
      setInitialized(true);
    }).catch((e) => {
      console.error(e);
    })
  });

  const AuthorizedRoute = ({ element }) => {
    return auth.getIsSignedIn() === true ? element : <Navigate to="/" />;
  };
  const UnauthorizedRoute = ({ element }) => {
    return auth.getIsSignedIn() === true ? <Navigate to="/notes" /> : element;
  };

  if (initialised === null) {
    return (
      <LoadingComponent />
    );
  }

  const cards = [
    // {
    //   image: 'https://t4.ftcdn.net/jpg/02/45/03/61/360_F_245036112_Lf5C4B2zfWbVGoF1rHAj7IFdLFiSXDQj.jpg',
    //   text: 'hey dear, you are very precious!',
    // },
    // {
    //   image: 'https://banner2.cleanpng.com/20180616/ihf/kisspng-paint-net-violet-barnali-bagchi-5b25c140a583d6.815373661529200960678.jpg',
    //   text: 'irritating you is my way of showing love for you dear!',
    // },
    // {
    //   image: im1,
    //   text: 'I Love you more than you think!',
    // },
    // {
    //   image: im2,
    //   text: 'have a happy corporate life my love, or bhulna mt mujhe nye logo se milkr',
    // },
    // {
    //   image: im3,
    //   text: 'this platform is a gift to you from my side my phuljari.'
    // }

    // {
    //   image: 'https://t4.ftcdn.net/jpg/02/45/03/61/360_F_245036112_Lf5C4B2zfWbVGoF1rHAj7IFdLFiSXDQj.jpg',
    //   text: 'hey beautiful, itna miss krri hai to message hi krde na!!',
    // },
    // {
    //   image: 'https://banner2.cleanpng.com/20180616/ihf/kisspng-paint-net-violet-barnali-bagchi-5b25c140a583d6.815373661529200960678.jpg',
    //   text: 'baar baar ye kyo open krri hai'
    // },
    // {
    //   image: im1,
    //   text: 'ho sakta mai bhi tujhe miss kr raha ho',
    // },
    // {
    //   image: im2,
    //   text: 'umeed hai teri corporate life achi chl rahi hogi',
    // },
    // {
    //   image: im3,
    //   text: 'hectic mt hone dena, iss platform ka use bhi krna, h1 is title, try it also'
    // }

    {
      image: 'https://t4.ftcdn.net/jpg/02/45/03/61/360_F_245036112_Lf5C4B2zfWbVGoF1rHAj7IFdLFiSXDQj.jpg',
      text: 'hey miss universe, kya haal cha hai!!',
    },
    {
      image: 'https://banner2.cleanpng.com/20180616/ihf/kisspng-paint-net-violet-barnali-bagchi-5b25c140a583d6.815373661529200960678.jpg',
      text: 'mai soch raha tha hmare bacho ki padhai late ho rahi, jldi kr lete hai ab bache :)'
    },
    {
      image: im1,
      text: 'chlo phir, jo hm immagine krte wo true krte hai, btao kab aau lene mrs aryan',
    },
    {
      image: im2,
      text: 'yr kab tk sapno me hi aaegi, ab to aaja real me milne',
    },
    {
      image: im3,
      text: 'mn to tera bhi krta tabhi mere letters dekh rahi yaha, lol',
    },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UnauthorizedRoute element={<LoginPage />} />} />
        <Route path="/signup" element={<UnauthorizedRoute element={<SignupPage />} />} />
        <Route path="/notes" element={<AuthorizedRoute element={<Editor />} />} />
        <Route path="/arush" element={<AuthorizedRoute element={<GiftCard cards={cards} />} />} />
      </Routes>

    </Router>
  );
};

export default App;
