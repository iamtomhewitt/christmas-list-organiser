import React from 'react';
import './ChristmasListItem.scss';

const trim = (name) => {
  const length = 21;
  return name.length > length ? `${name.substring(0, length)}...` : name;
};

const ItemForLoggedInUser = ({ item, remove }) => {
  const { name } = item;
  return (
    <li className="christmas-list-item">
      <button className="remove-button" onClick={() => remove(item)}>X</button>
      <img src="https://freeiconshop.com/wp-content/uploads/edd/gift-flat.png" alt="" />
      <div>{trim(name)}</div>
    </li>
  );
};

const ItemForNonLoggedInUser = ({ item, dibItem }) => {
  const { name, dibbed, dibbedBy } = item;
  const { firstName = '', lastName = '' } = dibbedBy || {};
  return (
    <li className="christmas-list-item">
      {!dibbed && <button className="dib-button" onClick={() => dibItem(name)}>Dib</button>}
      {dibbed && <div className="dibbed-banner">Dibbed by {firstName} {lastName}</div>}
      <img src="https://freeiconshop.com/wp-content/uploads/edd/gift-flat.png" alt="" />
      <div>{trim(name)}</div>
    </li>
  );
};

export const ChristmasListItem = ({
  item, remove, dibItem, listIsForLoggedInUser,
}) => (
  listIsForLoggedInUser ? <ItemForLoggedInUser item={item} remove={remove} /> : <ItemForNonLoggedInUser item={item} dibItem={dibItem} />
);
