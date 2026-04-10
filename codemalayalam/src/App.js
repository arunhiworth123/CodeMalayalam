import React from 'react';
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
