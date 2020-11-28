import { Divider, Flex, Heading, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useLocalStorage } from './hooks/useLocalStorage';
import { useKey } from './hooks/useKey';
import BottomBar from './components/BottomBar';
import { TodoItemContainer } from './components/TodoItemContainer';

const InitialState: TodoProps[] = [
  {
    id: uuidv4(),
    desc: 'Learn Javascript',
    state: 'Active',
  },
  {
    id: uuidv4(),
    desc: 'Learn React',
    state: 'Active',
  },
  {
    id: uuidv4(),
    desc: 'Build a React App',
    state: 'Active',
  },
];

const App = () => {
  const [storedValue, setLocalStorage] = useLocalStorage('todo', InitialState);
  const [todos, setTodos] = useState<TodoProps[]>(
    (storedValue as unknown) as TodoProps[]
  );
  const [stateCondition, setStateCondition] = useState<StateTypes>('All');
  const [isSearchInput, setIsSearchInput] = useState(false);
  const [escapePressed] = useKey(['Escape']);

  useEffect(() => {
    setTodos((storedValue as unknown) as TodoProps[]);
  }, [storedValue]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const currentTodoList: TodoProps[] = todos.map((x) =>
      x.id === id
        ? { ...x, state: x.state === 'Completed' ? 'Active' : 'Completed' }
        : x
    );
    setTodos(currentTodoList);
    setLocalStorage(currentTodoList);
  };

  const handleDelete = (id: string) => {
    const currentTodoList: TodoProps[] = todos.filter((x) => x.id !== id);
    setTodos(currentTodoList);
    setLocalStorage(currentTodoList);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setTodos((prevState) =>
        prevState.filter((item) => item.desc.includes(e.target.value))
      );
    } else setTodos((storedValue as unknown) as TodoProps[]);
  };

  const handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !!e.currentTarget.value) {
      const currentTodoList: TodoProps[] = [
        ...todos,
        { desc: e.currentTarget.value, id: uuidv4(), state: 'Active' },
      ];
      setTodos(currentTodoList);
      e.currentTarget.value = '';
      setLocalStorage(currentTodoList);
    }
  };

  const changeTodoState = (state: StateTypes) => {
    setStateCondition(state);
  };
  return (
    <Flex
      justify='center'
      alignItems={['center', 'flex-start', 'flex-start', 'flex-start']}
      height='100vh'
      backgroundColor='#e1ddd5f0'
    >
      <Flex
        justifyContent='center'
        alignItems='center'
        marginTop={['0', '4rem', '4rem', '4rem']}
        backgroundColor='#FFF'
        flexDirection='column'
      >
        <Flex
          borderRadius='2px'
          maxWidth='650px'
          border='1px solid #d8d2c2'
          width={['300px', '350px', '500px', '650px']}
          justifyContent='center'
          letterSpacing='1.2px'
          flexDirection='column'
        >
          <Flex flexDirection='column' padding='1rem'>
            <Heading textAlign='center'>THINGS TO DO</Heading>

            {escapePressed ? (
              isSearchInput ? (
                <Input
                  variant='outline'
                  placeholder='Search...'
                  marginTop='1.5rem'
                  onChange={(e) => handleSearch(e)}
                />
              ) : (
                <Input
                  variant='outline'
                  placeholder='Add new'
                  marginTop='1.5rem'
                  onKeyDown={(e) => handleInputChange(e)}
                />
              )
            ) : null}
            <Flex flexDirection='column' marginTop='1.2rem'>
              {stateCondition === 'All'
                ? todos.map((item, index) => {
                    return (
                      <>
                        <TodoItemContainer
                          key={item.id}
                          item={item}
                          index={index}
                          handleDelete={() => handleDelete(item.id)}
                          handleClick={(e) => handleClick(e, item.id)}
                        />
                        {todos.length - 1 !== index ? (
                          <Divider marginY='1rem' color='#d8d2c2' />
                        ) : null}
                      </>
                    );
                  })
                : todos
                    .filter((item) => item.state === stateCondition)
                    .map((item, index) => {
                      return (
                        <>
                          <TodoItemContainer
                            key={item.id}
                            item={item}
                            index={index}
                            handleDelete={() => handleDelete(item.id)}
                            handleClick={(e) => handleClick(e, item.id)}
                          />
                          {todos.length - 1 !== index ? (
                            <Divider marginY='1rem' color='#d8d2c2' />
                          ) : null}
                        </>
                      );
                    })}
            </Flex>
          </Flex>
          <BottomBar
            todoLength={
              stateCondition === 'All'
                ? todos.length
                : todos.filter((item) => item.state === stateCondition).length
            }
            changeTodoState={(state: StateTypes) => changeTodoState(state)}
            stateCondition={stateCondition}
            isItSearch={() => setIsSearchInput(true)}
            isItAdd={() => setIsSearchInput(false)}
          />
        </Flex>
        <Flex backgroundColor='#e1ddd5f0' width='100%' justifyContent='center'>
          {escapePressed && (
            <Text marginTop='1rem' color='#999'>
              Press `Esc` to cancel.
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default App;
