// import _ from 'lodash/fp';

import fullSchema31 from 'vets-json-schema/dist/28-1900-schema.json';

import IntroductionPage from '../components/IntroductionPage';
import ConfirmationPage from '../containers/ConfirmationPage';
import createVeteranInfoPage from '../../pages/veteranInfo';
import { facilityLocatorLink } from '../helpers';
import RehabProgramView from '../components/RehabProgramView';
import yearUI from '../../../common/schemaform/definitions/year';
import { validateYearRange } from '../validations';

const {
  vaRecordsOffice,
  previousPrograms,
  yearsOfEducation
} = fullSchema31.properties;

const {
  fullName,
  date,
  ssn,
  vaFileNumber,
  year
} = fullSchema31.definitions;

const formConfig = {
  urlPrefix: '/',
  submitUrl: '/v0/vre',
  trackingPrefix: 'vre-chapter-31',
  introduction: IntroductionPage,
  confirmation: ConfirmationPage,
  formId: '28-1900',
  version: 0,
  prefillEnabled: true,
  savedFormMessages: {
    notFound: '',
    noAuth: ''
  },
  title: 'Apply for Vocational Rehabilitation',
  subTitle: 'Form 28-1900',
  defaultDefinitions: {
    fullName,
    date,
    ssn,
    vaFileNumber,
    year
  },
  chapters: {
    veteranInformation: {
      title: 'Veteran Information',
      pages: {
        veteranInformation: createVeteranInfoPage(fullSchema31, {
          uiSchema: {
            vaRecordsOffice: {
              'ui:title': 'VA benefit office where your records are located',
              'ui:help': facilityLocatorLink
            }
          },
          schema: {
            vaRecordsOffice
          }
        })
      }
    },
    militaryHistory: {
      title: 'Military History',
      pages: {
        militaryHistory: {
          path: 'military-information',
          title: 'Military Information',
          schema: {
            type: 'object',
            properties: {
            }
          }
        }
      }
    },
    workInformation: {
      title: 'Work Information',
      pages: {
        workInformation: {
          path: 'work-information',
          title: 'Work Information',
          schema: {
            type: 'object',
            properties: {
            }
          }
        }
      }
    },
    educationInformation: {
      title: 'Education Information',
      pages: {
        educationInformation: {
          path: 'education-information',
          title: 'Education Information',
          uiSchema: {
            yearsOfEducation: Object.assign({}, yearUI, {
              'ui:title': 'Number of years of education completed including high school'
            }),
            previousPrograms: {
              'ui:options': {
                itemName: 'Program',
                viewField: RehabProgramView,
                hideTitle: true
              },
              'ui:title': 'List any VA or non-VA vocational rehabilitation programs you have been in.',
              items: {
                program: {
                  'ui:title': 'Name of program'
                },
                yearStarted: Object.assign({}, yearUI, {
                  'ui:title': 'Year you started the program'
                }),
                yearLeft: Object.assign({}, yearUI, {
                  'ui:title': 'Year you left the program'
                }),
                'ui:validations': [
                  validateYearRange
                ]
              }
            }
          },
          schema: {
            type: 'object',
            properties: {
              yearsOfEducation,
              previousPrograms
            }
          }
        }
      }
    },
    disabilityInformation: {
      title: 'Disability Information',
      pages: {
        disabilityInformation: {
          path: 'Disability-information',
          title: 'Disability Information',
          schema: {
            type: 'object',
            properties: {
            }
          }
        }
      }
    },
    contactInformation: {
      title: 'Contact Information',
      pages: {
        contactInformation: {
          path: 'contact-information',
          title: 'Contact Information',
          schema: {
            type: 'object',
            properties: {
            }
          }
        }
      }
    }
  }
};

export default formConfig;
