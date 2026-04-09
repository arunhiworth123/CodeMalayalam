import React from 'react';
import Label from './label';
function MyList({ title, descr, isActive }) {
  return (
    <div className="app-list">
      <div className="list-item">
        <hr />
        <div className="list-title">
          <h4>{title}</h4>
        </div>
        <div className="list-descr">{descr}</div>
        <div className="list-label">
          <Label isActive={isActive} />
        </div>
        <hr />
      </div>
    </div>
  );
}
const List = (props) => {
  return <MyList {...props} />;
};
export default List;