
function populate_form(form_selector,data){
    populate_form.arr	= [];
    populate_form.parseJSON(_data)
    let form = document.querySelector(form_selector);
    for(var i in populate_form.arr) {
        if (populate_form.arr.hasOwnProperty(i)) {
            populate_form.populateFormElement(form, i, populate_form.arr[i])
        }
    }
}
populate_form.parseJSON = function (obj, path) {
    // prepare
    path = path || '';


    // iteration (objects / arrays)
    if (obj === undefined || obj === null) { //  obj === '' ||
        // do nothing
    } else if (obj.constructor === Object) {
        for (var prop in obj) {
            name = path + (path === '' ? prop : '[' + prop + ']');
            populate_form.parseJSON(obj[prop], name);
        }
    } else if (obj.constructor === Array) {
        for (var i = 0; i < obj.length; i++) {
            populate_form.parseJSON(obj[i], path.toString());
        }
        // assignment (values)
    } else {
        // if the element name hasn't yet been defined, create it as a single value
        if (populate_form.arr[path] === undefined) {
            populate_form.arr[path] = obj;
            // if the element name HAS been defined, but it's a single value, convert to an array and add the new value
        } else if (arr[path].constructor !== Array) {
            populate_form.arr[path] = [populate_form.arr[path], obj];
            // if the element name HAS been defined, and is already an array, push the single value on the end of the stack
        } else {
            populate_form.arr[path].push(obj);
        }
    }

}


populate_form.populateFormElement = function(form, name, value) {

    // check that the named element exists in the form
    let selector = '[name="'+name+'"]' ;
    let _element	= form.querySelector(selector);

    // if the form element doesn't exist, check if there is a tag with that id
    if(_element === undefined || _element === null) {
        // look for the element
        //console.log('No such element as ' + selector);
        return false;
    }

    // now, place any single elements in an array.
    // this is so that the next bit of code (a loop) can treat them the
    // same as any array-elements passed, ie radiobutton or checkox arrays,
    // and the code will just work
    let elements = _element.type === undefined && _element.length ? _element : [_element];

    // populate the element correctly
    for(var e = 0; e < elements.length; e++) {
        // grab the element
        let element = elements[e];
        // skip undefined elements or function objects (IE only)
        if(!element || typeof element == 'undefined' ||
            typeof element == 'function') {
            continue;
        }

        // anything else, process
        switch(element.type || element.tagName) {
            case 'radio':
                // use the single value to check the radio button
                element.checked = (element.value !== '' && value.toString() === element.value);
                break;
            case 'checkbox':
                // depends on the value.
                // if it's an array, perform a sub loop
                // if it's a value, just do the check
                values = value.constructor === Array ? value : [value];
                for(let j = 0; j < values.length; j++) {
                    element.checked |= element.value === values[j];
                }

                //element.checked = (element.value != '' && value.toString().toLowerCase() == element.value.toLowerCase());
                break;
            case 'select-multiple':
                values = value.constructor === Array ? value : [value];
                for(let i = 0; i < element.options.length; i++) {
                    for(var j = 0; j < values.length; j++) {
                        element.options[i].selected |= element.options[i].value === values[j];
                    }
                }
                break;
            case 'select':
            case 'select-one':
                element.value = value.toString() || value;
                break;
            case 'text':
            case 'button':
            case 'textarea':
            case 'submit':
            default:
                value			= value == null ? '' : value;
                element.value	= value;

        }

    }

}