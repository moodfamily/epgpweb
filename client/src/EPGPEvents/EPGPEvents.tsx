import { LeftOutlined } from '@ant-design/icons';
import React from 'react';
import { Divider, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEvents } from '../useEvents';

export interface IEPGPEvents {
    name: string;
}

export const EPGPEvents: React.FC<IEPGPEvents> = ({
  name,
}: IEPGPEvents) => {
  const { events } = useEvents(name);
  const { t } = useTranslation();

  return (
    <>
      <Divider orientation="center">{name}</Divider>
      <Link to={'/'}><LeftOutlined />{t('Back to members')}</Link>
      {events?.map(e =>
        <Card size="small" title={e.type}>
          <p>{t('Time')}: {e.timestamp.toLocaleDateString()}</p>
          <p>{t('Reason')}: {e.reason}</p>
          <p>{t('Value')}: {e.value}</p>
        </Card>
      )}
    </>
  );
};
