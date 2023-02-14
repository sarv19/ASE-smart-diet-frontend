/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

const Error = () => {
    return (
        <div className="error-page">
            <img alt="error" src="static/images/error.png" className="error-page-img"/>
            <div className="error-page-content">
                <p className="error-page-content-title">Sorry, something went wrong.</p>
                <p>We're working on it and we'll get it fix as soon as we can.</p>
                <Link href={'/'}>Go back</Link>
            </div>
        </div>
    )
}

export default Error;