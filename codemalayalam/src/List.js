import React from 'react';

const obj = {
  title: "Appointment for October",
  descr: 'The patient is rescheduled to october',
  isActive: false
};

function MyList() {
  return (
    <div className="app-list">
      <div className="list-item">
        <hr />
        <div className="list-title">
          <h4>My Title One</h4>
        </div>
        <div className="list-descr">
          {obj.descr}
        </div>
        <div className="list-label">
          <span>Label 1</span>
          <span>Label 2</span>
        </div>
        <hr />
      </div>
    </div>
  );
}
class List extends React.Component {
  render() {
    return (
    
        <MyList />
    
    
    );
  }
}

export default List;