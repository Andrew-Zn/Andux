/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/
/*
*基本需求
* 需要自己定义的：
* 1.公用数据内容 APPState
*  问题 ：谁都可以修改内容，无法控制，其他组件修改了，如果共同引用一个变量不知道谁修改的，
*  通过一段公用的函数，专门去修改这个公共的内容，
*  修改一个内容，对应的一个操作接口
*  不对 ：要两个函数,首先是定义，然后是修改
*  第一个函数：定义 数据的初始话值，然后是修改数据的接口 registrar （state，means）//记录员记录用什么方法修改数据
*  然后是修改函数：
*   means ={"UPDATE_TITLE_TEXT":state.title.text}
*  dispatch（action）//同过dispatch发射一个动作来修改
*
*
 *  */

class creatStore {
    constructor(){
        this.state ={};//
        this.means = {};//means ={"UPDATE_TITLE_TEXT":state.title.text}
        this.keys= [];
    }
    registrar (state,means){
        this.state = {...this.state , ...state};
        this.means = {...this.means ,...means};
        for (let key in means) {
            let bol = means.hasOwnProperty(key);
            if (bol) {this.keys.push(key)}
            bol = null;
        }
    }
    //{UPDATE_TITLE_TEXT:value}
    dispatch(action){
        this.keys.forEach((key)=>{//循环出所有type类型
            if(!(action[key]=='undefined')){
                //this.means[item] 一串字符串，把字符串按照.拆分成数组
                let ary = this.means[key].split(".");
                let lastIndex = ary.length-1;
                let referenceAddress =  ary.reduce((previousValue, currentValue, currentIndex, array)=>{
                   if(currentIndex == lastIndex){
                       return previousValue;
                   }else{
                       return previousValue[currentValue];
                   }
                },this.state);
                let lastValue = ary[lastIndex];
                referenceAddress[lastValue] =action[key];
            }else {
                return;
            }
        })
    }
}

const appState = {//公用的头部数据
    title: {
        text: '这是头部',
        color: 'red',
    },
    content: {
        text: '这是内容',
        color: 'blue'
    }
}
function controlLog(data) {
    const controlLogDOM = document.getElementById("controlLog");
    controlLogDOM.innerHTML += (data +"<br>");
}
function renderApp (appState) {
    controlLog("renderApp");
    renderTitle(appState.title);
    renderContent(appState.content);
}

function renderTitle(title) {
    controlLog("renderTitle");
    const titleDOM = document.getElementById('title')
    titleDOM.innerHTML = title.text;
    titleDOM.style.color = title.color;
}
function renderContent (content) {
    controlLog("renderContent");
    const contentDOM = document.getElementById('content')
    contentDOM.innerHTML = content.text;
    contentDOM.style.color = content.color;
}

let store = new creatStore();
let means = {UPDATE_TITLE_TEXT:'title.text',UPDATE_TITLE_COLOR:'title.color'};
store.registrar(appState,means);

renderApp(appState) // 首次渲染页面
/*store.dispatch({ 'UPDATE_TITLE_TEXT':'《React.js 小书》' }) // 修改标题文本
renderApp(appState)
store.dispatch({ 'UPDATE_TITLE_COLOR':'blue' }) // 修改标题颜色
renderApp(appState)*/
store.dispatch({  'UPDATE_TITLE_TEXT': '我是朱南' })
renderApp(appState)
console.log(appState);

//每次dispatch 后都要手动来从新render函数，我们希望能自动刷新，这里引入发布订阅模式
//这个模式很好，希望可以复用
