import { Grid} from '@mui/material';
import React from 'react';



const Footer = () => {
  return (
  
    <footer className="footer mt-auto py-3 bg-light">
    
      <Grid>
        <Grid item>
      <div className="container text-center">
        <p>&copy; 2024 BookHaven. All rights reserved.</p>
        <ul className="list-inline">
          <li className="list-inline-item"><a href="#">Privacy</a></li>
          <li className="list-inline-item"><a href="#">Terms</a></li>
          <li className="list-inline-item"><a href="#">FAQ</a></li>
        </ul>
      </div>
      </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
