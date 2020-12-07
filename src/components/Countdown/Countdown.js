import React from 'react';
import './Countdown.scss';

class Countdown extends React.Component {
  constructor() {
    super();
    this.state = {
      countdown: '',
    };
  }

  componentDidMount() {
    const intervalId = setInterval(() => {
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

    this.setState({ intervalId });
  }

  componentWillUnmount() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  render() {
    const { countdown } = this.state;
    return (
      <span className="countdown">
        🎄{countdown} 🎅🏼
      </span>
    );
  }
}

export default Countdown;
