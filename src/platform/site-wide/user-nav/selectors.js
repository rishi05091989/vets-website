import { createSelector } from 'reselect';
import _ from 'lodash';

import conditionalStorage from '../../utilities/storage/conditionalStorage';
import { selectProfile } from '../../user/selectors';

export const selectUserGreeting = createSelector(
  state => selectProfile(state).userFullName,
  state => selectProfile(state).email,
  () => conditionalStorage().getItem('userFirstName'),
  (name, email, sessionFirstName) => {
    if (name.first || sessionFirstName) {
      return _.startCase(_.toLower(
        name.first || sessionFirstName
      ));
    }

    return email;
  }
);
