import React, { useEffect, useState } from 'react';
import './App.css';
import List from './List/List.js';
import {TodoFetcher,Increment} from './TodoFetcher.js';
import avatar1 from './assets/images/avatar1.png';
import avatar2 from './assets/images/avatar2.png';
import avatar3 from './assets/images/avatar3.png';
import avatar4 from './assets/images/avatar4.png';
import avatar5 from './assets/images/avatar5.png';

const defaultUser = {
  imageSize: 90,
  borderRadius: '20px'
};

const COUNTDOWN_DAYS = 60;

function getReleaseDate() {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedDate = localStorage.getItem('releaseDate');
  if (storedDate) {
    return new Date(storedDate);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const releaseDate = new Date(today);
  releaseDate.setDate(releaseDate.getDate() + COUNTDOWN_DAYS);
  localStorage.setItem('releaseDate', releaseDate.toISOString());
  return releaseDate;
}

function getDaysLeft(releaseDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(releaseDate);
  targetDate.setHours(0, 0, 0, 0);

  const diffMs = targetDate - today;
  return diffMs > 0 ? Math.round(diffMs / (1000 * 60 * 60 * 24)) : 0;
}


const obj = [
  {
    Name : "Suja",
    Image : avatar1,
    title: "Appointment for October",
    descr: "The patient is rescheduled to October",
    isActive: false
  },
  {
    Name: "Janvi",
    Image : avatar2,
    title: "Appointment for November",
    descr: "The patient have Bp problem",
    isActive: true  
  },
  {
    Name : "Arun",
    Image : avatar3,
    title: "Appointment for December",
    descr: "Chrinic allergetic Problemr",
    isActive: false
  },
   {
    Name: "Sunil",
    Image : avatar4,
    title: "Appointment for December",
    descr: "Unknown desise",
    isActive: true  
  },
  {
    Name : "Kumar",
    Image : avatar5,
    title: "Appointment for November",
    descr: "Recovering Fast",
    isActive: false
  }
];

export default function App() {
  const [daysLeft, setDaysLeft] = useState(() => {
    const releaseDate = getReleaseDate();
    return releaseDate ? getDaysLeft(releaseDate) : COUNTDOWN_DAYS;
  });

  useEffect(() => {
    const releaseDate = getReleaseDate();
    if (!releaseDate) {
      return undefined;
    }

    const timer = setInterval(() => {
      setDaysLeft(getDaysLeft(releaseDate));
    }, 1000 * 60 * 60);

    return () => clearInterval(timer);
  }, []);

  const releaseMessage = daysLeft > 0
    ? `A new video arrives in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`
    : 'A new video is now available!';

  return (
<div className="App">
    <div className="app-header">
    <span className="header-title">Code Malayalam </span>
    <span>Home </span>
    <span>Usage </span>
    <span>Settings </span>
    <span>Logout </span>
    </div>
<div className="app-body">
    <div className="video-countdown">{releaseMessage}</div>
    <Increment/>
    <TodoFetcher />
      {
      obj.map((Item, index) => {
        const name = Item.Name || Item.name || 'Unknown';
        const imageUrl = Item.Image || Item.image || avatar5;
        const title = Item.title || 'Appointment';
        const descr = Item.descr || 'No details provided';
        const isActive = Item.isActive || false;

        return (
          <div key={index} className="item">
            <List title={title} descr={descr} isActive={isActive} />
            <h1>{name}</h1>
            <img
              className="avatar"
              src={imageUrl}
              alt={'Photo of ' + name}
              style={{
                width: defaultUser.imageSize,
                height: defaultUser.imageSize,
                borderRadius: defaultUser.borderRadius
              }}
            />
          </div>
        );
      })}
      </div>
    </div>
  );
 }
