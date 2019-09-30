import ActionInterface from './ActionInterface';

interface ReducerVariableInterface {
    name: string,
    initialValue: any,
    modifiedBy: ActionInterface[];
}

export default ReducerVariableInterface;
