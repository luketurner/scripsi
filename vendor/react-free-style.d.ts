declare module 'react-free-style' {

    import React = require('react');
    export import FreeStyle = require('free-style');
    /**
     * Create a specialized free style instance.
     */
    export class ReactFreeStyle extends FreeStyle.FreeStyle {
        /**
         * Expose the `StyleElement` for use.
         */
        Element: typeof StyleElement;
        /**
         * Create a React component that inherits from a user component. This is
         * required for methods on the user component to continue working once
         * wrapped with the style functionality.
         */
        component(Component: React.ComponentClass<any>): React.ComponentClass<any>;
    }
    /**
     * Create the <style /> element.
     */
    export class StyleElement extends React.Component<{}, {}> {
        static displayName: string;
        static contextTypes: React.ValidationMap<any>;
        onChange: () => void;
        componentWillMount(): void;
        componentWillUnmount(): void;
        render(): React.DOMElement<{
            dangerouslySetInnerHTML: {
                __html: any;
            };
        }, Element>;
    }
    /**
     * Create a React Free Style instance.
     */
    export function create(): ReactFreeStyle;

}