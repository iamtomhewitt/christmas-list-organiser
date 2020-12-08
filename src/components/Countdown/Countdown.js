import React from 'react';
import './Countdown.scss';

let intervalId;

class Countdown extends React.Component {
  constructor() {
    super();
    this.state = {
      countdown: '',
    };
  }

  componentDidMount() {
    intervalId = setInterval(() => {
      const christmasDay = new Date(`Dec 25, ${new Date().getFullYear()} 00:00:00`).getTime();

      const now = new Date().getTime();
      const distance = christmasDay - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      if (distance < 0) {
        clearInterval(intervalId);
      }

      this.setState({ countdown });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(intervalId);
  }

  render() {
    const { countdown } = this.state;
    return (
      <span className="countdown">
        <span role="img" aria-label="christmas">🎄</span>{countdown} <span role="img" aria-label="christmas">🎅🏼</span>
      </span>
    );
  }
}

export default Countdown;
