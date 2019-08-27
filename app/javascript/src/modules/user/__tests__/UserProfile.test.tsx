import * as React from 'react';
import {shallow} from 'enzyme';
import UserProfilePage from '../UserProfile';
import ProfilePane from '../components/ProfilePane';
import NotificationPane from '../components/NotificationPane';

describe('User Profile Page', () => {
  it('renders profile pane', () => {
    const wrapper = shallow(<UserProfilePage />);
    expect(wrapper.find(ProfilePane).length).toBe(1);
  });

  it('renders notification pane', () => {
    const wrapper = shallow(<UserProfilePage />);
    expect(wrapper.find(NotificationPane).length).toBe(1);
  });
});
