import {memo} from 'react';
import {useSelector} from 'react-redux';
import {getChatWidgetCommand} from '../../../../../../selectors/chatSelectors';
import moment from 'moment';
import Button from '../../../../../Button';
import BaseWidget from '../BaseWidget';

const DateWidget = ({onSelected}) => {
  const command = useSelector(getChatWidgetCommand);
  const commandDate = moment(command).isValid() ? moment(command).utc() : moment().utc();
  const dates = (function genDates(collection, index) {
    const hasDays = collection.length === 5;
    if (hasDays) {
      return collection;
    }
    const momentClone = commandDate.clone().add(index, 'd');
    return genDates(![6, 7].includes(momentClone.isoWeekday()) ? collection.concat([momentClone]) : collection, index + 1);
  })([], 0);
  return (
    <BaseWidget title="Please select one of the below dates:">
      {dates.map((date, index) =>
        <Button key={index} onClick={() => onSelected(`Date set to ${date.format('dddd MM/DD')}`)}>
          {date.format('dddd')}
        </Button>
      )}
    </BaseWidget>
  );
};

export default memo(DateWidget);
