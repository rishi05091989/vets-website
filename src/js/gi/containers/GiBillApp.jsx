import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory, withRouter } from 'react-router';

import LoadingIndicator from '@department-of-veterans-affairs/jean-pants/LoadingIndicator';

import { enterPreviewMode, exitPreviewMode, fetchConstants } from '../actions';
import Modals from '../containers/Modals';
import PreviewBanner from '../components/heading/PreviewBanner';
import Breadcrumbs from '../../../platform/utilities/ui/Breadcrumbs';
import AboutThisTool from '../components/content/AboutThisTool';

const Disclaimer = () => {
  return (
    <div className="row disclaimer">
      <p>Please note: Content on this Web page is for informational purposes only. It is not intended to provide legal advice or to be a comprehensive statement or analysis of applicable statutes, regulations, and case law governing this topic. Rather, it’s a plain-language summary. If you are seeking claims assistance, your local VA regional office, a VA-recognized Veterans Service Organization, or a VA-accredited attorney or agent can help. <a target="_blank" href="https://www.va.gov/ogc/apps/accreditation/index.asp">Search Accredited Attorneys, Claims Agents, or Veterans Service Organizations (VSO) Representatives</a>.</p>
    </div>
  );
};

export class GiBillApp extends React.Component {
  constructor(props) {
    super(props);
    this.exitPreviewMode = this.exitPreviewMode.bind(this);
  }

  componentDidMount() {
    this.props.fetchConstants(this.props.location.query.version);
  }

  componentDidUpdate(prevProps) {
    const {
      preview,
      location: { query: { version: uuid } }
    } = this.props;

    const shouldExitPreviewMode = preview.display && !uuid;
    const shouldEnterPreviewMode = !preview.display && uuid && preview.version.createdAt;

    if (shouldExitPreviewMode) {
      this.props.exitPreviewMode();
    } else if (shouldEnterPreviewMode) {
      this.props.enterPreviewMode();
    }

    const shouldRefetchConstants = prevProps.location.query.version !== uuid;

    if (shouldRefetchConstants) {
      this.props.fetchConstants(uuid);
    }
  }

  exitPreviewMode() {
    const { location } = this.props;
    const query = { ...location.query };
    delete query.version;
    this.props.router.push({ ...location, query });
  }

  render() {
    const { constants, preview } = this.props;
    const { pathname, query: { version } } = this.props.location;

    const crumbs = [
      <a href="/" key="home">Home</a>,
      <a href="/education/" key="education">Education Benefits</a>,
      <a href="/education/gi-bill/" key="gi-bill">GI Bill</a>,
      <a href="/gi-bill-comparison-tool/" key="gi-bill">GI Bill® Comparison Tool</a>,
    ];

    if (pathname.match(/search|profile/)) {
      const root = { pathname: '/', query: (version ? { version } : {}) };
      crumbs.push(
        <Link
          to={root}
          onClick={browserHistory.goBack}
          key="search-results">
          Search Results
        </Link>
      );
    }

    // if (pathname.match(/profile/)) {
    //   if (this.props.includeSearch) {
    //     crumbs.push(<a onClick={browserHistory.goBack} key="search-results">Search Results</a>);
    //   }
    // }

    let content;

    if (constants.inProgress) {
      content = <LoadingIndicator message="Loading..."/>;
    } else {
      content = this.props.children;
    }

    return (
      <div className="gi-app">
        <div className="row">
          <div className="columns small-12">
            {
              preview.display &&
              (<PreviewBanner
                version={preview.version}
                onViewLiveVersion={this.exitPreviewMode}/>)
            }
            <Breadcrumbs crumbs={crumbs}/>
            {content}
            <AboutThisTool/>
            <Disclaimer/>
            <Modals/>
          </div>
        </div>
      </div>
    );
  }
}

GiBillApp.propTypes = {
  children: PropTypes.element.isRequired
};

const mapStateToProps = (state) => {
  const { constants, preview, search } = state;
  return { constants, preview, search };
};

const mapDispatchToProps = {
  enterPreviewMode,
  exitPreviewMode,
  fetchConstants
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GiBillApp));
