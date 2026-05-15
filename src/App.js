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

function AboutUsPage({ onBack }) {
  return (
    <div className="about-page">
      <button className="back-button" onClick={onBack}>
        Back
      </button>
      <div className="about-hero">
        <h1>About Vinayaka Mud Bricks</h1>
        <p>
          Vinayaka Mud Bricks is a leading manufacturer of sustainable clay bricks, combining traditional craftsmanship with modern quality standards.
          We deliver durable, eco-friendly building materials that reduce carbon footprint and create healthier, longer lasting structures.
        </p>
      </div>
      <div className="about-grid">
        <div className="about-card">
          <h2>Our Story</h2>
          <p>
            Founded on the promise of sustainable construction, we specialize in premium mud bricks made from local clay, water and skilled workmanship.
            Each brick is designed to provide strength, insulation and a natural finish for residential and commercial buildings.
          </p>
        </div>
        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            To make responsible building materials accessible to every home and builder.
            We believe in materials that respect the environment, conserve energy, and support local communities.
          </p>
        </div>
      </div>
      <div className="about-stat-row">
        <div className="about-stat">
          <strong>15+</strong>
          <span>Years of Excellence</span>
        </div>
        <div className="about-stat">
          <strong>100%</strong>
          <span>Natural Clay Bricks</span>
        </div>
        <div className="about-stat">
          <strong>Eco Friendly</strong>
          <span>Low Carbon Manufacturing</span>
        </div>
      </div>
      <div className="about-section">
        <h2>Why Choose Mud Bricks?</h2>
        <p>
          Mud bricks provide excellent thermal insulation, reducing the need for air-conditioning and heating.
          They are made from renewable materials, require less energy to produce, and create beautiful, timeless walls.
        </p>
      </div>
      <div className="about-columns">
        <div>
          <h3>Built for Strength</h3>
          <p>
            Our bricks are tested for durability and moisture resistance so your construction remains strong for years.
          </p>
        </div>
        <div>
          <h3>Designed for Comfort</h3>
          <p>
            Natural clay bricks regulate humidity and temperature, creating healthier indoor environments.
          </p>
        </div>
      </div>
    </div>
  );
}

function SettingsPage({ onBack }) {
  return (
    <div className="about-page">
      <button className="back-button" onClick={onBack}>
        Back
      </button>
      <div className="about-hero">
        <h1>Settings</h1>
        <p>
          Manage your account preferences, notification settings, and website experience from this page.
          Customize the way Vinayaka Mud Bricks works for you with simple, secure options.
        </p>
      </div>
      <div className="about-grid">
        <div className="about-card">
          <h2>Account</h2>
          <p>
            Update your profile information, change your password, and manage contact details safely and easily.
          </p>
        </div>
        <div className="about-card">
          <h2>Preferences</h2>
          <p>
            Choose your preferred display mode, notifications, and notifications for product updates.
          </p>
        </div>
      </div>
      <div className="about-stat-row">
        <div className="about-stat">
          <strong>Secure</strong>
          <span>Private account controls</span>
        </div>
        <div className="about-stat">
          <strong>Custom</strong>
          <span>Personalized settings</span>
        </div>
        <div className="about-stat">
          <strong>Fast</strong>
          <span>One-click adjustments</span>
        </div>
      </div>
      <div className="about-section">
        <h2>How to Use Settings</h2>
        <p>
          Use these controls to manage your site experience, keep your account information current, and stay updated with the latest mud brick innovations.
        </p>
      </div>
      <div className="about-columns">
        <div>
          <h3>Notifications</h3>
          <p>
            Enable or disable updates for news, offers, and product launches.
          </p>
        </div>
        <div>
          <h3>Privacy</h3>
          <p>
            Keep your information secure and choose what you want to share.
          </p>
        </div>
      </div>
    </div>
  );
}

