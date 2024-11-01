const axios = require('axios');
const User = require('../models/User');
const Inventory = require('../models/Inventory');

exports.calculateOptimalRoute = async (req, res) => {
    try {
      const inventoryOne = await Inventory.findOne({ name: 'Central Inventory' });
      const inventoryTwo = await Inventory.findOne({ name: 'Inventory 2' });
  
      if (!inventoryOne || !inventoryTwo) {
        return res.status(404).json({ error: 'Inventory locations not found' });
      }

      const customers = await User.find().limit(5);
      const customerWaypoints = customers
        .map(customer => `${customer.coordinates.latitude},${customer.coordinates.longitude}`)
        .join('|');
  
      const origin = `${inventoryOne.coordinates.latitude},${inventoryOne.coordinates.longitude}`;
      const destination = `${inventoryTwo.coordinates.latitude},${inventoryTwo.coordinates.longitude}`;
      const apiKey = process.env.GOOGLE_API_KEY;
  

      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=optimize:true|${customerWaypoints}&key=${apiKey}`;

      const response = await axios.get(url);
      const routeData = response.data;
      
      res.json(routeData);
      verifyOptimizedRoute(routeData);
  
    } catch (error) {
      console.error("Error calculating optimal route:", error);
      res.status(500).json({ error: 'Failed to calculate the optimal route' });
    }
  };
  
  function verifyOptimizedRoute(response) {
    if (response && response.routes && response.routes.length > 0) {
      const route = response.routes[0];
      const waypointOrder = route.waypoint_order;
      const legs = route.legs;
  
      console.log("Optimized Waypoint Order:", waypointOrder);
  
      let totalDistance = 0;
      let totalDuration = 0;
  
      legs.forEach((leg, index) => {
        console.log(`Leg ${index + 1}:`);
        console.log(`  Start Address: ${leg.start_address}`);
        console.log(`  End Address: ${leg.end_address}`);
        console.log(`  Distance: ${leg.distance.text}`);
        console.log(`  Duration: ${leg.duration.text}`);
  
        totalDistance += leg.distance.value;
        totalDuration += leg.duration.value;
      });
  
      console.log("Total Distance (meters):", totalDistance);
      console.log("Total Duration (seconds):", totalDuration);
    } else {
      console.error("Invalid response or route data missing.");
    }
  }
  
  
