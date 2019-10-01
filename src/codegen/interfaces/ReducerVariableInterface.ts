import ActionInterface from './ActionInterface';

interface ReducerVariableInterface {
    variableName: string,
    initialValue: string,
    modifiedBy: ActionInterface[];
}

export default ReducerVariableInterface;
