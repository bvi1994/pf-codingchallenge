// LOGIN

fetch('', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: '', // username info
        password: '' // password
        }
      )
    })

//if authorized, returns:
{
  "access_token": "zA",
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
    "space": "Sm01", // This is the parking space number
    "xb_address": "41", // This is the zigbee mac address
    // and a whole bunch of stuff you can ignore
}


