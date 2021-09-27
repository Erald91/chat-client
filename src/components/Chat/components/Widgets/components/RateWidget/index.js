import BaseWidget from '../BaseWidget';
import {useSelector} from 'react-redux';
import {getChatWidgetCommand} from '../../../../../../selectors/chatSelectors';
import Button from '../../../../../Button';
import {memo} from 'react';

const Rate = ({onSelected}) => {
  const command = useSelector(getChatWidgetCommand);
  const range = (
    command && Array.isArray(command) && command.length ? command : [1, 5]
  );
  const options = [];
  for (let index = Math.min(...range); index <= Math.max(...range); index++) {
    options.push(index);
  }
  return (
    <BaseWidget title="Please rate the conversation:">
      {options.map((option, index) =>
        <Button key={index} onClick={() => onSelected(`Conversation rated by ${option} points`)}>
          {option}
        </Button>
      )}
    </BaseWidget>
  );
};

export default memo(Rate);
