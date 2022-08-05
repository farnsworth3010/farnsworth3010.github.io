let choices, answers
var waitingForChoice = false
let choice, coldrelations
let isFullscreen = false
function worldMsg(text){
    return new Promise(resolve => {
        setTimeout(()=>{
            document.getElementById("messages-container").insertAdjacentHTML("beforeend",`
            <div class="world-message">
                    `+text+`
                    </div>
            `)
            document.getElementById("messages-container").scrollTop = Math.pow(10, 10)
            resolve()
        }, 3000)
      });

}

function delay(func, ms){
    console.log(func)
    return new Promise(resolve => {
        setTimeout(()=>{
 
            func()
            resolve()
        }, ms)
    })
}

function heroMsg(text){
    //  let timeToRead = (text.split(/\s+/).length/2)*100
    let timeToRead
    // if(timeToRead < 2000){
        timeToRead = 300
    // }
    setOnline("Печатает...")
    return new Promise(resolve => {
        setTimeout(()=>{
            let date = new Date()
            let hour = date.getHours()
            if(hour>=0 & hour <=9){
                hour = "0"+hour
            }
            let minutes = date.getMinutes()
            if(minutes>=0 & minutes <=9){
                minutes= "0"+minutes
            }
            document.getElementById("messages-container").insertAdjacentHTML("beforeend",`
            <div class="message hero-message">
            `+text+`
            <div class="time">`+hour+`:`+minutes+`</div>
            <div class="corner"></div>
        </div>
            `)
            document.getElementById("messages-container").scrollTop = Math.pow(10, 10)
            setOnline("Онлайн")
            var audio = new Audio('../media/sounds/notification.mp3');
            audio.play()
            resolve()
        },timeToRead)
      });

    
}
let myMsg = (text)=>{
        let date = new Date()
        let hour = date.getHours()
        if(hour>=0 & hour <=9){
            hour = "0"+hour
        }
        let minutes = date.getMinutes()
        if(minutes>=0 & minutes <=9){
            minutes= "0"+minutes
        }
        document.getElementById("messages-container").insertAdjacentHTML("beforeend",`
        <div class="message my-message">
        `+text+`
        <div class="time">`+hour+`:`+minutes+`</div>
        <div class="corner"></div>
    </div>
        `)
        document.getElementById("messages-container").scrollTop = Math.pow(10, 10)

}

document.getElementById("fullscreen").addEventListener('click', ()=>{
    openFullscreen()
})

function openFullscreen(){
    if(!isFullscreen){
        if (document.body.requestFullscreen) {
            document.body.requestFullscreen();
        } else if (document.body.webkitRequestFullscreen) { /* Safari */
            document.body.webkitRequestFullscreen();
        } else if (document.body.msRequestFullscreen) { /* IE11 */
            document.body.msRequestFullscreen();
        }
        isFullscreen = true
    }
    else{
        isFullscreen = false
        document.exitFullscreen();
    }
}

function choiceBtnHandler(choiceNum){
    waitingForChoice = false
    choice = choiceNum
}

function setOnline(online){
    document.getElementById("hero-status").innerHTML = online
}

async function rememberThat(type){
    switch(type){
        case 0:
            await worldMsg("*Theodor запомнил это*")
            break;
        case 1: 
            await worldMsg("*Theodor возмущён вашим ответом*")
            break;
        case 2:
            await worldMsg("*Theodor рад вашей поддержке*")
            break;
    }
}

function showChoices(choices){
    document.getElementById('choices-block').innerHTML = ''
    let counter = 0
    for(let i of choices){
        document.getElementById("choices-block").insertAdjacentHTML("beforeend",`
        <div class="choice" onClick="choiceBtnHandler(`+counter+`)">`+i+`</div>
        `)
        ++counter
    }
}

function makeChoice(choices, answers){
    waitingForChoice = true
    showChoices(choices)
    let choicesBtns = document.getElementsByClassName("choice")
    return new Promise(resolve => {
        let waitingForChoice = true
        for(let i of choicesBtns){
            i.addEventListener('click',()=>{
                waitingForChoice = false
            })
        }
        function wait(){
            setTimeout(()=>{
                if(waitingForChoice === true){
                    wait()
                }
                else{
                    resolve(choice)
                    myMsg(choices[choice])
                    for(let i of choicesBtns){
                        i.classList.add("disappear")
                    }
                    setTimeout(()=>{
                        document.getElementById('choices-block').innerHTML = `
                        <div class="waiting">
                        
                        </div>
                        `
                    }, 300)

                }
            }, 100)
        }
        wait()
      });
}
    
function checkTimeInteractive(){
    let date = new Date()
    let hour = date.getHours()
    if(hour>=0 & hour <=9){
        hour = "0"+hour
    }
    let minutes = date.getMinutes()
    if(minutes>=0 & minutes <=9){
        minutes= "0"+minutes
    }
    if(hour > 4 && hour < 10){
        heroMsg("Светлеет, ого, уже "+hour+":"+minutes)
    }
    else if(hour > 9 && hour < 18){
        heroMsg("Светло, ого, уже "+hour+":"+minutes)
    }
    else if(hour > 17 && hour < 22){
        heroMsg("Темнеет, ого, уже "+hour+":"+minutes)
    }
    else{
        heroMsg("Темно то как... ого, уже "+hour+":"+minutes)
    }
}
let player_name = "x"

async function start(){
    // await worldMsg("Добро пожаловать в 15-минутный интерактивный квест по игре The Walking Dead!")
    // await worldMsg("Игра адаптируется под ваши действия.")
    // await worldMsg("История развивается так, как вы поступаете.")
    await heroMsg("Хей "+player_name+". Не скучаешь там с температурой?")
    
    choices = ["Да, немного скучно", "Нет, мне и тут хорошо"]
    answers = ["Хах, ну, в любом случае, я расскажу тебе как проходит поездка.", "Хах, ну, в любом случае, я расскажу тебе как проходит поездка."]
    choice = await makeChoice(choices, answers)
    await heroMsg(answers[choice])
    await heroMsg("Уже выехали на 85 шоссе, пара часов и будем в Атланте. Джесси, правда, что-то не здоровится. Она странно себя ведет. Говорит, ее покусала утром собака соседа, прям перед выездом. Но выглядит она очень уж бледной. Лучше бы ей, как и тебе, остаться дома сегодня. Мало ли какая зараза в озере может в рану попасть.")
    
    choices = ["Ого! Я надеюсь, она будет в порядке…", "Нечего было ехать, раз такое дело."]
    answers = ["Да, согласен. Я немного переживаю за нее.", "Мм, возможно ты и прав, но она очень хотела поехать. Все-таки последний раз в году."]
    choice = await makeChoice(choices, answers)
    await heroMsg(answers[choice])
    if(choice == 0){
        coldrelations = 0
        await rememberThat(2)
    }
    else{
        coldrelations = 1
        await rememberThat(1)  
    }
    await heroMsg("Прикинь, "+player_name+", над нами только что пролетел вертолет, военный. Странно, ведь везде тихо, ничего необычного. В новостях тоже ничего.")
    myMsg("Может стоит оглядеться?")
    choices = ["Посмотри куда летит вертолет.", "Посмотри по сторонам.", "Посмотри назад."]
    answers = ["Он летит в сторону Атланты.", "По сторонам только лес. Все тихо, ни души.", "О! сзади едет серая машина."]
    choice = await makeChoice(choices, answers)
    checkTimeInteractive()
    await heroMsg(answers[choice])
    if(choice == 0 || choice == 1){
        await myMsg("А, ну тогда все нормально. Не переживай.")
        await heroMsg("Пожалуй, ты прав")
        optionNoCarNoticed()
    }
    else{
        await myMsg("Ого! Может ему нужна помощь?")
        await heroMsg("Возможно")
        await myMsg("Попросишь водителя вашего автобуса остановиться?")
        if(coldrelations == 0){
            await heroMsg("Пожалуй ты прав, секунду...")
            await heroMsg("я попросил водителя снизить скорость. он поровнялся с машиной.")
            await heroMsg(player_name+", у него глаза белые...у водителя полностью белые глаза!")
            await heroMsg("ОН УПАЛ НА РУЛЬ, МАШИНА УСКОРЯЕТСЯ")
            // worldMsg("*ПОЛЬЗОВАТЕЛЬ ТЕОДОР ВЫШЕЛ ИЗ СЕТИ*")
            carCrash("noncritical")
        }
        else{
            await heroMsg("Может не стоит?")
            choices = ["Иди попроси!", "Что-то тут не чисто."]
            answers = ["Пожалуй ты прав, секунду..", "Сам разберётся"]
            choice = await makeChoice(choices)
            await heroMsg(answers[choice])
            if(choice == 0){
                await heroMsg("я попросил водителя снизить скорость. он поровнялся с машиной.")
                await heroMsg(player_name+", у него глаза белые...у водителя полностью белые глаза!")
                await heroMsg("ОН УПАЛ НА РУЛЬ, МАШИНА УСКОРЯЕТСЯ")
                // worldMsg("*ПОЛЬЗОВАТЕЛЬ ТЕОДОР ВЫШЕЛ ИЗ СЕТИ*")
                carCrash("noncritical")
            }
            else{
                optionNoCarNoticed()
            }
        }
    }
}

