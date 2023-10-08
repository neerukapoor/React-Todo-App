import Card from '@mui/material/Card';

function Landing() {
    return <>
        <div>
            <Card style={{padding:"40px"}}>
                <h1>Welcome to Todo App</h1>
                <div style={{width:"100px", textAlign:"center", margin:"auto"}}>
                <div style={{ margin:"0px auto 10px"}}>
                    <a style={{padding:"10px", border: '2px solid #333',
                            borderRadius: '5px', display:"block", color:"blue", 
                            textDecoration:"none"}} href="/signup">Register</a>
                </div>
                <div>
                    <a style={{padding:"10px", border: '2px solid #333',
                            borderRadius: '5px', display:"block", color:"blue", 
                            textDecoration:"none"}} href="/login">Login</a>
                </div>
                </div>
            </Card>
            
        </div>
    </>
}

export default Landing;