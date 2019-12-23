// LOGIN

fetch('https://flask.powerflexsystems.com/driver_auth', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: '', // ted+apptest@powerflex.com
        password: '' // testing
        }
      )
    })

//if authorized, returns:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjg1ZDg5OS04MDA1LTQ1ZTQtOTMwYi05MGUyZWMwZDczN2UiLCJleHAiOjE1NzU1ODU4NTQsImZyZXNoIjpmYWxzZSwiaWF0IjoxNTcyOTkzODU0LCJ0eXBlIjoiYWNjZXNzIiwibmJmIjoxNTcyOTkzODU0LCJpZGVudGl0eSI6InRlZCthcHB0ZXN0QHBvd2VyZmxleC5jb20ifQ.xjOFzTjiS4CNTKZ3j3R3q9BLFm3x1X3thlKgdKIdy0A",
  "allow_add_funds": true,
  "is_debugger": false,
  "payment_exempt": false,
  "pf_driver_admin": false
}
// bad password returns
{
    "msg": "Bad email or password"
  }

//--------------------------------
// QR CODE QUERY

fetch('https://flask.powerflexsystems.com/check_driver_membership', {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.state.access_token },
    body: {"qr_code": ""} // you can try "0001130211" for testing
  })

// upon success
{
    "space": "Sim01", // This is the parking space number
    "xb_address": "416685C7", // This is the zigbee mac address
    // and a whole bunch of stuff you can ignore
}


