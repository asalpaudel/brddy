import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { placeOrder } from '../../services/order'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

// Fix for default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : <Marker position={position}></Marker>
}

const Checkout = () => {
  const { cartItems } = useCart()
  const navigate = useNavigate()
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' })
  const [shippingAddress, setShippingAddress] = useState('')
  const [remarks, setRemarks] = useState('')
  const [mapPosition, setMapPosition] = useState({ lat: 27.7172, lng: 85.3240 }) // Default to Kathmandu

  useEffect(() => {
    // Redirect to home if cart is empty
    if (cartItems.length === 0) {
      toast.error('Your cart is empty.')
      navigate('/')
    }

    // Pre-fill user info if logged in
    const userEmail = localStorage.getItem('USER_EMAIL');
    const userFName = localStorage.getItem('USER_FNAME');
    if (userEmail) {
        setCustomerInfo(prev => ({ ...prev, email: userEmail, name: userFName || '' }));
    }
  }, [cartItems, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo({ ...customerInfo, [name]: value })
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    if (!customerInfo.name || !customerInfo.phone || !shippingAddress) {
      return toast.error('Please fill in all required fields.')
    }

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
      totalAmount: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      remarks,
      status: 'Pending',
      orderDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    }

    try {
      await placeOrder(orderData);
      toast.success('Order placed successfully!');
      // Here you would typically clear the cart, but our context doesn't support that yet.
      // For now, we'll just navigate away.
      navigate('/my-orders'); // Redirect to a new "My Orders" page
    } catch (error) {
      toast.error('Failed to place order.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-stone-800 mb-6">Checkout</h1>
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Form */}
        <div className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Shipping Information</h2>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-700">Full Name</label>
            <input type="text" name="name" id="name" value={customerInfo.name} onChange={handleInputChange} className="mt-1 block w-full input-field" required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-stone-700">Phone Number</label>
            <input type="tel" name="phone" id="phone" value={customerInfo.phone} onChange={handleInputChange} className="mt-1 block w-full input-field" required />
          </div>
          <div>
            <label htmlFor="shippingAddress" className="block text-sm font-medium text-stone-700">Full Shipping Address</label>
            <textarea name="shippingAddress" id="shippingAddress" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} rows="3" className="mt-1 block w-full input-field" required></textarea>
          </div>
          <div>
            <label htmlFor="remarks" className="block text-sm font-medium text-stone-700">Order Remarks (Optional)</label>
            <textarea name="remarks" id="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} rows="3" className="mt-1 block w-full input-field" placeholder="e.g., 'Happy Birthday, John!' for a cake order."></textarea>
          </div>
        </div>

        {/* Right Side: Map and Summary */}
        <div className="space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                 <h2 className="text-xl font-semibold mb-4">Pin Your Delivery Location</h2>
                 <div className="h-64 w-full" id="map">
                    <MapContainer center={mapPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LocationMarker position={mapPosition} setPosition={setMapPosition} />
                    </MapContainer>
                 </div>
            </div>
             <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <ul className="divide-y my-4">
                    {cartItems.map(item => (
                        <li key={item.id} className="flex justify-between py-2">
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                    <span>Total</span>
                    <span>${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
                </div>
             </div>
        </div>
        <div className="md:col-span-2 text-right">
             <button type="submit" className="bg-amber-500 text-white px-8 py-3 rounded-md hover:bg-amber-600 transition-colors text-lg font-medium">
                Place Order
            </button>
        </div>
      </form>
    </div>
  )
}

export default Checkout;