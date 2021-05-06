import React from 'react';
import  Link from 'next/link';

const PageNotFound = () => {
    return <div>
        <h2>404: We couldn't find the page you are looking for</h2>
        <Link href="/"><a>Go To HomePage</a></Link>
    </div>
}

export default PageNotFound;