"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SneakerPage = () => {
  const router = useRouter();
  const [sneaker, setSneaker] = useState(null);

  useEffect(() => {
    // Check if sneaker data is passed in the router state
    if (router?.state?.product) {
      setSneaker(router.state.product);
    } else {
      // Handle the case where the user navigates directly to the URL without state
      // You can either redirect them back or fetch the data from your backend
      const id = router.query.id; // This gets the ID from the URL
      // Perform API call to fetch the sneaker by ID if no state is available
      fetch(`/api/sneakers/${id}`)
        .then((res) => res.json())
        .then((data) => setSneaker(data))
        .catch((err) => console.error('Failed to fetch sneaker:', err));
    }
  }, [router]);

  if (!sneaker) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sneaker-details">
      <nav>
        {/* Your navbar */}
        <a href="/">onFeet</a>
        <a href="/about">ABOUT</a>
        <a href="/explore">EXPLORE</a>
      </nav>
      <div className="container text-center">
        <h1>{sneaker.shoeName}</h1>
        <img src={sneaker.thumbnail} alt={sneaker.shoeName} className="img-fluid" />
        <p>{sneaker.description}</p>
        <h3>Resell Prices</h3>
        <p>StockX: ${sneaker.lowestResellPrice.stockX}</p>
        <p>FlightClub: ${sneaker.lowestResellPrice.flightClub}</p>
        <p>GOAT: ${sneaker.lowestResellPrice.goat}</p>
      </div>
    </div>
  );
};

export default SneakerPage;
