import React, {Component} from 'react';
import Camera from 'react-html5-camera-photo';
// Note the above library does not work for Saferi, see: https://www.npmjs.com/package/react-html5-camera-photo
const fetch = require('node-fetch');

// Props to be used: isLoggedIn and API Token

const driverCheck = `https://flask.powerflexsystems.com/check_driver_membership`
// Will need to put this in a const file and export that

class MainPage extends Component {
  state = {
    qrCodeValue: '',
    parkingSpace: '',
    address: '',
  }

 changeQRCodeState = (event) => {
    this.setState({
      qrCodeValue: event.target.value
    })
  }

  submitQRCode = async () => {
    let QRResponse = await fetch(driverCheck, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.props.location.state.token },
        body: JSON.stringify({"qr_code": this.state.qrCodeValue}) // you can try "" for testing
    })
    // To Do: Implement the case if the QR response has failed
    console.log(QRResponse);
    QRResponse = await QRResponse.json();
    this.setState({
      address: QRResponse.xb_address,
      parkingSpace: QRResponse.space,
    })
  }

  render(){
    const {qrCodeValue} = this.state
    // To Do: Implement QR Code Scanning
    return (
      <div>
        <Camera />
        <input
          type='text'
          placeholder='Enter QR Code Number'
          value={qrCodeValue}
          onChange={e => this.changeQRCodeState(e)}
        />
        <button
          onClick={this.submitQRCode}
        >Submit QR Code</button>
        <p>{this.state.qrCodeValue}</p>
        {
          (this.state.parkingSpace && this.state.address) &&
          <p>The parking space is {this.state.parkingSpace} and the address is {this.state.address} </p>
        }
      </div>
    )
  }
}

export default MainPage;
