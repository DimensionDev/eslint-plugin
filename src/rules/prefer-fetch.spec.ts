import { tester } from '../spec.ts'
import module from './prefer-fetch.ts'

tester.test(module, {
  invalid: [
    { code: 'import "axios"', errors: [{ messageId: 'callee' }] },
    { code: 'import "request"', errors: [{ messageId: 'callee' }] },
    { code: 'new XMLHttpRequest()', errors: [{ messageId: 'callee' }] },
    // cspell:disable-next-line
    { code: 'new ActiveXObject("MSXML2.XMLHTTP")', errors: [{ messageId: 'callee' }] },
    // cspell:disable-next-line
    { code: 'new ActiveXObject("Microsoft.XMLHTTP")', errors: [{ messageId: 'callee' }] },
    { code: 'require("axios")', errors: [{ messageId: 'callee' }] },
    { code: 'require("request")', errors: [{ messageId: 'callee' }] },
    { code: '$http()', errors: [{ messageId: 'callee' }] },
    { code: '$(element).load()', errors: [{ messageId: 'callee' }] },
    { code: 'jQuery(element).load()', errors: [{ messageId: 'callee' }] },
    { code: 'jQuery.ajax()', errors: [{ messageId: 'callee' }] },
    { code: 'jQuery.get()', errors: [{ messageId: 'callee' }] },
    { code: 'jQuery.post()', errors: [{ messageId: 'callee' }] },
    { code: 'jQuery.getJSON()', errors: [{ messageId: 'callee' }] },
    { code: 'jQuery.getScript()', errors: [{ messageId: 'callee' }] },
  ],
})
