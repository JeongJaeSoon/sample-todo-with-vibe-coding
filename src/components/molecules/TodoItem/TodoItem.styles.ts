import styled from 'styled-components';

export const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  margin-bottom: 8px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }
`;

export const TodoContent = styled.div`
  flex: 1;
  margin: 0 12px;
`;

export const TodoText = styled.div`
  font-size: 16px;
  word-break: break-word;
`;

export const TodoDate = styled.div`
  font-size: 12px;
  color: #6c757d;
  margin-top: 4px;
`;

export const TodoActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const EditForm = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const EditInput = styled.div`
  flex: 1;
  margin-right: 8px;
`;

export const EditActions = styled.div`
  display: flex;
  gap: 8px;
`;
