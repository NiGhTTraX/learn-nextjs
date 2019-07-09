import React, {Component} from 'react';
import Link from 'next/link';
import connectToState, {StateContainer} from 'react-connect-state';

interface CounterState {
  counter: number;
  loading: boolean;
}

class Counter extends StateContainer<CounterState> {
  constructor(initialState: number = 0) {
    super();
    this.state = { counter: initialState, loading: initialState === 0 };
    !initialState && this.getData();
  }

  private async getData() {
    await new Promise(r => setTimeout(r, 1000));
    this.setState({ counter: 23, loading: false });
  }

  increment = () => {
    this.setState({counter: this.state.counter + 1 });
  }
}

interface IndexProps {
  initialCounter: CounterState;
}

class CounterView extends Component<{ counter: Counter }> {
  render() {
    if (this.props.counter.state.loading) {
      return <p>Loading...</p>
    }
    return <div>
      Hello {this.props.counter.state.counter}!!!
      <button onClick={this.increment}>Increment</button>
    </div>;
  }


  private increment = () => {
    this.props.counter.increment();
  }
}

async function wait(cb: () => boolean) {
  while (!cb()) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

export default class Index extends Component<IndexProps> {
  static async getInitialProps(): Promise<IndexProps> {
    const initialCounter = new Counter();

    if (typeof window === 'undefined') {
      await wait(() => !initialCounter.state.loading);
    }

    return {
      initialCounter: initialCounter.state
    }
  }

  private readonly counter = new Counter(this.props.initialCounter.counter);
  private readonly ConnectedCounter = connectToState(CounterView, {counter: this.counter});

  render() {
    const { ConnectedCounter } = this;

    return <div>
      <ConnectedCounter />>
      <Link href="/about">
          <a>About</a>
      </Link>
    </div>;
  }
}
