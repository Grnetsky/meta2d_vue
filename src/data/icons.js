import { ReplaceMode } from '@meta2d/chart-diagram';
import { userPensUrl} from "./defaultsConfig.js";
import axios from "axios";
import {iconMap} from "../../public/path2D/index.js";
import {parseSvg} from "@meta2d/svg";
import {canvasDrawMap} from "../../public/canvasDraw/index.js";
export const defaultIcons =[
    {
        name: '基本形状',
        show: true,
        list: [
            {
                name: 'square',
                icon: 'l-rect',
                id: 1,
                data: {
                    text: '正方形',
                    width: 100,
                    height: 100,
                    name: 'square',
                    form: [
                        {
                            key: 'text',
                            type: 'text',
                            name: '文本',
                        },
                    ]
                },
            },
            {
                name: 'rectangle',
                icon: 'l-rectangle',
                id: 2,
                data: {
                    text: '圆角矩形',
                    width: 200,
                    height: 50,
                    borderRadius: 0.1,
                    name: 'rectangle',
                },
            },
            {
                name: 'circle',
                icon: 'l-circle',
                id: 3,
                data: {
                    text: '圆',
                    width: 100,
                    height: 100,
                    name: 'circle',
                },
            },
            {
                name: 'triangle',
                icon: 'l-triangle',
                id: 4,
                data: {
                    text: '三角形',
                    width: 100,
                    height: 100,
                    name: 'triangle',
                },
            },
            {
                name: 'diamond',
                icon: 'l-diamond',
                id: 5,
                data: {
                    text: '菱形',
                    width: 100,
                    height: 100,
                    name: 'diamond',
                },
            },
            {
                name: 'pentagon',
                icon: 'l-pentagon',
                id: 6,
                data: {
                    text: '五边形',
                    width: 100,
                    height: 100,
                    name: 'pentagon',
                },
            },
            {
                name: 'hexagon',
                icon: 'l-hexagon',
                id: 7,
                data: {
                    text: '六边形',
                    width: 100,
                    height: 100,
                    name: 'hexagon',
                },
            },
            {
                name: 'pentagram',
                icon: 'l-pentagram',
                id: 8,
                data: {
                    text: '五角星',
                    width: 100,
                    height: 100,
                    name: 'pentagram',
                },
            },
            {
                name: 'leftArrow',
                icon: 'l-arrow-left',
                id: 9,
                data: {
                    text: '左箭头',
                    width: 120,
                    height: 60,
                    name: 'leftArrow',
                },
            },
            {
                name: 'rightArrow',
                icon: 'l-arrow-right',
                id: 10,
                data: {
                    text: '右箭头',
                    width: 120,
                    height: 60,
                    name: 'rightArrow',
                },
            },
            {
                name: 'twowayArrow',
                icon: 'l-twoway-arrow',
                id: 11,
                data: {
                    text: '双向箭头',
                    width: 150,
                    height: 60,
                    name: 'twowayArrow',
                },
            },
            {
                name: 'line',
                icon: 'l-line',
                id: 12,
                data: {
                    anchors: [
                        {
                            x: 0,
                            y: 0.5,
                            id: '0',
                        },
                        {
                            x: 1,
                            y: 0.5,
                            id: '1',
                        },
                    ],
                    width: 200,
                    height: 5,
                    name: 'rectangle',
                    lineWidth: 0,
                    background: '#222222',
                },
            },
            {
                name: 'cloud',
                icon: 'l-cloud',
                id: 13,
                data: {
                    text: '云',
                    width: 100,
                    height: 100,
                    name: 'cloud',
                },
            },
            {
                name: 'message',
                icon: 'l-msg',
                id: 14,
                data: {
                    textTop: -0.1,
                    text: '消息框',
                    width: 100,
                    height: 100,
                    name: 'message',
                },
            },
            {
                name: 'file',
                icon: 'l-file',
                id: 15,
                data: {
                    text: '文档',
                    width: 80,
                    height: 100,
                    name: 'file',
                },
            },
            {
                name: 'text',
                icon: 'l-text',
                id: 16,
                data: {
                    text: `meta2d`,
                    width: 160,
                    height: 30,
                    name: 'text',
                },
            },
            {
                name: 'image',
                icon: 'l-image',
                id: 17,
                data: {
                    text: '',
                    width: 100,
                    height: 100,
                    name: 'image',
                    image: '/img/logo.png',
                },
            },
            {
                name: 'cube',
                icon: 'l-cube',
                id: 18,
                data: {
                    width: 60,
                    height: 100,
                    name: 'cube',
                    z: 0.25,
                    form: [
                        {
                            key: 'z',
                            name: 'z',
                            type: 'number',
                            min: 0,
                            step: 0.1,
                            placeholder: '<= 1 即宽度的比例',
                        },
                        {
                            key: 'backgroundFront',
                            name: '前背景色',
                            type: 'color',
                        },
                        {
                            key: 'backgroundUp',
                            name: '顶背景色',
                            type: 'color',
                        },
                        {
                            key: 'backgroundRight',
                            name: '右背景色',
                            type: 'color',
                        },
                    ]
                },
            },
            {
                name: 'people',
                icon: 'l-people',
                id: 19,
                data: {
                    width: 70,
                    height: 100,
                    name: 'people',
                },
            },
            {
                name: 'video',
                icon: 'l-pc',
                id: 20,
                data: {
                    width: 200,
                    height: 200,
                    externElement: true,
                    name: 'video',
                    video:
                        'https://video.699pic.com/videos/17/69/11/a_aa3jeKZ0D63g1556176911_10s.mp4',
                },
            },
            // {
            //   name: 'video',
            //   icon: 'l-pc',
            //   id: 20,
            //   data: {
            //     width: 200,
            //     height: 200,
            //     externElement: true,
            //     name: 'video',
            //     videoType: 'flv',
            //     video: 'http://1011.hlsplay.aodianyun.com/demo/game.flv'
            //   }
            // },
            // {
            //   name: 'video',
            //   icon: 'l-pc',
            //   id: 20,
            //   data: {
            //     width: 200,
            //     height: 200,
            //     externElement: true,
            //     name: 'video',
            //     videoType: 'flv',
            //     video:
            //       // 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
            //       'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8'
            //       // 'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4'
            //       // '/vod/mp4:BigBuckBunny_115k.mov'
            //       // '/livetv/gxtv'
            //   }
            // },
            {
                name: 'iframe',
                icon: 'l-02',
                id: 21,
                data: {
                    name: 'iframe',
                    width: 100,
                    height: 100,
                    externElement: true,
                    iframe: 'http://le5le.com',
                },
            },
            {
                name: 'icon',
                icon: 'ticon ticon-share',
                id: 22,
                data: {
                    width: 100,
                    height: 100,
                    name: 'image',
                    icon: '\ue620',
                    iconFamily: 'ticon',
                },
            },
        ],
    },
    {
        name: '表单',
        show: true,
        list: [
            {
                name: '表格',
                icon: 'l-biaoge',
                data: {
                    name: 'table2',
                    width: 0,
                    height: 0,
                    form: [
                        {
                            key: 'data',
                            name: '表格数据',
                            type: 'code',
                            language: 'json',
                            isNotString: true,
                        },
                        {
                            key: 'styles',
                            name: '表格样式',
                            type: 'code',
                            language: 'json',
                            isNotString: true,
                        },
                    ],
                    disableAnchor: true,
                    colWidth: 150,
                    rowHeight: 40,
                    data: [
                        ['设备 ID', '设备名称', '数据协议', '状态', '操作'],
                        ['1', '200', 'MQTT', '正在运行', {}],
                        ['2', '湿度传感器', 'MQTT', '正在运行', {}],
                        ['3', '物联网设备', 'MQTT', '正在运行', {}],
                        ['4', '物联网设备/智能家居/智慧城市', 'MQTT', '正在运行', {}],
                    ],
                    styles: [
                        {
                            row: 1,
                            col: 1,
                            color: '#ff0000',
                            background: '#ffff00',
                            wheres: [
                                //触发条件 成立后才允许配置样式
                                {
                                    comparison: '<=',
                                    value: '123',
                                },
                            ],
                        },
                        {
                            row: 0,
                            height: 60,
                        },
                        {
                            col: 4,
                            width: 200, //为该列设置额外的节点
                            pens: [
                                {
                                    name: 'rectangle',
                                    width: 50,
                                    height: 20,
                                    text: '编辑',
                                    fontSize: 0.6,
                                    disableAnchor: true,
                                    activeBackground: '#40a9ff',
                                    activeColor: '#40a9ff',
                                    background: '#1890ff',
                                    color: '#1890ff',
                                    hoverBackground: '#40a9ff',
                                    hoverColor: '#40a9ff',
                                    textColor: '#ffffff',
                                    hoverTextColor: '#ffffff',
                                    activeTextColor: '#ffffff',
                                    events: [
                                        {
                                            action: 5,
                                            name: 'click',
                                            value: 'alert("点击了编辑")',
                                        },
                                    ],
                                },
                                {
                                    name: 'rectangle',
                                    width: 80,
                                    height: 20,
                                    text: '实时数据',
                                    fontSize: 0.6,
                                    disableAnchor: true,
                                    activeBackground: '#40a9ff',
                                    activeColor: '#40a9ff',
                                    background: '#1890ff',
                                    color: '#1890ff',
                                    hoverBackground: '#40a9ff',
                                    hoverColor: '#40a9ff',
                                    textColor: '#ffffff',
                                    hoverTextColor: '#ffffff',
                                    activeTextColor: '#ffffff',
                                    events: [
                                        {
                                            action: 5,
                                            name: 'click',
                                            value: 'alert("点击了实时数据")',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            },

            {
                name: '复选框',
                icon: 'l-xuanzeqi',
                data: {
                    name: 'checkbox',
                    width: 100,
                    height: 30,
                    fontSize: 16,
                    disableAnchor: true,
                    direction: 'vertical',
                    checked: true,
                    // isForbidden: true,
                    value: '选项一',
                    form: [
                        {
                            key: 'checked',
                            name: '选中',
                            type: 'switch',
                        },
                        {
                            key: 'isForbidden',
                            name: '是否禁用',
                            type: 'switch',
                        },
                        {
                            key: 'value',
                            name: '选项值',
                            type: 'text',
                        },
                    ]
                },
            },
            {
                name: '单选框',
                icon: 'l-danxuankuang',
                data: {
                    name: 'radio',
                    width: 150,
                    height: 30,
                    disableAnchor: true,
                    direction: 'horizontal', // 'vertical', //'horizontal',
                    form: [
                        {
                            key: 'options',
                            name: '选项',
                            type: 'code',
                            language: 'json',
                            isNotString: true,
                        },
                        {
                            key: 'direction',
                            name: '方向',
                            type: 'select',
                            options: [
                                {
                                    label: '水平',
                                    value: 'horizontal',
                                },
                                {
                                    label: '垂直',
                                    value: 'vertical',
                                },
                            ],
                        },
                        {
                            key: 'checked',
                            name: '选择项',
                            type: 'text',
                        },
                    ],
                    options: [
                        { text: '选项一', isForbidden: true },
                        { text: '选项二' },
                        { text: '选项三' },
                    ],
                    checked: '选项二',
                },
            },
            {
                name: '开关',
                icon: 'l-kaiguan',
                data: {
                    name: 'switch',
                    disableAnchor: true,
                    height: 30,
                    width: 60,
                    checked: true,
                    offColor: '#BFBFBF',
                    onColor: '#1890ff',
                    disableOffColor: '#E5E5E5',
                    disableOnColor: '#A3D3FF',
                    hoverBackground: '#40a9ff',
                    form: [
                        {
                            key: 'checked',
                            name: '开关状态',
                            type: 'switch',
                        },
                    ] ,
                },
            },
            {
                name: '进度条',
                icon: 'l-jindutiao',
                data: {
                    anchors: [],
                    disableAnchor: true,
                    name: 'slider',
                    x: 400,
                    y: 400,
                    width: 300,
                    height: 20,
                    value: 10,
                    textWidth: 50,
                    barHeight: 4, //修改无效
                    min: 0,
                    max: 100,
                    color: '#1890ff',
                    background: '#D4D6D9',
                    textColor: '#222222',
                    unit: '%',
                    form: [
                        //TODO 添加最大最小
                        {
                            key: 'value',
                            name: '当前进度值',
                            type: 'number',
                            min: 0,
                            max: 100,
                        },
                        {
                            key: 'unit',
                            name: '显示单位',
                            type: 'text',
                        },
                        {
                            key: 'textColor',
                            name: '文字颜色',
                            type: 'color',
                        },
                    ],
                },
            },
            {
                name: '按钮',
                icon: 'l-anniu',
                data: {
                    name: 'rectangle',
                    x: 300,
                    y: 200,
                    width: 80,
                    height: 30,
                    disableAnchor: true,
                    borderRadius: 2,
                    text: '按钮',
                    activeBackground: '#40a9ff',
                    activeColor: '#40a9ff',
                    background: '#1890ff',
                    color: '#1890ff',
                    hoverBackground: '#40a9ff',
                    hoverColor: '#40a9ff',
                    textColor: '#ffffff',
                    hoverTextColor: '#ffffff',
                    activeTextColor: '#ffffff',
                },
            },
            {
                name: '输入框',
                icon: 'l-shurukuang',
                data: {
                    x: 100,
                    y: 100,
                    height: 40,
                    width: 200,
                    disableAnchor: true,
                    name: 'rectangle',
                    borderRadius: 0.05,
                    input: true,
                    ellipsis: true,
                    text: '输入数据',
                    textAlign: 'left',
                    color: '#D9D9D9FF',
                    textColor: '#000000FF',
                    hoverTextColor: '#000000FF',
                    activeTextColor: '#000000FF',
                    textLeft: 10,
                },
            },
            {
                name: '选择器',
                icon: 'l-xuanzeqi',
                data: {
                    x: 100,
                    y: 100,
                    height: 40,
                    width: 200,
                    disableAnchor: true,
                    name: 'rectangle',
                    borderRadius: 0.05,
                    ellipsis: true,
                    text: '选项1',
                    textAlign: 'left',
                    input: true,
                    color: '#D9D9D9FF',
                    textColor: '#000000FF',
                    hoverTextColor: '#000000FF',
                    activeTextColor: '#000000FF',
                    textLeft: 10,
                    dropdownList: [
                        {
                            text: '选项1',
                        },
                        {
                            text: '选项2',
                        },
                        {
                            text: '选项3',
                        },
                    ],
                    form: [
                        {
                            key: 'text',
                            name: '选择项',
                            type: 'text',
                        },
                    ] ,
                },
            },
        ],
    },
    {
        name: '脑图',
        show: true,
        list: [
            {
                name: 'mindNode',
                icon: 'l-zhuti',
                data: {
                    text: '主题',
                    width: 200,
                    height: 50,
                    name: 'mindNode',
                    borderRadius: 0.5,
                },
            },
            {
                name: 'mindLine',
                icon: 'l-zizhuti',
                data: {
                    text: '子主题',
                    width: 160,
                    height: 40,
                    name: 'mindLine',
                },
            },
        ],
    },
    {
        name: '流程图',
        show: true,
        list: [
            {
                name: '开始/结束',
                icon: 'l-flow-start',
                id: 21,
                data: {
                    text: '开始/结束',
                    width: 120,
                    height: 40,
                    borderRadius: 0.5,
                    name: 'rectangle',
                },
            },
            {
                name: '流程',
                icon: 'l-rectangle',
                id: 22,
                data: {
                    text: '流程',
                    width: 120,
                    height: 40,
                    name: 'rectangle',
                },
            },
            {
                name: '判定',
                icon: 'l-diamond',
                id: 23,
                data: {
                    text: '判定',
                    width: 120,
                    height: 60,
                    name: 'diamond',
                },
            },
            {
                name: '数据',
                icon: 'l-flow-data',
                id: 24,
                data: {
                    text: '数据',
                    width: 120,
                    height: 50,
                    name: 'flowData',
                    offsetX: 0.14,
                    form: [
                        {
                            key: 'offsetX',
                            name: '斜率',
                            type: 'number',
                            min: 0,
                            step: 0.1,
                            placeholder: '<= 1 即宽度的比例',
                        },
                    ]
                },
            },
            {
                name: '准备',
                icon: 'l-flow-ready',
                id: 25,
                data: {
                    text: '准备',
                    width: 120,
                    height: 50,
                    name: 'hexagon',
                },
            },
            {
                name: '子流程',
                icon: 'l-flow-subprocess',
                id: 26,
                data: {
                    text: '子流程',
                    width: 120,
                    height: 50,
                    name: 'flowSubprocess',
                },
            },
            {
                name: '数据库',
                icon: 'l-db',
                id: 27,
                data: {
                    text: '数据库',
                    width: 80,
                    height: 120,
                    name: 'flowDb',
                },
            },
            {
                name: '文档',
                icon: 'l-flow-document',
                id: 28,
                data: {
                    text: '文档',
                    width: 120,
                    height: 100,
                    name: 'flowDocument',
                },
            },
            {
                name: '内部存储',
                icon: 'l-internal-storage',
                id: 29,
                data: {
                    text: '内部存储',
                    width: 120,
                    height: 80,
                    name: 'flowInternalStorage',
                },
            },
            {
                name: '外部存储',
                icon: 'l-extern-storage',
                id: 30,
                data: {
                    text: '外部存储',
                    width: 120,
                    height: 80,
                    name: 'flowExternStorage',
                },
            },
            {
                name: '队列',
                icon: 'l-flow-queue',
                id: 31,
                data: {
                    text: '队列',
                    width: 100,
                    height: 100,
                    name: 'flowQueue',
                },
            },
            {
                name: '手动输入',
                icon: 'l-flow-manually',
                id: 32,
                data: {
                    text: '手动输入',
                    width: 120,
                    height: 80,
                    name: 'flowManually',
                },
            },
            {
                name: '展示',
                icon: 'l-flow-display',
                id: 33,
                data: {
                    text: '展示',
                    width: 120,
                    height: 80,
                    name: 'flowDisplay',
                },
            },
            {
                name: '并行模式',
                icon: 'l-flow-parallel',
                id: 34,
                data: {
                    text: '并行模式',
                    width: 120,
                    height: 50,
                    name: 'flowParallel',
                },
            },
            {
                name: '注释',
                icon: 'l-flow-comment',
                id: 35,
                data: {
                    text: '注释',
                    width: 100,
                    height: 100,
                    name: 'flowComment',
                },
            },
        ],
    },
    {
        name: '活动图',
        show: true,
        list: [
            {
                name: '开始',
                icon: 'l-inital',
                id: 36,
                data: {
                    text: '',
                    width: 30,
                    height: 30,
                    name: 'circle',
                    background: '#555',
                    lineWidth: 0,
                },
            },
            {
                name: '结束',
                icon: 'l-final',
                id: 37,
                data: {
                    width: 30,
                    height: 30,
                    name: 'activityFinal',
                },
            },
            {
                name: '活动',
                icon: 'l-action',
                id: 38,
                data: {
                    text: '活动',
                    width: 120,
                    height: 50,
                    borderRadius: 0.25,
                    name: 'rectangle',
                },
            },
            {
                name: '决策/合并',
                icon: 'l-diamond',
                id: 39,
                data: {
                    text: '决策/合并',
                    width: 120,
                    height: 50,
                    name: 'diamond',
                },
            },
            {
                name: '垂直泳道',
                icon: 'l-swimlane-v',
                id: 40,
                data: {
                    text: '垂直泳道',
                    width: 200,
                    height: 500,
                    name: 'swimlaneV',
                    textBaseline: 'top',
                    textTop: 20,
                    // textHeight: ,
                    lineTop: 0.08,
                },
            },
            {
                name: '水平泳道',
                icon: 'l-swimlane-h',
                id: 41,
                data: {
                    text: '水平泳道',
                    width: 500,
                    height: 200,
                    name: 'swimlaneH',
                    textWidth: 0.01,
                    textLeft: 0.04,
                    textAlign: 'left',
                    lineLeft: 0.08,
                },
            },
            {
                name: '垂直分岔/汇合',
                icon: 'l-fork-v',
                id: 42,
                data: {
                    text: '垂直分岔/汇合',
                    width: 10,
                    height: 150,
                    name: 'forkV',
                    fillStyle: '#555',
                    strokeStyle: 'transparent',
                },
            },
            {
                name: '水平分岔/汇合',
                icon: 'l-fork',
                id: 43,
                data: {
                    text: '水平分岔/汇合',
                    width: 150,
                    height: 10,
                    name: 'forkH',
                    fillStyle: '#555',
                    strokeStyle: 'transparent',
                },
            },
        ],
    },
    {
        name: '时序图和类图',
        show: true,
        list: [
            {
                name: '生命线',
                icon: 'l-lifeline',
                id: 44,
                data: {
                    text: '生命线',
                    width: 150,
                    height: 400,
                    textHeight: 50,
                    name: 'lifeline',
                },
            },
            {
                name: '激活',
                icon: 'l-focus',
                id: 45,
                data: {
                    text: '激活',
                    width: 12,
                    height: 200,
                    name: 'sequenceFocus',
                },
            },
            {
                name: '简单类',
                icon: 'l-simple-class',
                id: 46,
                data: {
                    text: 'Topolgoy',
                    width: 270,
                    height: 200,
                    textHeight: 200,
                    name: 'simpleClass',
                    textAlign: 'center',
                    textBaseline: 'top',
                    textTop: 10,
                    list: [
                        {
                            text: '- name: string\n+ setName(name: string): void',
                        },
                    ],
                },
            },
            {
                name: '类',
                icon: 'l-class',
                id: 47,
                data: {
                    text: 'Topolgoy',
                    width: 270,
                    height: 200,
                    textHeight: 200,
                    name: 'interfaceClass',
                    textAlign: 'center',
                    textBaseline: 'top',
                    textTop: 10,
                    list: [
                        {
                            text: '- name: string',
                        },
                        {
                            text: '+ setName(name: string): void',
                        },
                    ],
                },
            },
        ],
    },
    {
        name: 'Echarts图表',
        show: true,
        list: [
            {
                name: '折线图',
                icon: 'l-line-chart',
                data: {
                    name: 'echarts',
                    width: 400,
                    height: 300,
                    externElement: true,
                    form: [
                        {
                            key: 'dataY',
                            name: '数据',
                            type: 'text',
                            readonly: true,
                            placeholder: '仅绑定变量',
                            multiple: true,
                            isTime: false,
                            isYCategory: false,
                        },
                        {
                            key: 'echarts',
                            name: 'echarts',
                            type: 'code',
                            language: 'json',
                            isNotString: true,
                        },
                        {
                            key: 'echarts',
                            key2: 'max',
                            type: 'number',
                            name: '最大数量',
                            placeholder: 'x',
                        },
                    ],
                    disableAnchor: true,
                    echarts: {
                        option: {
                            grid: {
                                top: 10,
                                bottom: 50,
                                left: 40,
                                right: 5,
                            },
                            dataZoom: [
                                {
                                    height: 16,
                                    bottom: 10,
                                },
                            ],
                            xAxis: {
                                type: 'category',
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                axisLabel: {
                                    fontSize: 12,
                                },
                            },
                            yAxis: {
                                type: 'value',
                                axisLabel: {
                                    fontSize: 12,
                                },
                            },
                            series: [
                                {
                                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                                    type: 'line',
                                },
                            ],
                        },
                        max: 100,
                    },
                },
            },
            {
                name: '柱状图',
                icon: 'l-bar-chart',
                data: {
                    width: 300,
                    height: 200,
                    disableAnchor: true,
                    externElement: true,
                    name: 'echarts',
                    form: [
                        {
                            key: 'dataY',
                            name: '数据',
                            type: 'text',
                            readonly: true,
                            placeholder: '仅绑定变量',
                            multiple: true,
                            isTime: false,
                            isYCategory: false,
                        },
                        {
                            key: 'echarts',
                            name: 'echarts',
                            type: 'code',
                            language: 'json',
                            isNotString: true,
                        },
                        {
                            key: 'echarts',
                            key2: 'max',
                            type: 'number',
                            name: '最大数量',
                            placeholder: 'x',
                        },
                    ],
                    echarts: {
                        option: {
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true,
                            },
                            xAxis: {
                                type: 'category',
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                axisTick: {
                                    alignWithLabel: true,
                                },
                            },
                            yAxis: [
                                {
                                    type: 'value',
                                },
                            ],
                            series: [
                                {
                                    name: '直接访问',
                                    type: 'bar',
                                    barWidth: '60%',
                                    data: [10, 52, 200, 334, 390, 330, 220],
                                },
                            ],
                        },
                        max: 100,
                    },
                },
            },
            {
                name: '饼图',
                icon: 'l-pie-chart',
                data: {
                    width: 200,
                    height: 200,
                    disableAnchor: true,
                    externElement: true,
                    name: 'echarts',
                    form: [
                        {
                            key: 'dataY',
                            name: '数据',
                            type: 'text',
                            readonly: true,
                            placeholder: '仅绑定变量',
                            multiple: true,
                        },
                        {
                            key: 'echarts',
                            name: 'echarts',
                            type: 'code',
                            language: 'json',
                            isNotString: true,
                        },
                        {
                            key: 'echarts',
                            key2: 'max',
                            type: 'number',
                            name: '最大数量',
                            placeholder: 'x',
                        },
                    ],
                    echarts: {
                        option: {
                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b}: {c} ({d}%)',
                            },
                            legend: {},
                            series: [
                                {
                                    name: '访问来源',
                                    type: 'pie',
                                    radius: ['50%', '70%'],
                                    avoidLabelOverlap: false,
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'center',
                                        },
                                        emphasis: {
                                            show: true,
                                            textStyle: {
                                                fontSize: '30',
                                                fontWeight: 'bold',
                                            },
                                        },
                                    },
                                    labelLine: {
                                        normal: {
                                            show: false,
                                        },
                                    },
                                    data: [
                                        { value: 335, name: '直接访问' },
                                        { value: 310, name: '邮件营销' },
                                        { value: 234, name: '联盟广告' },
                                        { value: 135, name: '视频广告' },
                                        { value: 1548, name: '搜索引擎' },
                                    ],
                                },
                            ],
                        },
                        replaceMode: ReplaceMode.Replace,
                    },
                },
            },
            {
                name: '仪表盘',
                icon: 'l-dashboard-chart',
                data: {
                    width: 300,
                    height: 300,
                    disableAnchor: true,
                    externElement: true,
                    name: 'echarts',
                    form: [
                        {
                            key: 'dataY',
                            name: '数据',
                            type: 'text',
                            readonly: true,
                            placeholder: '仅绑定变量',
                            multiple: true,
                        },
                        {
                            key: 'echarts',
                            name: 'echarts',
                            type: 'code',
                            language: 'json',
                            isNotString: true,
                        },
                        {
                            key: 'echarts',
                            key2: 'max',
                            type: 'number',
                            name: '最大数量',
                            placeholder: 'x',
                        },
                    ],
                    echarts: {
                        option: {
                            tooltip: {
                                formatter: '{a} <br/>{b} : {c}%',
                            },
                            series: [
                                {
                                    name: '业务指标',
                                    type: 'gauge',
                                    detail: { formatter: '{value}%' },
                                    data: [{ value: 50, name: '完成率' }],
                                },
                            ],
                        },
                        replaceMode: ReplaceMode.Replace,
                    },
                },
            },
        ],
    },
    {
        name: 'Highcharts图表',
        show: true,
        list: [
            {
                name: '折线图',
                icon: 'l-line-chart',
                data: {
                    name: 'highcharts',
                    width: 400,
                    height: 200,
                    disableAnchor: true,
                    externElement: true,
                    form: [
                        {
                            key: 'highcharts',
                            name: 'highcharts',
                            type: 'code',
                            language: 'json',
                            isNotString: true,
                        },
                    ],
                    highcharts: {
                        option: {
                            chart: {
                                backgroundColor: '#ffffff00',
                            },
                            credits: {
                                enabled: false,
                            },
                            xAxis: {
                                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            },
                            yAxis: {
                                type: 'value',
                            },
                            series: [
                                {
                                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                                    type: 'line',
                                },
                            ],
                        },
                    },
                },
            },
            {
                name: '柱状图',
                icon: 'l-bar-chart',
                data: {
                    name: 'highcharts',
                    width: 400,
                    height: 300,
                    disableAnchor: true,
                    externElement: true,
                    form: [
                        {
                            key: 'highcharts',
                            name: 'highcharts',
                            type: 'code',
                            language: 'json',
                            isNotString: true,
                        },
                    ],
                    highcharts: {
                        option: {
                            chart: {
                                backgroundColor: '#ffffff00',
                                type: 'column',
                            },
                            title: {
                                text: '月平均降雨量',
                            },
                            subtitle: {
                                text: '数据来源: WorldClimate.com',
                            },
                            xAxis: {
                                categories: [
                                    '一月',
                                    '二月',
                                    '三月',
                                    '四月',
                                    '五月',
                                    '六月',
                                    '七月',
                                    '八月',
                                    '九月',
                                    '十月',
                                    '十一月',
                                    '十二月',
                                ],
                                crosshair: true,
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: '降雨量 (mm)',
                                },
                            },
                            tooltip: {
                                // head + 每个 point + footer 拼接成完整的 table
                                headerFormat:
                                    '<span style="font-size:10px">{point.key}</span><table>',
                                pointFormat:
                                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                                footerFormat: '</table>',
                                shared: true,
                                useHTML: true,
                            },
                            plotOptions: {
                                column: {
                                    borderWidth: 0,
                                },
                            },
                            series: [
                                {
                                    name: '东京',
                                    data: [
                                        49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
                                        194.1, 95.6, 54.4,
                                    ],
                                },
                                {
                                    name: '纽约',
                                    data: [
                                        83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2,
                                        83.5, 106.6, 92.3,
                                    ],
                                },
                                {
                                    name: '伦敦',
                                    data: [
                                        48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2,
                                        59.3, 51.2,
                                    ],
                                },
                                {
                                    name: '柏林',
                                    data: [
                                        42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1,
                                        46.8, 51.1,
                                    ],
                                },
                            ],
                        },
                    },
                },
            },
            {
                name: '饼图',
                icon: 'l-pie-chart',
                data: {
                    name: 'highcharts',
                    width: 300,
                    height: 300,
                    disableAnchor: true,
                    externElement: true,
                    form: [
                        {
                            key: 'highcharts',
                            name: 'highcharts',
                            type: 'code',
                            language: 'json',
                            isNotString: true,
                        },
                    ],
                    highcharts: {
                        option: {
                            chart: {
                                backgroundColor: '#ffffff00',
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie',
                            },
                            title: {
                                text: '2018年1月浏览器市场份额',
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: true,
                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                        style: {
                                            color: 'black',
                                        },
                                    },
                                },
                            },
                            series: [
                                {
                                    name: 'Brands',
                                    colorByPoint: true,
                                    data: [
                                        {
                                            name: 'Chrome',
                                            y: 61.41,
                                            sliced: true,
                                            selected: true,
                                        },
                                        {
                                            name: 'Internet Explorer',
                                            y: 11.84,
                                        },
                                        {
                                            name: 'Firefox',
                                            y: 10.85,
                                        },
                                        {
                                            name: 'Edge',
                                            y: 4.67,
                                        },
                                        {
                                            name: 'Safari',
                                            y: 4.18,
                                        },
                                        {
                                            name: 'Sogou Explorer',
                                            y: 1.64,
                                        },
                                        {
                                            name: 'Opera',
                                            y: 1.6,
                                        },
                                        {
                                            name: 'QQ',
                                            y: 1.2,
                                        },
                                        {
                                            name: 'Other',
                                            y: 2.61,
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                },
            },
            {
                name: '仪表盘',
                icon: 'l-dashboard-chart',
                data: {
                    name: 'highcharts',
                    width: 300,
                    height: 300,
                    disableAnchor: true,
                    form: [
                        {
                            key: 'highcharts',
                            name: 'highcharts',
                            type: 'code',
                            language: 'json',
                            isNotString: true,
                        },
                    ],
                    externElement: true,
                    highcharts: {
                        option: {
                            chart: {
                                type: 'gauge',
                                plotBackgroundColor: null,
                                plotBackgroundImage: null,
                                plotBorderWidth: 0,
                                plotShadow: false,
                                backgroundColor: '#ffffff00',
                            },
                            title: {
                                text: '速度仪',
                            },
                            pane: {
                                startAngle: -150,
                                endAngle: 150,
                                background: [
                                    {
                                        backgroundColor: {
                                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                            stops: [
                                                [0, '#FFF'],
                                                [1, '#333'],
                                            ],
                                        },
                                        borderWidth: 0,
                                        outerRadius: '109%',
                                    },
                                    {
                                        backgroundColor: {
                                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                            stops: [
                                                [0, '#333'],
                                                [1, '#FFF'],
                                            ],
                                        },
                                        borderWidth: 1,
                                        outerRadius: '107%',
                                    },
                                    {
                                        // default background
                                    },
                                    {
                                        backgroundColor: '#DDD',
                                        borderWidth: 0,
                                        outerRadius: '105%',
                                        innerRadius: '103%',
                                    },
                                ],
                            },
                            // the value axis
                            yAxis: {
                                min: 0,
                                max: 200,
                                minorTickInterval: 'auto',
                                minorTickWidth: 1,
                                minorTickLength: 10,
                                minorTickPosition: 'inside',
                                minorTickColor: '#666',
                                tickPixelInterval: 30,
                                tickWidth: 2,
                                tickPosition: 'inside',
                                tickLength: 10,
                                tickColor: '#666',
                                labels: {
                                    step: 2,
                                    rotation: 'auto',
                                },
                                title: {
                                    text: 'km/h',
                                },
                                plotBands: [
                                    {
                                        from: 0,
                                        to: 120,
                                        color: '#55BF3B', // green
                                    },
                                    {
                                        from: 120,
                                        to: 160,
                                        color: '#DDDF0D', // yellow
                                    },
                                    {
                                        from: 160,
                                        to: 200,
                                        color: '#DF5353', // red
                                    },
                                ],
                            },
                            series: [
                                {
                                    name: 'Speed',
                                    data: [80],
                                    tooltip: {
                                        valueSuffix: ' km/h',
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        ],
    },
    {
        name: 'LightningChart图表',
        show: true,
        list: [
            {
                name: '折线图',
                icon: 'l-line-chart',
                data: {
                    name: 'lightningCharts',
                    width: 400,
                    height: 200,
                    disableAnchor: true,
                    externElement: true,
                    form: [
                        {
                            key: 'lightningCharts',
                            name: 'lightningCharts',
                            type: 'code',
                            language: 'json',
                            isNotString: true,
                        },
                    ],
                    lightningCharts: {
                        option: {
                            type: 'line',
                            //主题参考 https://www.arction.com/lightningchart-js-api-documentation/v3.4.0/interfaces/themes.html
                            theme: 'darkGreen',
                            data: [
                                {
                                    name: 'Sports Car',
                                    data: [
                                        { x: 0, y: 0 },
                                        { x: 50, y: 10 },
                                        { x: 80, y: 20 },
                                        { x: 100, y: 30 },
                                        { x: 150, y: 40 },
                                        { x: 180, y: 50 },
                                        { x: 230, y: 60 },
                                        { x: 290, y: 70 },
                                    ],
                                },
                                {
                                    name: 'Family Car',
                                    data: [
                                        { x: 0, y: 0 },
                                        { x: 100, y: 10 },
                                        { x: 230, y: 20 },
                                        { x: 390, y: 30 },
                                        { x: 470, y: 40 },
                                        { x: 540, y: 50 },
                                        { x: 600, y: 60 },
                                        { x: 800, y: 70 },
                                    ],
                                },
                                {
                                    name: 'Pick-up Car',
                                    data: [
                                        { x: 0, y: 0 },
                                        { x: 80, y: 10 },
                                        { x: 100, y: 20 },
                                        { x: 150, y: 30 },
                                        { x: 230, y: 40 },
                                        { x: 380, y: 50 },
                                        { x: 450, y: 60 },
                                        { x: 580, y: 70 },
                                    ],
                                },
                            ],
                            title: 'title',
                        },
                    },
                },
            },
            {
                name: '柱状图',
                icon: 'l-bar-chart',
                data: {
                    name: 'lightningCharts',
                    width: 400,
                    height: 200,
                    disableAnchor: true,
                    externElement: true,
                    form: [
                        {
                            key: 'lightningCharts',
                            name: 'lightningCharts',
                            type: 'code',
                            language: 'json',
                            isNotString: true,
                        },
                    ],
                    lightningCharts: {
                        option: {
                            type: 'bar',
                            theme: 'darkGreen',
                            groups: ['Finland', 'Germany', 'UK'],
                            categories: ['Engineers', 'Sales', 'Marketing'],
                            data: [
                                [48, 27, 24],
                                [19, 40, 14],
                                [33, 33, 62],
                            ],
                            title: 'My first chart',
                            yTitle: '纵坐标',
                        },
                    },
                },
            },
            {
                name: '饼图',
                icon: 'l-pie-chart',
                data: {
                    name: 'lightningCharts',
                    width: 600,
                    height: 300,
                    disableAnchor: true,
                    externElement: true,
                    form: [
                        {
                            key: 'lightningCharts',
                            name: 'lightningCharts',
                            type: 'code',
                            language: 'json',
                            isNotString: true,
                        },
                    ],
                    lightningCharts: {
                        option: {
                            type: 'pie',
                            innerRadius: 50,
                            data: [
                                {
                                    name: 'Planning',
                                    value: 40,
                                },
                                {
                                    name: 'Development',
                                    value: 120,
                                },
                                {
                                    name: 'Testing',
                                    value: 60,
                                },
                                {
                                    name: 'Review',
                                    value: 24,
                                },
                                {
                                    name: 'Bug Fixing',
                                    value: 90,
                                },
                            ],
                        },
                    },
                },
            },
            {
                name: '仪表盘',
                icon: 'l-dashboard-chart',
                data: {
                    name: 'lightningCharts',
                    width: 300,
                    height: 300,
                    disableAnchor: true,
                    externElement: true,
                    form: [
                        {
                            key: 'lightningCharts',
                            name: 'lightningCharts',
                            type: 'code',
                            language: 'json',
                            isNotString: true,
                        },
                    ],
                    lightningCharts: {
                        option: {
                            type: 'gauge',
                            data: 80,
                            title: '进度条',
                            startAngle: 90,
                            endAngle: -270,
                            background: '#0000ff',
                        },
                    },
                },
            },
        ],
    },
    ]


export async function getOtherIcons(){
    let result = []
    let datas  = await Promise.all([
        getUnicodeIcons(), // 引入字体图标
        getSvgs(),
        getPngs(),
        getPath2Ds(),
        getCanvasDraw()
    ])
    result.push(...datas.filter(Boolean))
    return result
}
async function getUnicodeIcons(){
    let icons = []
    const iconsUrl = await userPensUrl.icon()  // 获取字体图标的路径
    icons = await Promise.all(
        iconsUrl.map( url=> addIcons(url.name))  // 添加字体图标
    )
    return icons // 返回结果
}
async function addIcons(url){
    // 请求路径
   let data = await fetch("/icon/"+url+"/iconfont.json").then((rsp)=> rsp.json())
    let iconGroup = {
        name: data.name,
        loaded: true,
        show: true,
        list: [],
    }
      data.glyphs.map((item) =>
       iconGroup.list.push({  // 侧边栏信息
           name: item.name,
           icon:  // 侧边栏目显示
               data.css_prefix_text +
               item.font_class,
           data: {   // 配置图元信息
               width: 100,
               height: 100,
               name: 'icon', // 指定为icon类型
               iconFamily: data.font_family, // 字体图标配置
               icon: String.fromCharCode(item.unicode_decimal),  // 字体图标
           },
       })
   )
    return iconGroup
}



async function getSvgs(){
    const folderName = "svg/"
    let svgs = []
    const svgUrl =await userPensUrl.svg()
    for (let i of svgUrl ){
        if(i.type === "directory"){
            const {data:files} = await axios.get(folderName+i.name+'/')
            svgs.push({
                name:i.name,
                count:files.length,
                list:[],  // 进行懒加载 暂时不获取文件内容
                folder:true,  // 标记为文件夹 懒加载时进行处理
                show:true,
                svg:true, // 标记为svg文件
                loaded:false // 是否已经懒加载
            })
        }
    }
    return svgs
}



async function getPngs(){
    const folderName = "png/"
    let png = []
    const pngUrl =await userPensUrl.png()
    for (let i of pngUrl ){
        if(i.type === "directory"){
            const {data:files} = await axios.get(folderName+i.name+'/')
            png.push({
                name:i.name,
                count:files.length,
                list:[],  // 进行懒加载 暂时不获取文件内容
                folder:true,  // 标记为文件夹 懒加载时进行处理
                show:true,
                svg:false, // 标记为png文件
                loaded:false
            })
        }
    }
    return png
}
async function getPath2Ds(){
    const folderName = "path2D/"
    let path2d = []
    const path2DUrl = await userPensUrl.path2D()
    for (let i of path2DUrl){
        if(i.type === "directory"){
            const {data:files} = await axios.get(folderName+i.name+'/')
            let dataList = []
            for(let j of files){
                const name = getFileName(j.name)
                dataList.push({
                    name,
                    icon: "l-"+iconMap[name], // 侧边栏展示图标
                    data:{
                        width:100,
                        height:100,
                        name,
                        text:name
                    }
                })

            }
            path2d.push({
                name:i.name,
                count:files.length,
                list:dataList,
                show:true,
            })
        }
    }
    return path2d
}
async function getCanvasDraw(){
    const folderName = "canvasDraw/"
    let canvasDraw = []
    const canvasUrl = await userPensUrl.canvasDraw()
    for (let i of canvasUrl){
        if(i.type === "directory"){
            const {data:files} = await axios.get(folderName+i.name+'/')
            let dataList = []
            for(let j of files){
                const name = getFileName(j.name)
                dataList.push({
                    name,
                    icon: "l-"+canvasDrawMap[name], // 侧边栏展示图标
                    data:{
                        width:100,
                        height:100,
                        name,
                        text:name
                    }
                })

            }
            canvasDraw.push({
                name:i.name,
                count:files.length,
                list:dataList,
                show:true,
            })
        }
    }
    return canvasDraw
}


export async function svgToPens(f, dName) {
    const name = getFileName(f.name)
    const image = "/svg/"+dName+"/"+f.name
    return {
        name,
        image,
        data: parseSvg(await fetch(image).then((res)=> res.text())),
        component: true,
    }
}

function getFileName(name){
    const n = name.lastIndexOf('.')
    if(n!==-1){
        return name.substring(0,n)
    }
    return name
}

export async function pngToPens(f,dName){
    name = getFileName(f.name)
    const image = "/png/"+dName+"/"+f.name
    return {
        name,
        image
    }
}