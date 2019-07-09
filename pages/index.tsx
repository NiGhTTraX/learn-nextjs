import React, {Component} from 'react';
import Link from 'next/link';

interface IndexProps {
  foo: string;
}

export default class Index extends Component<IndexProps> {
  static async getInitialProps(): Promise<IndexProps> {
    await new Promise(resolve => setTimeout(resolve, 100));

    return {
      foo: 'bar'
    }
  }

  render() {
    return <div>
      Hello {this.props.foo}!!!
      <Link href="/about">
          <a>About</a>
      </Link>
    </div>;
  }
}
