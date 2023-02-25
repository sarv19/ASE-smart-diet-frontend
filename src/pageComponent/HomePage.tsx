import Link from "next/link";

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="homepage-img">
        <img src={'static/images/right_place.svg'} alt='Working girl'/>
      </div>
      <div className="homepage-content">
        <div className="homepage-content-title">Welcome back!</div>
        <div className="homepage-content-subtitle">What would you like to do today?</div>
        <Link href={'/daily-diet'} className="homepage-content-btn">
          <button>Check meals</button>
        </Link>
        <Link href={'/diet'} className="homepage-content-btn">
          <button>See my diet</button>
        </Link>
        <Link href={'/summary'} className="homepage-content-btn">
          <button>Progess summary</button>
        </Link>
      </div>
    </div>
  )
};

export default HomePage;