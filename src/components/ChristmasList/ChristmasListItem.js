import React from 'react';
import PropTypes from 'prop-types';
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

const hasUrl = (url) => {
  return url && url !== "";
}

const ItemForLoggedInUser = ({ item, remove }) => {
  const {
    name, image, dibbed, url
  } = item;
  const imageToUse = isImageUrl(image) ? image : defaultImage;
  return (
    <li className="christmas-list-item">
      {!dibbed && <button className="remove-button" onClick={() => remove(item)} type="button">X</button>}
      <img src={imageToUse} alt="Present" />
      {hasUrl(url) ?
        <div><a target="_blank" rel="noopener noreferrer" href={url}>{trim(name)}</a></div>
        :
        <div>{trim(name)}</div>
      }
    </li>
  );
};

const ItemForNonLoggedInUser = ({ item, dibItem }) => {
  const {
    name, dibbed, dibbedBy, image, url,
  } = item;
  const { firstName = '', lastName = '' } = dibbedBy || {};
  const imageToUse = isImageUrl(image) ? image : defaultImage;
  return (
    <li className="christmas-list-item">
      {!dibbed && <button className="dib-button" onClick={() => dibItem(name)} type="button">Dib</button>}
      {dibbed && <div className="dibbed-banner">Dibbed by {firstName} {lastName}</div>}
      <img src={imageToUse} alt="Present" />
      {hasUrl(url) ?
        <div><a target="_blank" rel="noopener noreferrer" href={url}>{trim(name)}</a></div>
        :
        <div>{trim(name)}</div>
      }
    </li>
  );
};

const ChristmasListItem = ({
  item, remove, dibItem, listIsForLoggedInUser,
}) => (listIsForLoggedInUser ? <ItemForLoggedInUser item={item} remove={remove} /> : <ItemForNonLoggedInUser item={item} dibItem={dibItem} />);

ChristmasListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    url: PropTypes.string,
    dibbed: PropTypes.bool.isRequired,
    dibbedBy: PropTypes.object,
  }),
  remove: PropTypes.func.isRequired,
  dibItem: PropTypes.func.isRequired,
  listIsForLoggedInUser: PropTypes.bool.isRequired,
};

ItemForLoggedInUser.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    url: PropTypes.string,
    dibbed: PropTypes.bool.isRequired,
    dibbedBy: PropTypes.object,
  }),
  remove: PropTypes.func.isRequired,
};

ItemForNonLoggedInUser.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    url: PropTypes.string,
    dibbed: PropTypes.bool.isRequired,
    dibbedBy: PropTypes.object,
  }),
  dibItem: PropTypes.func.isRequired,
};

export default ChristmasListItem;
