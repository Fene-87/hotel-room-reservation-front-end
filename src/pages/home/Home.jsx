import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';
import 'react-multi-carousel/lib/styles.css';
import { NavLink, useLocation } from 'react-router-dom';
import HotelCard from '../../components/hotelCard/HotelCard';
import { fetchHotels } from '../../redux/home/homeSlice';
import Loading from '../loading/Loading';

const Home = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const loginUserData = JSON.parse(localStorage.getItem('user_data'));

  const { hotels, status } = useSelector((store) => store.home);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchHotels(loginUserData.user_id));
  }, [location, dispatch]);

  if (status === 'loading') {
    return <Loading />;
  }
  return (
    <main className="home-container">
      <h2 className="home-header">LATEST HOTELS</h2>
      <p className="home-text">Please select a hotel</p>

      <Carousel responsive={responsive} className="home-hotel-list">
        {hotels.map((hotel) => (
          <NavLink key={hotel.id} to={`/details/${hotel.id}`} className="nav-link">
            <HotelCard {...hotel} />
          </NavLink>
        ))}
      </Carousel>
    </main>
  );
};

export default Home;
