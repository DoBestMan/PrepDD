import * as React from 'react'
import { shallow } from 'enzyme'
import CreateCompanyPage from '../../modules/auth/CreateCompanyPage'

test('Create new Company text', () => {
  const createComapny = shallow(<CreateCompanyPage />);
  expect(createComapny.text()).toContain('Create New Company')
}); 