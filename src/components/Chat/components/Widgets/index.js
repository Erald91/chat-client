import {memo} from 'react';
import {Alert} from 'react-bootstrap';
import Button from '../../../Button';
import {useSelector} from 'react-redux';
import {getChatWidget, getChatWidgetUsedCommands} from '../../../../selectors/chatSelectors';
import DateWidget from './components/DateWidget';
import RateWidget from './components/RateWidget';
import CompleteWidget from './components/Complete';
import MapWidget from './components/MapWidget';

export const WIDGETS = Object.freeze({
  DATE: 'date',
  MAP: 'map',
  RATE: 'rate',
  COMPLETE: 'complete'
});

const Widgets = ({onCommandTrigger, onSelected, onWidgetClear}) => {
  const widget = useSelector(getChatWidget);
  const usedCommands = useSelector(getChatWidgetUsedCommands)
  const getWidgetComponent = () => {
    if (!widget) {
      return;
    }
    if (usedCommands.includes(widget)) {
      return `Widget is already used, you can use it just once`;
    }
    switch(widget) {
      case WIDGETS.DATE:
        return <DateWidget onSelected={onSelected} />;
      case WIDGETS.RATE:
        return <RateWidget onSelected={onSelected} />;
      case WIDGETS.COMPLETE:
        return <CompleteWidget onSelected={onSelected} />;
      case WIDGETS.MAP:
        return <MapWidget />;
      default:
        return null;
    }
  };
  const header = () => {
    switch (widget) {
      case WIDGETS.DATE:
        return 'Date widget';
      case WIDGETS.MAP:
        return 'Map widget';
      case WIDGETS.RATE:
        return 'Rate widget';
      case WIDGETS.COMPLETE:
        return 'Complete widget';
      default:
        return null;
    }
  };
  return (
    <>
      <div className="widgets-container">
        <span className="widgets-container_label">Command:</span>
        <Button className="widgets-container_trigger" variant="secondary" onClick={() => onCommandTrigger()}>Trigger</Button>
      </div>
      {widget && (
        <Alert className="widgets-display" variant="success" onClose={onWidgetClear} dismissible>
          <Alert.Heading>{header() || `Unknown command`}</Alert.Heading>
          {getWidgetComponent()}
        </Alert>
      )}
    </>
  )
};

export default memo(Widgets);
