'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _nipplejs = require('nipplejs');

var _nipplejs2 = _interopRequireDefault(_nipplejs);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

/**
 * A react wrapper component for `nipplejs`.
 * @see https://www.npmjs.com/package/nipplejs
 * @author Jovica Aleksic <jovica.aleksic@loopmode.de>
 */
var ReactNipple = (_class = function (_Component) {
    _inherits(ReactNipple, _Component);

    function ReactNipple() {
        _classCallCheck(this, ReactNipple);

        return _possibleConstructorReturn(this, (ReactNipple.__proto__ || Object.getPrototypeOf(ReactNipple)).apply(this, arguments));
    }

    _createClass(ReactNipple, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (!(0, _lodash2.default)(prevProps.options, this.props.options)) {
                this.destroyJoystick();
                this.createJoystick();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', _extends({}, this.elementProps, { ref: this.handleElement, className: (0, _classnames2.default)('ReactNipple', this.props.className) }));
        }

        //-----------------------------------
        //
        // impl
        //
        //-----------------------------------

    }, {
        key: 'handleElement',
        value: function handleElement(ref) {
            this._element = ref;
            if (ref) {
                this.createJoystick(this.props);
            } else if (this._element) {
                this.destroyJoystick();
            }
        }
    }, {
        key: 'createJoystick',
        value: function createJoystick(props) {
            var options = _extends({
                zone: this._element
            }, props.options);

            if (this.props.static) {
                options.mode = 'static';
                options.position = {
                    top: '50%',
                    left: '50%'
                };
            }

            var joystick = _nipplejs2.default.create(options);
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
    }, {
        key: 'destroyJoystick',
        value: function destroyJoystick() {
            if (this.joystick) {
                this.joystick.destroy();
                this.joystick = undefined;
            }
        }
    }, {
        key: 'invokeCallback',
        value: function invokeCallback(type, evt, data) {
            if (this.props[type]) {
                this.props[type](evt, data);
            }
        }
    }, {
        key: 'handleJoystickStart',
        value: function handleJoystickStart(evt, data) {
            this.invokeCallback('onStart', evt, data);
        }
    }, {
        key: 'handleJoystickEnd',
        value: function handleJoystickEnd(evt, data) {
            this.invokeCallback('onEnd', evt, data);
        }
    }, {
        key: 'handleJoystickMove',
        value: function handleJoystickMove(evt, data) {
            this.invokeCallback('onMove', evt, data);
        }
    }, {
        key: 'handleJoystickDir',
        value: function handleJoystickDir(evt, data) {
            this.invokeCallback('onDir', evt, data);
        }
    }, {
        key: 'handleJoystickPlain',
        value: function handleJoystickPlain(evt, data) {
            this.invokeCallback('onPlain', evt, data);
        }
    }, {
        key: 'handleJoystickShown',
        value: function handleJoystickShown(evt, data) {
            this.invokeCallback('onShown', evt, data);
        }
    }, {
        key: 'handleJoystickHidden',
        value: function handleJoystickHidden(evt, data) {
            this.invokeCallback('onHidden', evt, data);
        }
    }, {
        key: 'handleJoystickPressure',
        value: function handleJoystickPressure(evt, data) {
            this.invokeCallback('onPressure', evt, data);
        }
    }, {
        key: 'ownProps',
        get: function get() {
            return ['options', 'static', 'onStart', 'onEnd', 'onMove', 'onDir', 'onPlain', 'onShown', 'onHidden', 'onPressure', 'onCreated'];
        }
    }, {
        key: 'elementProps',
        get: function get() {
            var _this2 = this;

            return Object.entries(this.props).reduce(function (result, _ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                if (_this2.ownProps.includes(key)) {
                    return result;
                }
                result[key] = value;
                return result;
            }, {});
        }
    }], [{
        key: 'propTypes',

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
        get: function get() {
            return {
                className: _propTypes2.default.string,
                options: _propTypes2.default.shape({
                    color: _propTypes2.default.string,
                    size: _propTypes2.default.integer,
                    threshold: _propTypes2.default.float, // before triggering a directional event
                    fadeTime: _propTypes2.default.integer, // transition time
                    multitouch: _propTypes2.default.bool,
                    maxNumberOfNipples: _propTypes2.default.number, // when multitouch, what is too many?
                    dataOnly: _propTypes2.default.bool, // no dom element whatsoever
                    position: _propTypes2.default.object, // preset position for 'static' mode
                    mode: _propTypes2.default.string, // 'dynamic', 'static' or 'semi'
                    restJoystick: _propTypes2.default.bool,
                    restOpacity: _propTypes2.default.number, // opacity when not 'dynamic' and rested
                    catchDistance: _propTypes2.default.number
                }),
                static: _propTypes2.default.bool,
                onStart: _propTypes2.default.func,
                onEnd: _propTypes2.default.func,
                onMove: _propTypes2.default.func,
                onDir: _propTypes2.default.func,
                onPlain: _propTypes2.default.func,
                onShown: _propTypes2.default.func,
                onHidden: _propTypes2.default.func,
                onPressure: _propTypes2.default.func,
                onCreated: _propTypes2.default.func,
                onDestroy: _propTypes2.default.func
            };
        }
    }]);

    return ReactNipple;
}(_react.Component), (_applyDecoratedDescriptor(_class.prototype, 'handleElement', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleElement'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleJoystickStart', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleJoystickStart'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleJoystickEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleJoystickEnd'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleJoystickMove', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleJoystickMove'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleJoystickDir', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleJoystickDir'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleJoystickPlain', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleJoystickPlain'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleJoystickShown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleJoystickShown'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleJoystickHidden', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleJoystickHidden'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleJoystickPressure', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleJoystickPressure'), _class.prototype)), _class);
exports.default = ReactNipple;