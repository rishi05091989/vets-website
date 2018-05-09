import Raven from 'raven-js';

import recordEvent from '../../../../../platform/monitoring/record-event';
import { apiRequest, getStatus } from '../../../../letters/utils/helpers.jsx';

import {
  GET_ADDRESS_COUNTRIES_FAILURE,
  GET_ADDRESS_COUNTRIES_SUCCESS,
  GET_ADDRESS_STATES_FAILURE,
  GET_ADDRESS_STATES_SUCCESS,
} from '../../../../letters/utils/constants';

// TODO: determine if helpers belong in state folder
import { mergeAndLabelStateCodes } from '../helpers';

export function getAddressCountries() {
  return (dispatch) => {
    return apiRequest(
      '/v0/address/countries',
      null,
      (response) => {
        const countryList = response.countries.data.attributes.countries;
        dispatch({
          type: GET_ADDRESS_COUNTRIES_SUCCESS,
          countries: countryList,
          countriesAvailable: true
        });
        recordEvent({ event: 'pciu-get-address-countries-success' });
        // Log error if the countries response is not what we expect
        if (!Array.isArray(countryList) || countryList.length === 0) {
          return Raven.captureMessage(`vets_pciu_unexpected_country_response: ${countryList}`);
        }
      },
      (response) => {
        dispatch({ type: GET_ADDRESS_COUNTRIES_FAILURE });
        const status = getStatus(response);
        recordEvent({ event: 'pciu-get-address-countries-failure' });
        Raven.captureException(new Error(`vets_pciu_error_getAddressCountries: ${status}`));
      }
    );
  };
}

export function getAddressStates(onChange) {
  return (dispatch) => {
    return apiRequest(
      '/v0/address/states',
      null,
      (response) => {
        const stateList = mergeAndLabelStateCodes(response.states.data.attributes.states);
        dispatch({
          type: GET_ADDRESS_STATES_SUCCESS,
          states: stateList,
          statesAvailable: true
        });
        recordEvent({ event: 'pciu-get-address-states-success' });
        // Log error if the states response is not what we expect
        if (!Array.isArray(stateList) || stateList.length === 0) {
          return Raven.captureMessage(`vets_letters_unexpected_state_response: ${stateList}`);
        }
      },
      (response) => {
        const status = getStatus(response);
        recordEvent({ event: 'pciu-get-address-states-failure' });
        Raven.captureException(new Error(`vets_pciu_error_getAddressStates: ${status}`));
        return dispatch({ type: GET_ADDRESS_STATES_FAILURE });
      }
    );
  };
}
