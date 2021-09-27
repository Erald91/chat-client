import {memo} from 'react';
import {withGoogleMap, GoogleMap, withScriptjs} from 'react-google-maps';
import BaseWidget from '../BaseWidget';
import {getChatWidgetCommand} from '../../../../../../selectors/chatSelectors';
import {useSelector} from 'react-redux';

const MapWidget = () => {
  const command = useSelector(getChatWidgetCommand);
  const defaultCenter = {lat: command?.lat || -34.397, lng: command?.lng || 150.644};
  const WithGoogleMapWrapper = withScriptjs(withGoogleMap(
    props => <GoogleMap defaultZoom={10} defaultCenter={defaultCenter}></GoogleMap>
  ));
  return (
    <BaseWidget title="Check position in the map for the following coordinates:">
      <WithGoogleMapWrapper
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        containerElement={<div style={{ height: '400px', width: '100%' }} />}
        mapElement={<div style={{ height: '100%', width: '100%' }} />}
        loadingElement={<div style={{ height: `100%`, width: '100%' }} />}
      />
    </BaseWidget>
  );
};

export default memo(MapWidget);
