import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import HotelBookingModal from './HotelBookingModal';
import { Appcontext } from './Context';
import { hotels } from './constants';

const HotelCard = ({ location = '', filteredTags = [], selectedSort = '' }) => {
  const [selectedHotel, setSelectedHotel] = useState(false);
  const [HotelId, setHotelId] = useState('');

  const urlLocation = location ? location.toLowerCase() : 'Delhi' || 'delhi';
  let hotelData = hotels[urlLocation] || [];
  const { SearchHotel } = useContext(Appcontext);

  if (filteredTags?.length) {
    hotelData = hotelData.filter((eachHotel) => {
      let matchFound = true;
      eachHotel.amenities.forEach((tag) => {
        if (filteredTags.includes(tag)) {
          matchFound = false;
          return;
        }
      });
      return !matchFound;
    });
  }

  const callback = (a, b) => {
    const firstHotel = Number(a.ratings);
    const secondHotel = Number(b.ratings);
    if (firstHotel > secondHotel) {
      return -1;
    }
    if (firstHotel < secondHotel) {
      return 1;
    }
  };

  const callbackPriceHL = (a, b) => {
    const firstHotel = Number(a.price_per_night_INR);
    const secondHotel = Number(b.price_per_night_INR);
    if (firstHotel > secondHotel) {
      return -1;
    }
    return 1;
  };

  const callbackPriceLH = (a, b) => {
    const firstHotel = Number(a.price_per_night_INR);
    const secondHotel = Number(b.price_per_night_INR);
    if (firstHotel > secondHotel) {
      return 1;
    }
    return -1;
  };

  // Logic for sorting
  if (selectedSort?.length) {
    if (selectedSort === 'Ratings') {
      hotelData.sort((a, b) => callback(a, b));
    }
    if (selectedSort === 'Price High to Low') {
      hotelData.sort((a, b) => callbackPriceHL(a, b));
    }
    if (selectedSort === 'Price Low to High') {
      hotelData.sort((a, b) => callbackPriceLH(a, b));
    }
  }

  // Search logic
  if (SearchHotel?.length) {
    hotelData = hotelData.filter((eachHotel) => {
      if (eachHotel.name.toLowerCase().includes(SearchHotel.toLowerCase())) {
        return true;
      }
      return false;
    });
  }

  const handleclick = (id) => {
    setSelectedHotel(true);
    setHotelId(id);
  };

  return (
    <Grid item>
    <Grid container spacing={2} justifyContent="center" alignItems={"space-evenly"} >
      {hotelData.map((hotel, index) => {
        const { id, name, location, amenities, price_per_night_INR, image, ratings } = hotel;

        return (
          <Grid item 
          onClick={() => handleclick (id)}
        
          key={index} xs={12} sm={6} md={4}>
          
             <Card sx={{ maxWidth: 345,  height: '100%' }} >
                <div style={{ position: "relative" }}>
                  <CardMedia
                    sx={{ height: 275 }}
                    image={image}
                    title="green iguana"
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      backgroundColor: "#b3ca42",
                      width: 30,
                      height: 30,
                      textAlign: "center",
                    }}
                  >
                    <Typography color={"white"}>{ratings}</Typography>
                  </div>
                </div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {name}
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                 <b> {location}</b>
                </Typography>
                <br />
                <Typography variant="body2" color="text.secondary">
                  <b>Amenities: {amenities.join(", ")}</b>
                </Typography>
                <br />
              
                <Typography variant="body2" color="text.random">
                 <b> Price per night: {price_per_night_INR} INR</b> 
                </Typography>
              
              </CardContent>
              <CardActions>
                <Button size="small" target='_blank'>Book now</Button>
            
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
    <HotelBookingModal 
    location={location}
    setSelectedHotel={setSelectedHotel}
    selectedHotel={selectedHotel}
    HotelId = {HotelId}
    setHotelId = {setHotelId}
     />
    </Grid>
  );
};

export default HotelCard;
