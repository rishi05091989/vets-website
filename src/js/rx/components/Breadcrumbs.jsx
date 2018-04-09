import _ from 'lodash';
import { Link } from 'react-router';
import React from 'react';
import { buildMobileBreadcrumb, debouncedToggleLinks } from '../../utils/breadcrumb-helper';

class Breadcrumbs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prevPath: '',
    };
  }

  componentDidMount() {
    buildMobileBreadcrumb('va-breadcrumbs-prescriptions', 'va-breadcrumbs-prescriptions-list');

    window.addEventListener('DOMContentLoaded', () => {
      buildMobileBreadcrumb.bind(this);
    });

    window.addEventListener('resize', () => {
      debouncedToggleLinks('va-breadcrumbs-prescriptions-list');
      debouncedToggleLinks.bind(this);
    });
  }

  componentDidUpdate() {
    buildMobileBreadcrumb('va-breadcrumbs-prescriptions', 'va-breadcrumbs-prescriptions-list');

    window.addEventListener('DOMContentLoaded', () => {
      buildMobileBreadcrumb.bind(this);
    });

    window.addEventListener('resize', () => {
      debouncedToggleLinks('va-breadcrumbs-prescriptions-list');
      debouncedToggleLinks.bind(this);
    });
  }

  componentWillUnmount() {
    window.removeEventListener('DOMContentLoaded', () => {
      buildMobileBreadcrumb.bind(this);
    });

    window.removeEventListener('resize', () => {
      debouncedToggleLinks.bind(this);
    });
  }

  render() {
    const { prescription } = this.props;

    const crumbs = [
      <a href="/" key="home">Home</a>,
      <a href="/health-care/" key="healthcare">Health Care</a>,
      <a href="/health-care/prescriptions/" key="healthcare">Prescription Refills</a>,
    ];

    if (prescription) {
      const prescriptionId = _.get(
        prescription,
        ['rx', 'attributes', 'prescriptionId']
      );

      const prescriptionName = _.get(
        prescription,
        ['rx', 'attributes', 'prescriptionName']
      );

      crumbs.push(<Link to={`/${prescriptionId}`} key="history">{prescriptionName}</Link>);
    }

    return (
      <nav
        aria-label="Breadcrumb"
        aria-live="polite"
        aria-relevant="additions text"
        className="va-nav-breadcrumbs"
        id="va-breadcrumbs-prescriptions">
        <p className="usa-sr-only">Breadcrumb navigation will usually show all page links. It will adjust to show only the previous page when zoomed in, or viewed on a mobile device.</p>
        <ol
          className="row va-nav-breadcrumbs-list columns"
          id="va-breadcrumbs-prescriptions-list">
          {crumbs.map((c, i) => {
            return <li key={i}>{c}</li>;
          })}
        </ol>
      </nav>
    );
  }
}

export default Breadcrumbs;
