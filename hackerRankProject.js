const puppeteer=require('puppeteer')

let browser;
let page
let code;
let language
puppeteer
//oper browser
    .launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
        //slowmo is used to control speed of autoomation if we want to 

    })
    //load browse
    .then(function(b){
        browser=b;
        return browser.pages()
    })
    //load browser pages and open blank page
    .then(function(pages){
        page=pages[0]
        return page.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    })
    .then(function(){
        return page.type("#input-1","gikom95754@shzsedu.com")
   })
   .then(function(){
       return page.type("#input-2","rubal12")
   })
   .then(function(){
        return Promise.all([
            page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"),
            page.waitForNavigation()
        ])
    })
    .then(function(){
        return Promise.all([
            page.click("[title='Interview Preparation Kit']"),
            page.waitForNavigation()
        ])
    })
    .then(function(){
    
        return waitClickNavigate("[data-attr1='warmup']")
    })
    .then(function(){
        //.ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled
       return waitClickNavigate(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled")
    })
    .then(function(){
        return waitClickNavigate("[data-attr2='Editorial']")
    })
    .then(function(){
       return handleLock();
    })
    .then(function () {
        return page.evaluate(function () {
          return document.querySelector(
            ".challenge-editorial-block.editorial-setter-code pre"
          ).innerText;
        });
      })
      .then(function (data) {
        code = data;
        return page.evaluate(function () {
          return document.querySelector(
            ".challenge-editorial-block.editorial-setter-code h3"
          ).innerText;
        });
      })
      .then(function (title) {
        language = title.trim();
        console.log(language);
        return page.click("[data-attr2='Problem']");
      })
      .then(function () {
        return pasteCode();
    })
    .catch(function(err){
        console.log(err);
    })

    function pasteCode() {
        return new Promise(function (resolve, reject) {
          page
            .waitForSelector("[type='checkbox']")
            .then(function () {
              return page.click("[type='checkbox']");
            })
            .then(function () {
              return page.waitForSelector("#input-1");
            })
            .then(function () {
              return page.type("#input-1", code);
            })
            .then(function () {
              return page.keyboard.down("Control");
            })
            .then(function () {
              return page.keyboard.press("A");
            })
            .then(function () {
              return page.keyboard.press("X");
            })
            
            .then(function(){
                return page.click(".css-1hwfws3")
            })
            .then(function(){
                return page.keyboard.up("Control")
            })
            .then(function(){
                return page.type(".css-1hwfws3",language)
            })
            .then(function () {
                return page.keyboard.press("Enter");
              })
              .then(function(){
                return page.keyboard.down("Control")
            })
            .then(function () {
              return page.click(".monaco-editor.no-user-select.vs");
            })
            .then(function () {
              return page.keyboard.press("A");
            })
            .then(function () {
              return page.keyboard.press("V");
            })
            .then(function () {
              return page.keyboard.up("Control");
            })
            .then(function () {
              return page.click(
                ".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled"
              );
            })
            .then(function () {
              resolve();
            })
            .catch(function (err) {
              reject(err);
            });
        });
      }

    function handleLock(){
        return new Promise(function(resolve,reject){
            page.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled",{visible:true})
            .then(function(){
                return page.click(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled")
            })
            .then(function(){
                resolve();
            })
            .catch(function(){
                resolve();
            })
        }) 
    } 
    function waitClickNavigate(selector){
        return new Promise(function(resolve,reject){
            page.waitForSelector(selector,{visible:true})
            .then(function(){
                return Promise.all([
                    page.click(selector),
                    page.waitForNavigation()
                ])
            })
            .then(function(){
                resolve();
            })
            .catch(function(err){
                reject(err);
            })
        }) 
    } 