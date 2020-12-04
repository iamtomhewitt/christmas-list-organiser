import React from 'react';
import './ChristmasListItem.scss';

const defaultImage = 'https://freeiconshop.com/wp-content/uploads/edd/gift-flat.png';

const trim = (name) => {
  const length = 21;
  return name.length > length ? `${name.substring(0, length)}...` : name;
};

const isImageUrl = (url) => {
  if (!url) return false;
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
};

const ItemForLoggedInUser = ({ item, remove }) => {
  const { name, image } = item;
  const imageToUse = isImageUrl(image) ? image : defaultImage;
  return (
    <li className="christmas-list-item">
      <button className="remove-button" onClick={() => remove(item)}>X</button>
      <img src={imageToUse} alt="Present" />
      <div>{trim(name)}</div>
    </li>
  );
};

const ItemForNonLoggedInUser = ({ item, dibItem }) => {
  const {
    name, dibbed, dibbedBy, image,
  } = item;
  const { firstName = '', lastName = '' } = dibbedBy || {};
  const imageToUse = isImageUrl(image) ? image : defaultImage;
  return (
    <li className="christmas-list-item">
      {!dibbed && <button className="dib-button" onClick={() => dibItem(name)}>Dib</button>}
      {dibbed && <div className="dibbed-banner">Dibbed by {firstName} {lastName}</div>}
      <img src={imageToUse} alt="Present" />
      <div>{trim(name)}</div>
    </li>
  );
};

export const ChristmasListItem = ({
  item, remove, dibItem, listIsForLoggedInUser,
}) => (listIsForLoggedInUser ? <ItemForLoggedInUser item={item} remove={remove} /> : <ItemForNonLoggedInUser item={item} dibItem={dibItem} />);
