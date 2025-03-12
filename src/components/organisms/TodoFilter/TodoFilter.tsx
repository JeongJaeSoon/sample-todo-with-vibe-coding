import React from 'react';
import { Button } from '../../atoms/Button/Button';
import { Typography } from '../../atoms/Typography/Typography';
import { TodoFilter as FilterType } from '../../../types';
import {
  TodoFilterWrapper,
  FilterButtons,
  CountInfo,
} from './TodoFilter.styles';

export interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
}) => {
  return (
    <TodoFilterWrapper>
      <FilterButtons>
        <Button
          onClick={() => onFilterChange('all')}
          variant={filter === 'all' ? 'primary' : 'secondary'}
        >
          すべて
        </Button>
        <Button
          onClick={() => onFilterChange('active')}
          variant={filter === 'active' ? 'primary' : 'secondary'}
        >
          未完了
        </Button>
        <Button
          onClick={() => onFilterChange('completed')}
          variant={filter === 'completed' ? 'primary' : 'secondary'}
        >
          完了済み
        </Button>
      </FilterButtons>
      <CountInfo>
        <Typography variant="caption">
          未完了のタスク: {activeCount}件
        </Typography>
        <Typography variant="caption">
          完了したタスク: {completedCount}件
        </Typography>
      </CountInfo>
    </TodoFilterWrapper>
  );
};
