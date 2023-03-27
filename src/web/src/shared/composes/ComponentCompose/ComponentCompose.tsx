import { ComponentComposeProps } from './interfaces/component-compose-props.interface';

const ComponentCompose = ({ components, children }: ComponentComposeProps): JSX.Element => {
    return (
        <>
            {components.reduceRight((acc, Comp) => {
                return <Comp>{acc}</Comp>;
            }, children)}
        </>
    );
};

export default ComponentCompose;
