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

function heroMsg(text){
    let timeToRead = (text.split(/\s+/).length/2)*100
    if(timeToRead < 2000){
        timeToRead = 2000
    }
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
function myMsg(text){
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

function rememberThat(type){
    switch(type){
        case 0:
            worldMsg("*Theodor запомнил это*")
            break;
        case 1: 
            worldMsg("*Theodor запомнил это*")
            break;
        case 2:
            worldMsg("*Theodor запомнил это*")
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
                        waiting
                        </div>
                        `
                    } ,300)

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

    await worldMsg("Добро пожаловать в 15-минутный интерактивный квест по игре The Walking Dead!")
    await worldMsg("Игра адаптируется под ваши действия.")
    await worldMsg("История развивается так, как вы поступаете.")
    
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
        rememberThat(2)
    }
    else{
        coldrelations = 1
        rememberThat(1)  
    }
    await heroMsg("Прикинь, "+player_name+", над нами только что пролетел вертолет, военный. Странно, ведь везде тихо, ничего необычного. В новостях тоже ничего.")
    myMsg("Может стоит оглядеться?")
    choices = ["Посмотри куда летит вертолет.", "Посмотри по сторонам.", "Посмотри назад."]
    answers = ["Он летит в сторону Атланты.", "По сторонам только лес. Все тихо, ни души.", "О! сзади едет серая машина."]
    choice = await makeChoice(choices, answers)
    checkTimeInteractive()
    await heroMsg(answers[choice])
    if(choice == 0 || choice == 1){
        myMsg("А, ну тогда все нормально. Не переживай.")
        await heroMsg("Пожалуй, ты прав")
        optionNoCarNoticed()
    }
    else{
        myMsg("Ого! Может ему нужна помощь?")
        await heroMsg("Возможно")
        myMsg("Попросишь водителя вашего автобуса остановиться?")
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
    myMsg("ау")
    myMsg("ауууууууууу")
    myMsg("аууауауауау")
    myMsg("ау1!!!!!!!")
    myMsg("ЧЕЛ")
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
    }
  else{
    await heroMsg("Автобус попытался остановить машину, не справился с управлением и врезался в дерево")
    choices = ["Ты в порядке?", "ЧТО?!!"]
    answers = ["Да, мне повезло. Я увидел,что машина приближается, и успел спятаться.", "Мне повезло. Я увидел,что машина приближается, и успел спятаться."]
    choice = await makeChoice(choices)
    await heroMsg(answers[choice])
    await heroMsg("Пара ссадин и синяков. Хорошо, что автобус не перевернулся.")
    }
}
start()