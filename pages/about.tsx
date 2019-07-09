import React, {Component} from 'react';
import Link from 'next/link';

export default class About extends Component {
  static async getInitialProps() {
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
    }
  }

  render() {
    return <div>
      About
      <Link href="/">
          <a>Back</a>
      </Link>;
    </div>;
  }
}
