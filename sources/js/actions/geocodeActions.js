export const GEOCODE_REQUEST = 'GEOCODE_REQUEST'
export const GEOCODE_RESPONSE = 'GEOCODE_RESPONSE'

const geocoder = new google.maps.Geocoder();

function geocodeLatLng(coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    return new Promise((resolve, reject) => {
        geocoder.geocode({ 'latLng': latLng }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                resolve(results);
            } else {
                reject(status);
            }
        });
    })
}

function geocodeRequest(coords) {
    return {
        type: GEOCODE_REQUEST,
        coords
    }
}

function geocodeResponse(address, name) {
    return {
        type: GEOCODE_RESPONSE,
        address
    }
}

export function geocode(coords) {
    return (dispatch) => {
        dispatch(geocodeRequest(coords))
        geocodeLatLng(coords).then(results => {
            if (results && results.length > 0) {
                var address = results[0].formatted_address;
                return dispatch(geocodeResponse(address))
            }
        })
    }
}
