
import React from 'react';
import { Popup } from 'semantic-ui-react';

const CustomPopup = ({ content, children }) => <Popup inverted content={content} trigger={children} />;

export default CustomPopup;
