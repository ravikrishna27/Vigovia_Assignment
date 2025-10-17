import React, { useState } from 'react';
import { Plus, Trash2, Download } from 'lucide-react';

const ItineraryBuilder = () => {
  const [tripData, setTripData] = useState({
    customerName: 'Rahul',
    tripTitle: 'Singapore Itinerary',
    totalDays: 4,
    totalNights: 3,
    departureFrom: 'Mumbai',
    departureDate: '31/10/2025',
    arrivalDate: '01/11/2025',
    destination: 'Singapore',
    travelers: 4
  });

  const [days, setDays] = useState([
    {
      id: 1,
      date: '27th November',
      title: 'Arrival In Singapore & City Exploration',
      image: '',
      morning: 'Arrive in Singapore. Transfer From Airport To Hotel.',
      afternoon: 'Check Into Your Hotel.\nVisit Marina Bay Sands Sky Park (2-3 Hours).\nOptional: Stroll Along Marina Bay Waterfront Promenade Or Helix Bridge.',
      evening: 'Explore Gardens By The Bay, Including Super Tree Grove (3-4 Hours)'
    }
  ]);

  const [hotels, setHotels] = useState([
    {
      id: 1,
      city: 'Singapore',
      checkIn: '24/02/2024',
      checkOut: '24/02/2024',
      nights: 2,
      hotelName: 'Super Townhouse Oak Vashi Formerly Blue Diamond'
    }
  ]);

  const [flights, setFlights] = useState([
    {
      id: 1,
      date: 'Thu 10 Jan 24',
      airline: 'Air India (AX-123)',
      route: 'From Delhi (DEL) To Singapore (SIN)'
    }
  ]);

  const [activities, setActivities] = useState([
    {
      id: 1,
      city: 'Rio De Janeiro',
      activity: 'Sydney Harbour Cruise & Taronga Zoo',
      type: 'Nature/Sightseeing',
      timeRequired: '2-3 Hours'
    }
  ]);

  const [payment, setPayment] = useState({
    totalAmount: 900000,
    tcs: 'Not Collected',
    installments: [
      { id: 1, amount: 350000, dueDate: 'Initial Payment' },
      { id: 2, amount: 400000, dueDate: 'Post Visa Approval' },
      { id: 3, amount: 'Remaining', dueDate: '20 Days Before Departure' }
    ]
  });

  const [inclusions, setInclusions] = useState([
    { id: 1, category: 'Flight', count: 2, details: 'All Flights Mentioned', status: 'Awaiting Confirmation' },
    { id: 2, category: 'Tourist Tax', count: 2, details: 'Yotel (Singapore), Oakwood (Sydney), Mercure (Cairns), Novotel (Gold Coast), Holiday Inn (Melbourne)', status: 'Awaiting Confirmation' },
    { id: 3, category: 'Hotel', count: 2, details: 'Airport To Hotel - Hotel To Attractions - Day Trips If Any', status: 'Included' }
  ]);

  const addDay = () => {
    setDays([...days, {
      id: days.length + 1,
      date: '',
      title: '',
      image: '',
      morning: '',
      afternoon: '',
      evening: ''
    }]);
  };

  const removeDay = (id) => {
    setDays(days.filter(day => day.id !== id));
  };

  const updateDay = (id, field, value) => {
    setDays(days.map(day => day.id === id ? { ...day, [field]: value } : day));
  };

  const addHotel = () => {
    setHotels([...hotels, {
      id: hotels.length + 1,
      city: '',
      checkIn: '',
      checkOut: '',
      nights: 0,
      hotelName: ''
    }]);
  };

  const addFlight = () => {
    setFlights([...flights, {
      id: flights.length + 1,
      date: '',
      airline: '',
      route: ''
    }]);
  };

  const removeFlight = (id) => {
    setFlights(flights.filter(flight => flight.id !== id));
  };

  const addActivity = () => {
    setActivities([...activities, {
      id: activities.length + 1,
      city: '',
      activity: '',
      type: '',
      timeRequired: ''
    }]);
  };

  const removeActivity = (id) => {
    setFlights(activities.filter(activity => activity.id !== id));
  };
  const addInclusion = () => {
    setInclusions([...inclusions, {
      id: inclusions.length + 1,
      category: '',
      count: 0,
      details: '',
      status: ''
    }]);
  };

  const generatePDF = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    
    const daysHTML = days.map((day, index) => {
      return `
        <div class="day-card">
          <div class="day-sidebar">Day ${index + 1}</div>
          <div class="day-main">
            ${day.image ? `<img src="${day.image}" class="day-image" alt="Day ${index + 1}">` : ''}
            <div class="day-date">${day.date}</div>
            <div class="day-title">${day.title}</div>
            <div class="timeline">
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div>
                  <div class="timeline-label">Morning</div>
                  <div class="timeline-content">${day.morning}</div>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div>
                  <div class="timeline-label">Afternoon</div>
                  <div class="timeline-content">${day.afternoon}</div>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div>
                  <div class="timeline-label">Evening</div>
                  <div class="timeline-content">${day.evening}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const flightsHTML = flights.map(flight => {
      return `
        <tr>
          <td>${flight.date}</td>
          <td>Fly ${flight.airline} ${flight.route}</td>
        </tr>
      `;
    }).join('');

    const hotelsHTML = hotels.map(hotel => {
      return `
        <tr>
          <td>${hotel.city}</td>
          <td>${hotel.checkIn}</td>
          <td>${hotel.checkOut}</td>
          <td>${hotel.nights}</td>
          <td>${hotel.hotelName}</td>
        </tr>
      `;
    }).join('');

    const activitiesHTML = activities.map(activity => {
      return `
        <tr>
          <td>${activity.city}</td>
          <td>${activity.activity}</td>
          <td>${activity.type}</td>
          <td>${activity.timeRequired}</td>
        </tr>
      `;
    }).join('');

    const installmentsHTML = payment.installments.map((inst, idx) => {
      const amountText = typeof inst.amount === 'number' ? '₹' + inst.amount.toLocaleString('en-IN') : inst.amount;
      return `
        <tr>
          <td>Installment ${idx + 1}</td>
          <td>${amountText}</td>
          <td>${inst.dueDate}</td>
        </tr>
      `;
    }).join('');

    const inclusionsHTML = inclusions.map(inc => {
      return `
        <tr>
          <td>${inc.category}</td>
          <td>${inc.count}</td>
          <td>${inc.details}</td>
          <td>${inc.status}</td>
        </tr>
      `;
    }).join('');
    
    const pdfContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${tripData.tripTitle}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Arial', sans-serif;
      background: #f5f3f0;
      color: #2d1b69;
    }
    
    .page {
      background: white;
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto;
      padding: 20mm;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .logo {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .logo-vi {
      color: #6b46c1;
    }
    
    .logo-go {
      color: #2d1b69;
    }
    
    .tagline {
      font-size: 10px;
      color: #666;
      letter-spacing: 2px;
    }
    
    .hero-banner {
      background: linear-gradient(135deg, #5b9bd5 0%, #8b5fbf 100%);
      border-radius: 15px;
      padding: 30px;
      color: white;
      text-align: center;
      margin-bottom: 30px;
    }
    
    .hero-banner h1 {
      font-size: 32px;
      margin-bottom: 10px;
    }
    
    .hero-banner h2 {
      font-size: 28px;
      font-weight: 300;
      margin-bottom: 10px;
    }
    
    .hero-banner .duration {
      font-size: 18px;
      margin-bottom: 15px;
    }
    
    .trip-info {
      display: flex;
      justify-content: space-between;
      background: #fff;
      border-radius: 10px;
      border: 1px solid #2d1b69;
      padding: 20px;
      margin-bottom: 30px;
      font-size: 11px;
      color: #000;
    }
    
    .trip-info-item {
      flex: 1;
    }
    
    .trip-info-label {
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .day-card {
      display: flex;
      gap: 32px;
      margin-bottom: 30px;
      align-items: flex-start;
      page-break-inside: avoid;
    }
    
    .day-sidebar {
      background: #2d1b69;
      color: white;
      width: 130px;
      min-width: 130px;
      border-radius: 65px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 22px;
      height: 240px;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      text-align: center;
    }
    .day-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .day-image {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 16px;
      display :block;
    }
    
    .day-date {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 4px;
      color: #2d1b69;
    }
    
    .day-title {
      font-size: 16px;
      margin-bottom: 18px;
      color: #666;
    }
    
    .timeline {
      position: relative;
      padding-left: 30px;
    }
    
    .timeline::before {
      content: '';
      position: absolute;
      left: 11px;
      top: 0;
      width: 2px;
      bottom: 0;
      height: 100%;
      background: #5b9bd5;
      z-index: 0;
    }
    
    .timeline-item {
      position: relative;
      margin-bottom: 25px;
    }
    
    .timeline-dot {
      position: absolute;
      left: -26px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 3px solid #2d1b69;
      background: white;
    }
    
    .timeline-label {
      font-weight: bold;
      margin-bottom: 8px;
      color: #2d1b69;
      font-size: 13px;
    }
    
    .timeline-content {
      font-size: 11px;
      line-height: 1.6;
      color: #444;
      white-space: pre-line;
    }
    .timeline-item:last-child {
      margin-bottom: 0;
    }

    .timeline-item:last-child::after {
      content: '';
      display: block;
      position: absolute;
      left: 15px;
      top: 0;
      width: 2px;
      height: 0; /* Hide the line after the last item */
      background: transparent;
    }
    
    .section-title {
      font-size: 22px;
      font-weight: bold;
      margin: 40px 0 20px 0;
      color: #2d1b69;
    }
    
    .section-title span {
      color: #6b46c1;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
      font-size: 11px;
    }
    
    th {
      background: #2d1b69;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: bold;
    }
    
    td {
      background: #f9f7ff;
      padding: 12px;
      border-bottom: 2px solid white;
    }
    
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #666;
    }
    
    .footer-section {
      flex: 1;
    }
    
    .footer-logo {
      text-align: right;
    }
    
    @media print {
      body {
        background: white;
      }
      .page {
        margin: 0;
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="logo">
        <span class="logo-vi">vi</span><span class="logo-go">go</span><span class="logo-vi">via</span>
      </div>
      <div class="tagline">PLAN.PACK.GO</div>
    </div>
    
    <div class="hero-banner">
      <h1>Hi, ${tripData.customerName}!</h1>
      <h2>${tripData.tripTitle}</h2>
      <div class="duration">${tripData.totalDays} Days ${tripData.totalNights} Nights</div>
      <div class="hero-icons" style="margin-top:16px; display:flex; justify-content:center; gap:24px;">
        <img src="${window.location.origin}/flight.svg" alt="Flight" width="32" height="32" />
        <img src="${window.location.origin}/hotel.svg" alt="Hotel" width="32" height="32" />
        <img src="${window.location.origin}/Vector.svg" alt="Vector" width="32" height="32" />
        <img src="${window.location.origin}/taxi.svg" alt="Taxi" width="32" height="32" />
        <img src="${window.location.origin}/id.svg" alt="ID" width="32" height="32" />
      </div>
    </div>
    
    <div class="trip-info">
      <div class="trip-info-item">
        <div class="trip-info-label">Departure From:</div>
        <div>${tripData.departureFrom}</div>
      </div>
      <div class="trip-info-item">
        <div class="trip-info-label">Departure:</div>
        <div>${tripData.departureDate}</div>
      </div>
      <div class="trip-info-item">
        <div class="trip-info-label">Arrival:</div>
        <div>${tripData.arrivalDate}</div>
      </div>
      <div class="trip-info-item">
        <div class="trip-info-label">Destination:</div>
        <div>${tripData.destination}</div>
      </div>
      <div class="trip-info-item">
        <div class="trip-info-label">No. Of Travellers:</div>
        <div>${tripData.travelers}</div>
      </div>
    </div>
    
    ${daysHTML}
    
    <div class="footer">
      <div class="footer-section">
        <strong>Vigovia Tech Pvt. Ltd</strong><br>
        Registered Office: Hd-109 Cinnabar Hills,<br>
        Links Business Park, Karnataka, India.
      </div>
      <div class="footer-section">
        <strong>Phone:</strong> +91-9504061112<br>
        <strong>Email ID:</strong> Utkarsh@Vigovia.Com<br>
        <strong>CIN:</strong> U79110KA2024PTC191890
      </div>
      <div class="footer-logo">
        <div class="logo">
          <span class="logo-vi">vi</span><span class="logo-go">go</span><span class="logo-vi">via</span>
        </div>
        <div class="tagline">PLAN.PACK.GO</div>
      </div>
    </div>
  </div>
  
  <div class="page">
    <div class="header">
      <div class="logo">
        <span class="logo-vi">vi</span><span class="logo-go">go</span><span class="logo-vi">via</span>
      </div>
      <div class="tagline">PLAN.PACK.GO</div>
    </div>
    
    <h2 class="section-title">Flight <span>Summary</span></h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Flight Details</th>
        </tr>
      </thead>
      <tbody>
        ${flightsHTML}
      </tbody>
    </table>
    
    <h2 class="section-title">Hotel <span>Bookings</span></h2>
    <table>
      <thead>
        <tr>
          <th>City</th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Nights</th>
          <th>Hotel Name</th>
        </tr>
      </thead>
      <tbody>
        ${hotelsHTML}
      </tbody>
    </table>
    
    <h2 class="section-title">Activity <span>Table</span></h2>
    <table>
      <thead>
        <tr>
          <th>City</th>
          <th>Activity</th>
          <th>Type</th>
          <th>Time Required</th>
        </tr>
      </thead>
      <tbody>
        ${activitiesHTML}
      </tbody>
    </table>
    
    <h2 class="section-title">Payment <span>Plan</span></h2>
    <div style="background: #f9f7ff; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
      <strong>Total Amount:</strong> ₹ ${payment.totalAmount.toLocaleString('en-IN')} For 3 Pax (Inclusive Of GST)<br>
      <strong>TCS:</strong> ${payment.tcs}
    </div>
    
    <table>
      <thead>
        <tr>
          <th>Installment</th>
          <th>Amount</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        ${installmentsHTML}
      </tbody>
    </table>
    
    <h2 class="section-title">Inclusion <span>Summary</span></h2>
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Count</th>
          <th>Details</th>
          <th>Status / Comments</th>
        </tr>
      </thead>
      <tbody>
        ${inclusionsHTML}
      </tbody>
    </table>
    
    <div class="footer">
      <div class="footer-section">
        <strong>Vigovia Tech Pvt. Ltd</strong><br>
        Registered Office: Hd-109 Cinnabar Hills,<br>
        Links Business Park, Karnataka, India.
      </div>
      <div class="footer-section">
        <strong>Phone:</strong> +91-9504061112<br>
        <strong>Email ID:</strong> Utkarsh@Vigovia.Com<br>
        <strong>CIN:</strong> U79110KA2024PTC191890
      </div>
      <div class="footer-logo">
        <div class="logo">
          <span class="logo-vi">vi</span><span class="logo-go">go</span><span class="logo-vi">via</span>
        </div>
        <div class="tagline">PLAN.PACK.GO</div>
      </div>
    </div>
  </div>
</body>
</html>
    `;
    
    printWindow.document.write(pdfContent);
    printWindow.document.close();
    
    printWindow.onload = function() {
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-purple-900 mb-6">Itinerary Builder</h1>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-800">Trip Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Customer Name"
                value={tripData.customerName}
                onChange={(e) => setTripData({...tripData, customerName: e.target.value})}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Trip Title"
                value={tripData.tripTitle}
                onChange={(e) => setTripData({...tripData, tripTitle: e.target.value})}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Total Days"
                value={tripData.totalDays}
                onChange={(e) => setTripData({...tripData, totalDays: e.target.value})}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Total Nights"
                value={tripData.totalNights}
                onChange={(e) => setTripData({...tripData, totalNights: e.target.value})}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Departure From"
                value={tripData.departureFrom}
                onChange={(e) => setTripData({...tripData, departureFrom: e.target.value})}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Departure Date"
                value={tripData.departureDate}
                onChange={(e) => setTripData({...tripData, departureDate: e.target.value})}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Arrival Date"
                value={tripData.arrivalDate}
                onChange={(e) => setTripData({...tripData, arrivalDate: e.target.value})}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="Destination"
                value={tripData.destination}
                onChange={(e) => setTripData({...tripData, destination: e.target.value})}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Number of Travelers"
                value={tripData.travelers}
                onChange={(e) => setTripData({...tripData, travelers: e.target.value})}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-purple-800">Daily Itinerary</h2>
              <button
                onClick={addDay}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                <Plus size={20} /> Add Day
              </button>
            </div>
            
            {days.map((day, index) => (
              <div key={day.id} className="border border-gray-300 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-purple-700">Day {index + 1}</h3>
                  {days.length > 1 && (
                    <button
                      onClick={() => removeDay(day.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    placeholder="Date (e.g., 27th November)"
                    value={day.date}
                    onChange={(e) => updateDay(day.id, 'date', e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Day Title"
                    value={day.title}
                    onChange={(e) => updateDay(day.id, 'title', e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                
                <textarea
                  placeholder="Morning Activities"
                  value={day.morning}
                  onChange={(e) => updateDay(day.id, 'morning', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                  rows="2"
                />
                <textarea
                  placeholder="Afternoon Activities"
                  value={day.afternoon}
                  onChange={(e) => updateDay(day.id, 'afternoon', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                  rows="2"
                />
                <textarea
                  placeholder="Evening Activities"
                  value={day.evening}
                  onChange={(e) => updateDay(day.id, 'evening', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows="2"
                />
              </div>
            ))}
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-purple-800">Hotel Bookings</h2>
              <button
                onClick={addHotel}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                <Plus size={20} /> Add Hotel
              </button>
            </div>
            
            {hotels.map((hotel) => (
              <div key={hotel.id} className="grid grid-cols-5 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="City"
                  value={hotel.city}
                  onChange={(e) => setHotels(hotels.map(h => h.id === hotel.id ? {...h, city: e.target.value} : h))}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Check In"
                  value={hotel.checkIn}
                  onChange={(e) => setHotels(hotels.map(h => h.id === hotel.id ? {...h, checkIn: e.target.value} : h))}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Check Out"
                  value={hotel.checkOut}
                  onChange={(e) => setHotels(hotels.map(h => h.id === hotel.id ? {...h, checkOut: e.target.value} : h))}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Nights"
                  value={hotel.nights}
                  onChange={(e) => setHotels(hotels.map(h => h.id === hotel.id ? {...h, nights: e.target.value} : h))}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Hotel Name"
                  value={hotel.hotelName}
                  onChange={(e) => setHotels(hotels.map(h => h.id === hotel.id ? {...h, hotelName: e.target.value} : h))}
                  className="border border-gray-300 rounded px-3 py-2"
                />
              </div>
            ))}
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-purple-800">Flight Details</h2>
              <button
                onClick={addFlight}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                <Plus size={20} /> Add Flight
              </button>
            </div>
            
            {flights.map((flight) => (
  <div key={flight.id} className="grid grid-cols-3 gap-3 mb-3 items-center">
    <input
      type="text"
      placeholder="Date"
      value={flight.date}
      onChange={(e) => setFlights(flights.map(f => f.id === flight.id ? {...f, date: e.target.value} : f))}
      className="border border-gray-300 rounded px-3 py-2"
    />
    <input
      type="text"
      placeholder="Airline (e.g., Air India AX-123)"
      value={flight.airline}
      onChange={(e) => setFlights(flights.map(f => f.id === flight.id ? {...f, airline: e.target.value} : f))}
      className="border border-gray-300 rounded px-3 py-2"
    />
    <div className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Route (e.g., From Delhi (DEL) To Singapore (SIN))"
        value={flight.route}
        onChange={(e) => setFlights(flights.map(f => f.id === flight.id ? {...f, route: e.target.value} : f))}
        className="border border-gray-300 rounded px-3 py-2 flex-1"
      />
      <button
        type="button"
        onClick={() => removeFlight(flight.id)}
        className="ml-2 text-red-500 hover:text-red-700"
        title="Delete Flight"
      >
        <Trash2 size={20} />
      </button>
    </div>
  </div>
))}
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-purple-800">Activities</h2>
              <button
                onClick={addActivity}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                <Plus size={20} /> Add Activity
              </button>
            </div>
            
            {activities.map((activity) => (
              <div key={activity.id} className="grid grid-cols-4 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="City"
                  value={activity.city}
                  onChange={(e) => setActivities(activities.map(a => a.id === activity.id ? {...a, city: e.target.value} : a))}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Activity Name"
                  value={activity.activity}
                  onChange={(e) => setActivities(activities.map(a => a.id === activity.id ? {...a, activity: e.target.value} : a))}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Type"
                  value={activity.type}
                  onChange={(e) => setActivities(activities.map(a => a.id === activity.id ? {...a, type: e.target.value} : a))}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Time Required"
                  value={activity.timeRequired}
                  onChange={(e) => setActivities(activities.map(a => a.id === activity.id ? {...a, timeRequired: e.target.value} : a))}
                  className="border border-gray-300 rounded px-3 py-2"
                />
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">Payment Plan</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <input
                type="number"
                placeholder="Total Amount"
                value={payment.totalAmount}
                onChange={(e) => setPayment({...payment, totalAmount: parseInt(e.target.value) || 0})}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="TCS Status"
                value={payment.tcs}
                onChange={(e) => setPayment({...payment, tcs: e.target.value})}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
            
            <h3 className="font-semibold mb-2 text-purple-700">Installments</h3>
            {payment.installments.map((inst, index) => (
              <div key={inst.id} className="grid grid-cols-3 gap-3 mb-3">
                <div className="border border-gray-300 rounded px-3 py-2 bg-gray-50">
                  Installment {index + 1}
                </div>
                <input
                  type="text"
                  placeholder="Amount or 'Remaining'"
                  value={inst.amount}
                  onChange={(e) => {
                    const newInstallments = [...payment.installments];
                    const value = e.target.value;
                    newInstallments[index] = {...inst, amount: isNaN(value) ? value : parseInt(value) || 0};
                    setPayment({...payment, installments: newInstallments});
                  }}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Due Date"
                  value={inst.dueDate}
                  onChange={(e) => {
                    const newInstallments = [...payment.installments];
                    newInstallments[index] = {...inst, dueDate: e.target.value};
                    setPayment({...payment, installments: newInstallments});
                  }}
                  className="border border-gray-300 rounded px-3 py-2"
                />
              </div>
            ))}
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-purple-800">Inclusions</h2>
              <button
                onClick={addInclusion}
                className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                <Plus size={20} /> Add Inclusion
              </button>
            </div>
            
            {inclusions.map((inc) => (
              <div key={inc.id} className="grid grid-cols-4 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Category"
                  value={inc.category}
                  onChange={(e) => setInclusions(inclusions.map(i => i.id === inc.id ? {...i, category: e.target.value} : i))}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Count"
                  value={inc.count}
                  onChange={(e) => setInclusions(inclusions.map(i => i.id === inc.id ? {...i, count: e.target.value} : i))}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Details"
                  value={inc.details}
                  onChange={(e) => setInclusions(inclusions.map(i => i.id === inc.id ? {...i, details: e.target.value} : i))}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Status"
                  value={inc.status}
                  onChange={(e) => setInclusions(inclusions.map(i => i.id === inc.id ? {...i, status: e.target.value} : i))}
                  className="border border-gray-300 rounded px-3 py-2"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={generatePDF}
              className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-blue-600 shadow-lg transform hover:scale-105 transition-all"
            >
              <Download size={24} />
              Generate PDF Itinerary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryBuilder;