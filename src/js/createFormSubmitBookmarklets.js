function buildBookmark(form) {  
  function getFormParams(form) {
    function addParam(name, value, out) {  return out + (out ? ',' : '') + '"' + name + '":"' + value + '"' };
    function addAll(form, tag, out) { 
      for (const els of form.getElementsByTagName(tag)) {  out = addParam (els.name, els.value, out); } 
      return out 
    }
    var out = ''
    for (const tag of ['input', 'textarea', 'submit']) { 
      out = addAll(form, tag, out); 
    }
    var params = ''; 
    for (const sels of form.getElementsByTagName('select')) {
      for (const opts of form.getElementsByTagName('option')) {
          if (opts.selected) { out = addParam (sels.name, opts.value, out); }
      };
    };
    return '{' + out + '}';
  };
  var header = '<h4>Form - ';
  if (form.name) header += ' name: ' + form.name; 
  if (form.id) header += ', id: ' + form.id;
  header += ', action: ' + form.action + '</h4>';
  return header + 'javascript:function sf(ur,ty,fd){' + 
    'function me(tg,pr){var el=document.createElement(tg);' + 
    'for(const[nm,vl]of Object.entries(pr)){el.setAttribute(nm,vl);}return el}' + 
    'const fm=me("form",{action:ur,method:ty});' + 
    'for(const[nm,vl]of Object.entries(fd)){' +
    'fm.appendChild(me("input",{name:nm, value:vl}))' + 
    '}document.body.appendChild(fm);fm.submit()' + 
    '}sf("' + form.action + '","' + form.method + '",' + getFormParams(form) + ');'; 
};
try {
  var bookmarks = '';
  for (const form of window.document.getElementsByTagName('form')) { 
    bookmarks += buildBookmark(form) + '\r\n'; 
  }
} catch (e) { console.trace(e);alert(e) }
var handle = open('', 'bbout', "width=800,height=600,resizable,scrollbars");
handle.document.write('<html><title>Form Bookmarklets</title><body>' + bookmarks + '</body></html>');


// Use something that understands ES6 to make it into a bookmarklet.
// Such as Uglify, https://skalman.github.io/UglifyJS-online/

// I built this with help from the following, most notably: https://superuser.com/a/1238885/949441.
// https://superuser.com/questions/426189/storing-a-http-post-request-in-a-bookmark-or-something-similar-as-you-would-with
// https://www.thewebflash.com/how-to-add-a-cross-browser-add-to-favorites-bookmark-button-to-your-website
// https://gist.github.com/oilvier/70abd45d1f2ffc98b568
// https://superuser.com/questions/426189/a/445984
