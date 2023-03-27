/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ComponentComposeProps {
    components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>;
    children: JSX.Element;
}
