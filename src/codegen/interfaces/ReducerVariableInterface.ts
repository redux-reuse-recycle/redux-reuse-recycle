import ActionInterface from './ActionInterface';

interface ReducerVariableInterface {
    name: string,
    initialValue: string,
    modifiedBy: ActionInterface[];
}

export default ReducerVariableInterface;
