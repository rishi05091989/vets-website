import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';

import { DefinitionTester } from '../../../../../platform/testing/unit/schemaform-utils.jsx';
import formConfig from '../../config/form.js';
import initialData from '../schema/initialData.js';

initialData.prefilled = false;

describe('526EZ veteran information', () => {
  const page = formConfig.chapters.veteranDetails.pages.veteranInformation;
  const { schema, uiSchema } = page;

  it('should render', () => {
    const form = mount(<DefinitionTester
      definitions={formConfig.defaultDefinitions}
      schema={schema}
      formData={{}}
      data={{}}
      uiSchema={uiSchema}/>
    );

    expect(form.find('AsyncDisplayWidget').length).to.equal(1);
  });

  it('should submit without validation errors', () => {
    const onSubmit = sinon.spy();
    const form = mount(<DefinitionTester
      definitions={formConfig.defaultDefinitions}
      schema={schema}
      formData={{}}
      data={{}}
      onSubmit={onSubmit}
      uiSchema={uiSchema}/>
    );

    form.find('form').simulate('submit');

    expect(form.find('.usa-input-error-message').length).to.equal(0);
    expect(onSubmit.called).to.be.true;
  });
});