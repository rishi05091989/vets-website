import React from 'react';

import RoutedSavableApp from '../common/schemaform/save-in-progress/RoutedSavableApp';
import formConfig from './config/form';

export default function PreNeedApp({ location, children }) {
  return (
    <RoutedSavableApp formConfig={formConfig} currentLocation={location}>
      {children}
    </RoutedSavableApp>
  );
}