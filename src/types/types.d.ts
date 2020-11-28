type TodoProps = {
  id: string;
  desc: string;
  state: StateTypes;
};

type StateTypes = 'Active' | 'All' | 'Completed';
