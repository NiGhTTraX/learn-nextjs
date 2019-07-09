import React, {Component} from 'react';
import Link from 'next/link';

export default class About extends Component {
  render() {
    return <div>
      About
      <Link href="/">
          <a>Back</a>
      </Link>;
    </div>;
  }
}
