import React, { FC } from 'react';
import './HomePage.scss';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi'; 

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="HomePage">
      <div className="header">
        {location.pathname !== '/' && (
          <button
            type="button"
            className="btn btn-secondary btn-back"
            onClick={() => navigate('/')}
          >
            <BiArrowBack className="back-icon" />
          </button>
        )}
        <h1>
          מערכת ניהול לקוחות
        </h1>
        <img
          src="https://i.pinimg.com/564x/15/8c/34/158c340cbcb41c73d8ca67d820843472.jpg"
          className="logo"
          alt="logo"
        />
      </div>
      <Outlet />
    </div>
  );
};

export default HomePage;