function LogoutPage({ onBack }) {
  return (
    <div className="about-page">
      <button className="back-button" onClick={onBack}>
        Back
      </button>
      <div className="about-hero">
        <h1>Logout</h1>
        <p>
          You are about to end your session with Vinayaka Mud Bricks.
          If you are finished, simply confirm logout to return to the sign-in screen.
        </p>
      </div>
      <div className="about-grid">
        <div className="about-card">
          <h2>Session</h2>
          <p>
            Logging out ensures your account stays secure, especially on public or shared devices.
          </p>
        </div>
        <div className="about-card">
          <h2>Support</h2>
          <p>
            If you need help, visit our support page or contact our team before logging out.
          </p>
        </div>
      </div>
      <div className="about-stat-row">
        <div className="about-stat">
          <strong>Safe</strong>
          <span>Keep your account secure</span>
        </div>
        <div className="about-stat">
          <strong>Simple</strong>
          <span>Single click logout</span>
        </div>
        <div className="about-stat">
          <strong>Clear</strong>
          <span>Session ended cleanly</span>
        </div>
      </div>
      <div className="about-section">
        <h2>Confirm Logout</h2>
        <p>
          Click the button below to log out now. You will be returned to the home page immediately.
        </p>
      </div>
      <div className="about-columns">
        <div>
          <h3>Ready to leave?</h3>
          <p>
            Use logout when you have completed your work and want to secure your session.
          </p>
        </div>
        <div>
          <button className="logout-confirm" onClick={onBack}>
            Confirm Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductsPage({ onBack }) {
  return (
    <div className="about-page">
      <button className="back-button" onClick={onBack}>
        Back
      </button>
      <div className="about-hero">
        <h1>Products</h1>
        <p>
          Explore our range of Vinayaka Mud Bricks products designed for strength, durability, and eco-friendly construction.
          Each brick is crafted to deliver superior performance with a natural finish.
        </p>
      </div>
      <div className="about-grid">
        <div className="about-card">
          <h2>Standard Bricks</h2>
          <p>
            High-quality mud bricks for general construction, offering reliable load-bearing properties and excellent insulation.
          </p>
        </div>
        <div className="about-card">
          <h2>Eco Bricks</h2>
          <p>
            Manufactured with sustainable materials and processes, our eco bricks reduce carbon impact while maintaining strength.
          </p>
        </div>
      </div>
      <div className="about-grid">
        <div className="about-card">
          <h2>Pressed Bricks</h2>
          <p>
            Precision-pressed for uniform shape and size, ideal for architectural applications and premium finishes.
          </p>
        </div>
        <div className="about-card">
          <h2>Custom Solutions</h2>
          <p>
            Tailored brick products for specific project requirements, including size, color, and composition.
          </p>
        </div>
      </div>
      <div className="about-stat-row">
        <div className="about-stat">
          <strong>Quality</strong>
          <span>Trusted Materials</span>
        </div>
        <div className="about-stat">
          <strong>Range</strong>
          <span>Multiple Brick Types</span>
        </div>
        <div className="about-stat">
          <strong>Value</strong>
          <span>Built to Last</span>
        </div>
      </div>
      <div className="about-section">
        <h2>Our Product Promise</h2>
        <p>
          Every product is rigorously tested to ensure it meets our high standards for durability, moisture resistance, and thermal performance.
        </p>
      </div>
    </div>
  );
}

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

  const navItems = ['Home', 'About us', 'Products', 'Settings', 'Logout'];
  const routeMap = {
    home: 'Home',
    'about-us': 'About us',
    products: 'Products',
    settings: 'Settings',
    logout: 'Logout'
  };

  const routeForPage = (page) => {
    if (page === 'Home') return '/Home';
    return `/${page.replace(/\s+/g, '-').toLowerCase()}`;
  };

  const getPageFromPath = () => {
    if (typeof window === 'undefined') return 'Home';
    const path = decodeURIComponent(window.location.pathname.replace(/^\/+/, ''));
    if (!path) return 'Home';
    const normalized = routeMap[path.toLowerCase()] || 'Home';
    return normalized;
  };

  const [activePage, setActivePage] = useState(getPageFromPath);

  useEffect(() => {
    const updatePage = () => setActivePage(getPageFromPath());
    window.addEventListener('popstate', updatePage);
    return () => window.removeEventListener('popstate', updatePage);
  }, []);

  const navigateTo = (page) => {
    const path = routeForPage(page);
    window.history.pushState({}, page, path);
    setActivePage(page);
  };

  return (
<div className="App">
    <div className="app-header">
      <span className="header-title">Vinayaka Mud Bricks</span>
      {navItems.map((item) => (
        <span
          key={item}
          className={item === activePage ? 'active-nav-item' : ''}
          onClick={() => navigateTo(item)}
        >
          {item}
        </span>
      ))}
    </div>
    <div className="page-caption">{activePage}</div>
    {activePage === 'Home' ? (
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
    ) : activePage === 'About us' ? (
      <AboutUsPage onBack={() => navigateTo('Home')} />
    ) : activePage === 'Products' ? (
      <ProductsPage onBack={() => navigateTo('Home')} />
    ) : activePage === 'Settings' ? (
      <SettingsPage onBack={() => navigateTo('Home')} />
    ) : activePage === 'Logout' ? (
      <LogoutPage onBack={() => navigateTo('Home')} />
    ) : (
      <div className="page-only">
        <button className="back-button" onClick={() => navigateTo('Home')}>
          Back
        </button>
        <div className="page-display">{activePage}</div>
      </div>
    )}
    </div>
  );
 }
