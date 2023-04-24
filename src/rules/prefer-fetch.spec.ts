import { runTest } from '../spec.js'
import module from './prefer-fetch.js'

runTest({
  module,
  *invalid() {
    yield { code: 'import "axios"', errors: [{ messageId: 'callee' }] }
    yield { code: 'import "request"', errors: [{ messageId: 'callee' }] }
    // cspell:ignore MSXML XMLHTTP
    {
      const segments = [
        'new XMLHttpRequest()',
        'new ActiveXObject("MSXML2.XMLHTTP")',
        'new ActiveXObject("Microsoft.XMLHTTP")',
      ]
      for (const segment of segments) {
        yield { code: segment, errors: [{ messageId: 'callee' }] }
      }
    }
    {
      const segments = [
        // axios
        'require("axios")',
        // request
        'require("request")',
        // angular
        '$http()',
        // jQuery
        '$(element).load()',
        'jQuery(element).load()',
        'jQuery.ajax()',
        'jQuery.get()',
        'jQuery.post()',
        'jQuery.getJSON()',
        'jQuery.getScript()',
      ]
      for (const segment of segments) {
        yield { code: segment, errors: [{ messageId: 'callee' }] }
      }
    }
  },
})
