import {memo} from 'react';

const BaseWidget = ({title, children}) => {
  return (
    <div className="base-widget">
      {title && <div className="base-widget_label">{title}</div>}
      <div className="base-widget_content">
        {children}
      </div>
    </div>
  );
};

export default memo(BaseWidget);
