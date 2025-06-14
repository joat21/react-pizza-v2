import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@UI';
import { Search } from './Search';

import { useUserQuery } from 'api/auth';
import { useCartQuery } from 'api/cart';

import { API_URL } from 'config';

import logo from '@assets/img/pizza-logo.svg';

export const Header: FC = () => {
  const { data: user, isLoading: isUserLoading } = useUserQuery();
  const { data: cart, isLoading: isCartLoading } = useCartQuery();

  return (
    <header>
      <div className="container flex justify-between items-center gap-10">
        <Link to="/" className="flex gap-[15px] shrink-0">
          <img width={38} src={logo} alt="Логотип React Pizza" />
          <div>
            <span className="text-2xl font-extrabold text-gray-900 uppercase">
              React Pizza
            </span>
            <p className="text-gray-500">самая вкусная пицца во вселенной</p>
          </div>
        </Link>
        <Search />
        <div className="flex gap-2.5 items-center shrink-0">
          {isUserLoading ? (
            <span>Скелетончик</span>
          ) : (
            <Button
              className="flex items-center gap-1 font-semibold"
              variant="outline"
              to={user ? '/profile' : `${API_URL}/auth/github`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Профиль</span>
            </Button>
          )}

          {isCartLoading ? (
            <span>Скелетончик</span>
          ) : (
            <Button className="flex items-center font-semibold" to="/cart">
              <span>{cart?.totalPrice} ₽</span>
              <span className="w-px h-6 mx-3.5 bg-white opacity-25" />
              <svg
                className="mr-2"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{cart?.totalCount}</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
