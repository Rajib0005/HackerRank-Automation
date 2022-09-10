const puppeteer = require('puppeteer');
const codeObj = require('./code')
const loginLink = 'https://www.hackerrank.com/auth/login'
const email = 'geekcoder@gmal.com'
const password = 'geekcoder1234'
let browserOpen = puppeteer.launch({
    headless: false,
    args: ['--start-maximized'] ,
    defaultViewport: null
    })
    let page 

browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise;
}).then(function(newTab){
    page = newTab
    let hackerrankOpenPromise = newTab.goto(loginLink)
    return hackerrankOpenPromise;
}).then(function(){
    let emailisEntered = page.type("input[id = 'input-1']", email, {delay : 50})
    return emailisEntered
}).then(function(){
    let passwordisEntered = page.type("input[id = 'input-2']", password, {delay: 50})
    return passwordisEntered
}).then(function(){
    let loginbuttonClicked = page.click('button[type = submit]', {delay: 50})
    return loginbuttonClicked 
}).then(function(){
    let algorithmClicked = waitAndClick('.topic-card a[data-attr1="algorithms"]', page)
    return algorithmClicked
}).then(function(){
    let warmupCheckBox = waitAndClick('input[value="warmup"]', page)
    return warmupCheckBox
}).then(function(){
    let allchallangesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay: 50})
    return allchallangesPromise
}).then(function(questionsArr){
    console.log("Number of questions",questionsArr.length)
    let questionWillbeSolved = questionSolver(page,questionsArr[0], codeObj.answers[0])
    return questionWillbeSolved
})

function waitAndClick(selector, cpage){
    return new Promise(function(resolve, reject){
        let waitForModalPromise = cpage.waitForSelector(selector)
        waitForModalPromise.then(function(){
            let clickModal = cpage.click(selector)
            return clickModal
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject();
        })
    })
}

function questionSolver(page, question, answer){
    return new Promise(function(resolve, reject){
        let questionwillbeClicked = question.click()
         questionwillbeClicked.then(function(){
            let editorHitPromise = waitAndClick('.monaco-editor.no-user-select.vs',page)
            return editorHitPromise
        }).then(function(){
            return waitAndClick('.checkbox-input', page)
        }).then(function(){
            return page.waitForSelector('textarea.custominput', page)
        }).then(function(){
            return page.type('textarea.custominput', answer,{delay:10})
        }).then(function(){
            let ctrlPressed = page.keyboard.down('Control')
            return ctrlPressed
        }).then(function(){
            let AisPressed = page.keyboard.press('A', {delay:100})
            return AisPressed
        }).then(function(){
            let XisPressed = page.keyboard.press('X', {delay:100})
            return XisPressed
        }).then(function(){
            let ctrlUnpressed = page.keyboard.up('Control')
            return ctrlUnpressed
        }).then(function(){
            let maineditor = waitAndClick('.monaco-editor.no-user-select.vs',page)
            return maineditor
        }).then(function(){
            let ctrlPressed = page.keyboard.down('Control')
            return ctrlPressed
        }).then(function(){
            let AisPressed = page.keyboard.press('A', {delay:400})
            return AisPressed
        }).then(function(){
            let VisPressed = page.keyboard.press('V', {delay:400})
            return VisPressed
        }).then(function(){
            let ctrlUnpressed = page.keyboard.up('Control')
            return ctrlUnpressed
        }).then(function(){
            return page.click('.hr-monaco-submit', {delay:50})
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}
