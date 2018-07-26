'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DebugView = (_temp = _class = function (_Component) {
    _inherits(DebugView, _Component);

    function DebugView() {
        _classCallCheck(this, DebugView);

        return _possibleConstructorReturn(this, (DebugView.__proto__ || Object.getPrototypeOf(DebugView)).apply(this, arguments));
    }

    _createClass(DebugView, [{
        key: 'render',
        value: function render() {
            var _ref = this.props.data || {},
                _ref$position = _ref.position,
                position = _ref$position === undefined ? {} : _ref$position,
                force = _ref.force,
                pressure = _ref.pressure,
                distance = _ref.distance,
                _ref$angle = _ref.angle,
                angle = _ref$angle === undefined ? {} : _ref$angle,
                _ref$direction = _ref.direction,
                direction = _ref$direction === undefined ? {} : _ref$direction;

            return _react2.default.createElement(
                'div',
                { className: 'debug' },
                _react2.default.createElement(
                    'ul',
                    null,
                    _react2.default.createElement(
                        'li',
                        { className: 'position' },
                        'position :',
                        _react2.default.createElement(
                            'ul',
                            null,
                            _react2.default.createElement(
                                'li',
                                { className: 'x' },
                                'x :',
                                _react2.default.createElement('span', { className: 'data', children: position.x })
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'y' },
                                'y :',
                                _react2.default.createElement('span', { className: 'data', children: position.y })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'force' },
                        'force : ',
                        _react2.default.createElement('span', { className: 'data', children: force })
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'pressure' },
                        'pressure : ',
                        _react2.default.createElement('span', { className: 'data', children: pressure })
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'distance' },
                        'distance : ',
                        _react2.default.createElement('span', { className: 'data', children: distance })
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'angle' },
                        'angle :',
                        _react2.default.createElement(
                            'ul',
                            null,
                            _react2.default.createElement(
                                'li',
                                { className: 'radian' },
                                'radian :',
                                _react2.default.createElement('span', { className: 'data', children: angle.radian })
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'degree' },
                                'degree :',
                                _react2.default.createElement('span', { className: 'data', children: angle.degree })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        { className: 'direction' },
                        'direction :',
                        _react2.default.createElement(
                            'ul',
                            null,
                            _react2.default.createElement(
                                'li',
                                { className: 'x' },
                                'x :',
                                _react2.default.createElement('span', { className: 'data', children: direction.x })
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'y' },
                                'y :',
                                _react2.default.createElement('span', { className: 'data', children: direction.y })
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'angle' },
                                'angle :',
                                _react2.default.createElement('span', { className: 'data', children: direction.angle })
                            )
                        )
                    )
                ),
                _react2.default.createElement('div', { className: 'dump' })
            );
        }
    }]);

    return DebugView;
}(_react.Component), _class.propTypes = {
    data: _propTypes2.default.shape({
        position: _propTypes2.default.shape({
            x: _propTypes2.default.number,
            y: _propTypes2.default.number
        }),
        angle: _propTypes2.default.shape({
            radian: _propTypes2.default.number,
            degree: _propTypes2.default.number
        }),
        direction: _propTypes2.default.shape({
            x: _propTypes2.default.number,
            y: _propTypes2.default.number,
            angle: _propTypes2.default.number
        }),
        force: _propTypes2.default.number,
        pressure: _propTypes2.default.number,
        distance: _propTypes2.default.number
    })
}, _temp);
exports.default = DebugView;