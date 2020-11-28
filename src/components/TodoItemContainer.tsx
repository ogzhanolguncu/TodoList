import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, Checkbox, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

type TodoItemContainerProps = {
  item: TodoProps;
  index: number;
  handleDelete: (id: string) => void;
  handleClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => void;
};

export const TodoItemContainer = ({
  item,
  handleDelete,
  handleClick,
}: TodoItemContainerProps) => {
  return (
    <>
      <Flex flexDirection='row' justifyContent='space-between'>
        <Checkbox
          size='lg'
          colorScheme='orange'
          isChecked={item.state === 'Completed'}
          onClick={(e) => handleClick(e, item.id)}
        >
          <Text
            textDecoration={item.state === 'Active' ? 'none' : 'line-through'}
          >
            {item.desc}
          </Text>
        </Checkbox>
        <IconButton
          colorScheme='orange'
          aria-label='Delete'
          size='md'
          marginRight='1rem'
          onClick={() => handleDelete(item.id)}
          icon={<DeleteIcon />}
        />
      </Flex>
    </>
  );
};
