import BaseWidget from '../BaseWidget';
import Button from '../../../../../Button';
import {useSelector} from 'react-redux';
import {getChatWidgetCommand} from '../../../../../../selectors/chatSelectors';

const CompleteWidget = ({onSelected}) => {
  const command = useSelector(getChatWidgetCommand);
  const options = command && Array.isArray(command) && command.length ? command : ['Yes', 'No'];
  return (
    <BaseWidget title="Do you want to finish conversation:">
      {options.map((option, index) =>
        <Button key={index} onClick={() => onSelected(`Complete resolution: "${option}"`)}>
          {option}
        </Button>
      )}
    </BaseWidget>
  );
};

export default CompleteWidget;
