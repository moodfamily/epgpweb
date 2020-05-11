import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import { Table, Input, Button, Space, Dropdown, Menu } from 'antd';
import React, { useRef } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { FilterDropdownProps } from 'antd/lib/table/interface';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useMemberCollections } from '../useMemberCollections';
import { dropdownStyle, filterDropdownStyle } from './Member.css';

export const Members: React.FC = React.memo(() => {
  const searchNodeRef = useRef<Input>(null);
  const { dates, members, refetchMembersSubject } = useMemberCollections();
  const { t } = useTranslation();

  const dropdownMenu = (
    <Menu onClick={({ key }) => refetchMembersSubject.next(key)}>
      {dates.map((date) => (
        <Menu.Item key={date.toISOString()} defaultValue={date.toISOString()}>
          {date.toLocaleDateString()}
        </Menu.Item>
      ))}
    </Menu>
  );

  const filterIcon = (filtered?: string) => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  );

  const filterDropdown = ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }: FilterDropdownProps) => (
    <div className={filterDropdownStyle}>
      <Input
        ref={searchNodeRef}
        placeholder={t('Search by name')}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={confirm}
        style={{ width: 200, marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={confirm}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
            {t('Search')}
        </Button>
        <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            {t('Reset')}
        </Button>
      </Space>
    </div>
  );

  const renderNameColumn = (text: string) =>
    <Link to={`/events/${text}`}> {text} </Link>;

  const columnDefs: ColumnsType<any> = [
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
      render: renderNameColumn,
      filterDropdown,
      filterIcon,
      onFilter: (value, record) =>
        record['name']
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchNodeRef.current?.select());
        }
      },
    },
    { title: t('Class'), dataIndex: 'className', key: 'className', render: (text: string) => t(text) },
    { title: 'EP', dataIndex: 'EP', key: 'EP' },
    { title: 'GP', dataIndex: 'GP', key: 'GP' },
    {
      title: 'PR',
      dataIndex: 'PR',
      key: 'PR',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => (a.PR > b.PR ? 1 : a.PR === b.PR ? 0 : -1),
      defaultSortOrder: 'descend',
    },
  ];

  return (
    <>
      <div className={dropdownStyle}>
        <Dropdown overlay={dropdownMenu} trigger={['click']}>
            <Button>
              {t('Select another snapshot')} <DownOutlined />
            </Button>
        </Dropdown>
      </div>
      <Table
        columns={columnDefs}
        dataSource={members}
        pagination={{
          position: ['topRight'],
        }}
      />
    </>
  );
});
