import React from 'react';
import { shallow } from 'enzyme';

import PostCard from "../../components/PostCard";
import moment from "moment";


it('renders without crashing', () => {
  const fakePost = {
    id: '123223232',
    body: 'test post',
    createdAt: moment().toISOString(),
    userName: 'admin',
    likeCount: 0,
    likes: [],
    commentCount: 0,
    comments: []
  };

  const wrapper = shallow(<PostCard post={fakePost} />);

  expect(wrapper).toBeTruthy();
});
