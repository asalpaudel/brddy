import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { placeOrder } from '../../services/order';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { HiLocationMarker, HiSearch } from 'react-icons/hi';
import axios from 'axios';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const MapEvents = ({ setPosition }) => {
  const map = useMap();
  useMapEvents({
    click(e) {
      setPosition(e.latlng); 
      map.flyTo(e.latlng, map.getZoom()); 
    },
  });
  return null;
};

const Checkout = () => {
  
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  
  // State for form inputs
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' });
  const [shippingAddress, setShippingAddress] = useState('');
  const [remarks, setRemarks] = useState('');
  
  // State for the map
  const [mapPosition, setMapPosition] = useState({ lat: 27.7172, lng: 85.3240 }); // Default to Kathmandu
  const [locationQuery, setLocationQuery] = useState(''); // For the manual search input
  const mapRef = useRef(null);

  // Effect to check cart and pre-fill user data
  useEffect(() => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Redirecting you to products page.');
      navigate('/products');
    }
    const userEmail = localStorage.getItem('USER_EMAIL');
    const userFName = localStorage.getItem('USER_FNAME');
    if (userEmail) {
        setCustomerInfo(prev => ({ ...prev, email: userEmail, name: userFName || '' }));
    }
  }, [cartItems, navigate]);

  // Handler for text input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  // --- MAP FUNCTIONS ---

  // 1. Get location via device GPS
  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPos = { lat: latitude, lng: longitude };
        setMapPosition(newPos);
        if (mapRef.current) {
            mapRef.current.flyTo(newPos, 15); // Zoom in closer
        }
        toast.success("Location pinpointed!");
      },
      () => {
        toast.error("Could not get your location. Please enable location services in your browser.");
      }
    );
  };

  // 2. Get location via manual text search
  const handleLocationSearch = async (e) => {
    e.preventDefault();
    if (!locationQuery) return;
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${locationQuery}, Nepal`);
        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            const newPos = { lat: parseFloat(lat), lng: parseFloat(lon) };
            setMapPosition(newPos);
            if (mapRef.current) {
                mapRef.current.flyTo(newPos, 15);
            }
        } else {
            toast.error("Location not found. Please try a different or more specific search term.");
        }
    } catch (error) {
        toast.error("Failed to search for the location.");
    }
  };

  // --- FORM SUBMISSION ---
  
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !shippingAddress) {
      return toast.error('Please fill in all required shipping fields.');
    }

    const orderTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderData = {
      customerInfo: {
        name: customerInfo.name,
        phone: customerInfo.phone,
        email: customerInfo.email || 'guest@example.com'
      },
      shippingDetails: {
        address: shippingAddress,
        mapLocation: mapPosition,
      },
      items: cartItems,
      totalAmount: orderTotal,
      remarks,
      status: 'Pending',
      orderDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    try {
      await placeOrder(orderData);
      toast.success('Your order has been placed successfully!');
      
      // --- UPDATED: Call clearCart() on success ---
      clearCart();
      
      navigate('/my-orders');
    } catch (error) {
      toast.error('There was an error placing your order. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-stone-800 mb-6">Checkout</h1>
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: Form Fields */}
        <div className="space-y-6 bg-white p-8 rounded-lg shadow-lg h-fit">
          <h2 className="text-xl font-semibold">Shipping Information</h2>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-700">Full Name</label>
            <input type="text" name="name" id="name" value={customerInfo.name} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-stone-700">Phone Number</label>
            <input type="tel" name="phone" id="phone" value={customerInfo.phone} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
          </div>
          <div>
            <label htmlFor="shippingAddress" className="block text-sm font-medium text-stone-700">Full Shipping Address</label>
            <textarea name="shippingAddress" id="shippingAddress" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required></textarea>
          </div>
          <div>
            <label htmlFor="remarks" className="block text-sm font-medium text-stone-700">Order Remarks (Optional)</label>
            <textarea name="remarks" id="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="e.g., 'Happy Birthday!' for a cake."></textarea>
          </div>
        </div>

        {/* Right Side: Map and Order Summary */}
        <div className="space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Pin Delivery Location</h2>
                    <button 
                        type="button" 
                        onClick={handleGetCurrentLocation}
                        className="flex items-center gap-2 text-sm bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        <HiLocationMarker/>
                        Use My Location
                    </button>
                 </div>
                
                <form onSubmit={handleLocationSearch} className="flex gap-2 mb-4">
                    <input 
                        type="text"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        placeholder="e.g., Balaju, Kathmandu"
                        className="block w-full border-gray-300 rounded-md shadow-sm"
                    />
                    <button type="submit" className="bg-gray-700 text-white px-4 rounded-md hover:bg-gray-800 transition-colors">
                        <HiSearch/>
                    </button>
                </form>

                 <div className="h-64 w-full rounded-lg overflow-hidden border">
                    <MapContainer ref={mapRef} center={mapPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={mapPosition}></Marker>
                        <MapEvents setPosition={setMapPosition} />
                    </MapContainer>
                 </div>
            </div>
             <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <ul className="divide-y my-4">
                    {cartItems.map(item => (
                        <li key={item.id} className="flex justify-between py-2 text-sm">
                            <span>{item.name} x {item.quantity}</span>
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                    <span>Total</span>
                    <span>${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
                </div>
             </div>
        </div>
        
        {/* Submit Button spanning both columns */}
        <div className="md:col-span-2 text-right">
             <button type="submit" className="bg-amber-500 text-white px-8 py-3 rounded-md hover:bg-amber-600 transition-colors text-lg font-medium shadow-md">
                Place Order
            </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;