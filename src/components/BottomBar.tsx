import { AddIcon, Search2Icon } from '@chakra-ui/icons';
import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';

type BottomBarTypes = {
  todoLength: number;
  changeTodoState: (state: StateTypes) => void;
  stateCondition: StateTypes;
  isItSearch: () => void;
  isItAdd: () => void;
};

type StateTypes = 'Active' | 'All' | 'Completed';

const BottomBar = ({
  todoLength,
  changeTodoState,
  stateCondition,
  isItSearch,
  isItAdd,
}: BottomBarTypes) => {
  return (
    <Flex
      flexDirection={['column', 'column', 'row', 'row']}
      justifyContent='space-between'
      backgroundColor='orange.500'
      height={['auto', '45px', '45px', '45px']}
      alignItems='center'
    >
      <Flex
        marginLeft='1rem'
        alignItems='center'
        flexDirection='row'
        marginTop={['1rem', '0', '0', '0']}
      >
        <AddIcon
          w={4}
          h={4}
          color='gray.200'
          cursor='pointer'
          onClick={() => isItAdd()}
        />
        <Search2Icon
          cursor='pointer'
          w={4}
          h={4}
          marginLeft='1rem'
          color='gray.200'
          marginRight='2rem'
          onClick={() => isItSearch()}
        />
        <Text>{todoLength} Items left</Text>
      </Flex>
      <Flex marginLeft='1rem' alignItems='center' padding='1rem'>
        <Button
          onClick={() => changeTodoState('All')}
          variant={stateCondition !== 'All' ? 'ghost' : undefined}
        >
          All
        </Button>
        <Button
          marginLeft={['0', '1rem', '1rem', '1rem']}
          fontWeight='500'
          onClick={() => changeTodoState('Active')}
          variant={stateCondition !== 'Active' ? 'ghost' : undefined}
        >
          Active
        </Button>
        <Button
          marginLeft={['0', '1rem', '1rem', '1rem']}
          fontWeight='500'
          onClick={() => changeTodoState('Completed')}
          variant={stateCondition !== 'Completed' ? 'ghost' : undefined}
        >
          Completed
        </Button>
      </Flex>
    </Flex>
  );
};

export default BottomBar;
