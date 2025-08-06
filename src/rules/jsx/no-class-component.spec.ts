import { dedent } from 'ts-dedent'
import { tester } from '../../spec.ts'
import module from './no-class-component.ts'

tester.test(module, {
  valid: [
    dedent`
      class Component {}
      class Example extends Component {}
    `,
    dedent`
      import { Component } from "react";
      class Example extends Component {
        static getDerivedStateFromError() {}
      }
    `,
    dedent`
      import { Component } from "react";
      class Example extends Component {
        static getDerivedStateFromError = () => {}
      }
    `,
    'class Example extends Component {}',
    'class Example extends React.Component {}',
  ],
  invalid: [
    {
      code: dedent`
        import { Component } from "react";
        class Example extends Component {}
      `,
      errors: [{ messageId: 'invalid' }],
    },
    {
      code: dedent`
        import React from "react";
        class Example extends React.Component {}
      `,
      errors: [{ messageId: 'invalid' }],
    },
  ],
})