async function optionNoCarNoticed(){
    await heroMsg("Мне кажется, что Джесси все хуже. бедняжка уснула, не буду ее тревожить.")
    choices = ["Жаль. Вы скоро уже приедете?", "Здесь могла быть реплика"]
    answers = ["Видимо, что уже скоро. Минут через двадцать будем на месте", "Здесь могла быть реплика"]
    choice = await makeChoice(choices)
    await heroMsg(answers[choice])
    await heroMsg("Что за чертовщина?.. Дорога спереди заставлена брошенными машинами, мы останавливаемся")
    await heroMsg("Все повскакивали с мест. Смотрят на свалку. автобус остановили.")
    setOnline("Был в сети только что")
    await delay(()=>{myMsg("ауууу")}, 5000)
    await delay(()=>{myMsg("ауууууууу")}, 1000)
    await delay(()=>{myMsg("АУАУАУАУ")}, 2000)
    await delay(()=>{myMsg("ауууу")}, 1000)
    await delay(()=>{myMsg("чел")}, 1000)
    carCrash("critical")
}

async function carCrash(damage){
    if(damage == "critical"){
    await heroMsg(player_name+", ты представляешь?!")
    await heroMsg("Пока автобус стоял, в нас сзади въехала машина на очень большой скорости")
    await heroMsg("Автобус перевернуло набок")
    await heroMsg("Я не знаю, что делать")
    
    choices = ["Ты в порядке?", "ЧТО?!!"]
    answers = ["Мне кажется, что я слишком долго был в отключке. Что-то не так с ногой", "Мне кажется, что я слишком долго был в отключке. Что-то не так с ногой"]
    choice = await makeChoice(choices)
    await heroMsg(answers[choice])
    await heroMsg("Сидение в автобусе отвалилось и рухнуло прямо мне на ногу.")
    
    choices = ["Цел?", "Идти сможешь?"]
    answers = ["Я еле вылез оттуда, но далеко я не уйду с такой ногой.", "Далеко я не уйду с такой ногой."]
    choice = await makeChoice(choices)
    await heroMsg(answers[choice])

    choices = ["Попробуй встать", "Осмотрись"]
    answers = ["нет, слишком больно", "Отсюда ничего не видно, нужно встать, а я не могу, больно.."]
    choice = await makeChoice(choices)
    await heroMsg(answers[choice])

    myMsg("здесь мог быть текст, но автор не дописал сценарий")
    await howArePeopleAfterCrash()

    await myMsg("Может быть тебе стоит сходить и проверить")
    choices = ["осмотри вокруг автобус, может что уцелело?", "Может стоит сходить посмотреть на ту свалку машин?", "Стоит найти помощь"]
    choice = await makeChoice(choices)
    switch(choice){
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
    }
    }
  else{
    await heroMsg("Автобус попытался остановить машину, не справился с управлением и врезался в дерево")
    choices = ["Ты в порядке?", "ЧТО?!!"]
    answers = ["Да, мне повезло. Я увидел,что машина приближается, и успел спрятаться.", "Мне повезло. Я увидел,что машина приближается, и успел спятаться."]
    choice = await makeChoice(choices)
    await heroMsg(answers[choice])
    await heroMsg("Пара ссадин и синяков. Хорошо, что автобус не перевернулся.")
    await howArePeopleAfterCrash()
    
    await myMsg("Может быть тебе стоит сходить и проверить")
    choices = ["автобус внутри? мало ли что ценное осталось", "та машина, что с ней?", "Давай к дороге, посмори, что там происходит"]
    choice = await makeChoice(choices)
    switch(choice){
        case 0:
            await heroMsg("Я нашел воду.")
            break;
        case 1:
            await heroMsg("Вся в смятку, можно подойти обыскать её")
            break;
        case 2:
            await heroMsg("Всё заставлено машинами без людей")
            break;
    }

    }
}

async function howArePeopleAfterCrash(choices, answers){
    choices = ["Что с Джесси?", "Что с учителем?", "Что с водителем автобуса?", "Что с остальными студентами?"]
    answers = [howisjessy, howisteacher, howisdriver, howarestudents]
    for(let i = 0; i<4; ++i){
        choice = await makeChoice(choices, answers)
        await answers[choice]()
        choices.splice(choice, 1)
        answers.splice(choice, 1)
        console.log(choices)
        console.log(answers)
    }
}

let howisjessy = async (branch)=>{
    await heroMsg("Цела. Я, когда увидел, что вот вот врежемся, разбудил ее и  мы спрятались.")
    await heroMsg("Но вид у нее не очень, нужно осмотреть тут все. Может найду у кого воды для нее")
}

let howisteacher = async (branch)=>{
    await heroMsg("Он вылетел через лобовое у меня на глазах..")
    await heroMsg("Я думаю, что ему уже не помочь..")
}

let howisdriver = async (branch)=>{
    await heroMsg("Зажат в кабине, вроде шевелится")
    choices = ["Иди помоги ему", "Не трогай его, мало ли что"]
    answers = ["Посмотрим, что я смогу сделать", "С дуба рухнул?"]
    choice = await makeChoice(choices)
    await heroMsg(answers[choice])
}

let howarestudents = async (branch)=>{
    await heroMsg("Несколько человек  выбежали и куда-то понеслись, двое лежат без сознания")
}

start()