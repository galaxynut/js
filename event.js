function addEvent(target, type, fn) {
        if (target.attachEvent) {
            target["e" + type + fn] = fn;  // IE 事件处理时this指向window，通过赋值this转换为target对象
            target[type + fn] = function () {  // IE事件事件对象window.event,而W3C是以事件传入，封装成一致
                target["e" + type + fn](window.event);
            }
            target.attachEvent("on" + type, target[type + fn]); // detach事件的时候使用
        }
        else {
            target.addEventListener(type, fn, false);
        }
    }

    function removeEvent(target, type, fn){
        if(target.detachEvent){
            target.detachEvent("on" + type, target[type + fn]);
        }
        else{
            target.removeEventListener(type, fn);
        }
    }
//IE9 以上已经支持addEventListener  IE11已经废掉attachEvent
