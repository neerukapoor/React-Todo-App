import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Navbar() {
    return <>
        <Box sx={{ flexGrow: 1 }}>
        <div >
            <AppBar>
            <Toolbar>
                <div style={{display:"flex", justifyContent:"space-between", width:"100%", alignItems:"center"}}>
                <h3>Todo</h3>
                    <a href='/login' style={{color:"black"}}>Login</a>
                </div>
            
            </Toolbar>
            
        </AppBar>
      </div>
      </Box>
    </>
}

export default Navbar;