import nipplejs from 'nipplejs';
import autobind from 'autobind-decorator';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import cx from 'classnames';

/**
 * A react wrapper component for `nipplejs`.
 * @see https://www.npmjs.com/package/nipplejs
 * @author Jovica Aleksic <jovica.aleksic@loopmode.de>
 */
export default class ReactNipple extends Component {
    /* eslint-disable no-trailing-spaces */
    /**
     * Component propTypes
     *
     * Any additional (unknown) props will be passed along as attributes of the created DOM element.
     *
     * @property {string} className - A css classname for the DOM element
     * @property {object} options - An object with nipplejs options, see https://github.com/yoannmoinet/nipplejs#options
     * @property {boolean} static - A shortcut for setting the options `{mode: 'static', position: {top: '50%', left: '50%'}}`. Will override values in the `options` object.
     * @property {function} onCreated - Callback that is invoked with the created instance
     * @property {function} onDestroy - Callback that is invoked with the instance that is going to be destroyed
     * @property {function} onStart - Callback for the 'start' event handler, see https://github.com/yoannmoinet/nipplejs#start
     * @property {function} onEnd - Callback for the 'end' event handler, see https://github.com/yoannmoinet/nipplejs#end
     * @property {function} onMove - Callback for the 'move' event handler, see https://github.com/yoannmoinet/nipplejs#move
     * @property {function} onDir - Callback for the 'dir' event handler, see https://github.com/yoannmoinet/nipplejs#dir
     * @property {function} onPlain - Callback for the 'plain' event handler, see https://github.com/yoannmoinet/nipplejs#plain
     * @property {function} onShown - Callback for the 'shown' event handler, see https://github.com/yoannmoinet/nipplejs#shown
     * @property {function} onHidden - Callback for the 'hidden' event handler, see https://github.com/yoannmoinet/nipplejs#hidden
     * @property {function} onPressure - Callback for the 'pressure' event handler, see https://github.com/yoannmoinet/nipplejs#pressure
     */
    /* eslint-enable no-trailing-spaces */
    static get propTypes() {
        return {
            className: PropTypes.string,
            options: PropTypes.shape({
                color: PropTypes.string,
                size: PropTypes.integer,
                threshold: PropTypes.float, // before triggering a directional event
                fadeTime: PropTypes.integer, // transition time
                multitouch: PropTypes.bool,
                maxNumberOfNipples: PropTypes.number, // when multitouch, what is too many?
                dataOnly: PropTypes.bool, // no dom element whatsoever
                position: PropTypes.object, // preset position for 'static' mode
                mode: PropTypes.string, // 'dynamic', 'static' or 'semi'
                restJoystick: PropTypes.bool,
                restOpacity: PropTypes.number, // opacity when not 'dynamic' and rested
                catchDistance: PropTypes.number
            }),
            static: PropTypes.bool,
            onStart: PropTypes.func,
            onEnd: PropTypes.func,
            onMove: PropTypes.func,
            onDir: PropTypes.func,
            onPlain: PropTypes.func,
            onShown: PropTypes.func,
            onHidden: PropTypes.func,
            onPressure: PropTypes.func,
            onCreated: PropTypes.func,
            onDestroy: PropTypes.func
        };
    }

    get ownProps() {
        return [
            'options',
            'static',
            'onStart',
            'onEnd',
            'onMove',
            'onDir',
            'onPlain',
            'onShown',
            'onHidden',
            'onPressure',
            'onCreated'
        ];
    }
    get elementProps() {
        return Object.entries(this.props).reduce((result, [key, value]) => {
            if (this.ownProps.includes(key)) {
                return result;
            }
            result[key] = value;
            return result;
        }, {});
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.options, this.props.options)) {
            this.destroyJoystick();
            this.createJoystick();
        }
    }

    render() {
        return (
            <div {...this.elementProps} ref={this.handleElement} className={cx('ReactNipple', this.props.className)} />
        );
    }

    //-----------------------------------
    //
    // impl
    //
    //-----------------------------------

    @autobind
    handleElement(ref) {
        this._element = ref;
        if (ref) {
            this.createJoystick(this.props);
        } else if (this._element) {
            this.destroyJoystick();
        }
    }
    createJoystick(props) {
        const options = {
            zone: this._element,
            ...props.options
        };

        if (this.props.static) {
            options.mode = 'static';
            options.position = {
                top: '50%',
                left: '50%'
            };
        }

        const joystick = nipplejs.create(options);
        joystick.on('start', this.handleJoystickStart);
        joystick.on('end', this.handleJoystickEnd);
        joystick.on('move', this.handleJoystickMove);
        joystick.on('dir', this.handleJoystickDir);
        joystick.on('plain', this.handleJoystickPlain);
        joystick.on('shown', this.handleJoystickShown);
        joystick.on('hidden', this.handleJoystickHidden);
        joystick.on('pressure', this.handleJoystickPressure);

        this.joystick = joystick;

        if (props.onCreated) {
            props.onCreated(this.joystick);
        }
    }
    destroyJoystick() {
        if (this.joystick) {
            this.joystick.destroy();
            this.joystick = undefined;
        }
    }
    invokeCallback(type, evt, data) {
        if (this.props[type]) {
            this.props[type](evt, data);
        }
    }
    @autobind
    handleJoystickStart(evt, data) {
        this.invokeCallback('onStart', evt, data);
    }
    @autobind
    handleJoystickEnd(evt, data) {
        this.invokeCallback('onEnd', evt, data);
    }
    @autobind
    handleJoystickMove(evt, data) {
        this.invokeCallback('onMove', evt, data);
    }
    @autobind
    handleJoystickDir(evt, data) {
        this.invokeCallback('onDir', evt, data);
    }
    @autobind
    handleJoystickPlain(evt, data) {
        this.invokeCallback('onPlain', evt, data);
    }
    @autobind
    handleJoystickShown(evt, data) {
        this.invokeCallback('onShown', evt, data);
    }
    @autobind
    handleJoystickHidden(evt, data) {
        this.invokeCallback('onHidden', evt, data);
    }
    @autobind
    handleJoystickPressure(evt, data) {
        this.invokeCallback('onPressure', evt, data);
    }
}
