import dedent from 'ts-dedent'
import { runTest } from '../../spec'
import module from './no-class-component'

runTest({
  module,
  *valid() {
    yield dedent`
      class Component {}
      class Example extends Component {}
    `
    yield dedent`
      import { Component } from "react";
      class Example extends Component {
        static getDerivedStateFromError() {}
      }
    `
    yield dedent`
      import { Component } from "react";
      class Example extends Component {
        static getDerivedStateFromError = () => {}
      }
    `
    yield 'class Example extends Component {}'
    yield 'class Example extends React.Component {}'
  },
  *invalid() {
    yield {
      code: dedent`
        import { Component } from "react";
        class Example extends Component {}
      `,
      errors: [{ messageId: 'invalid' }],
    }
    yield {
      code: dedent`
        import React from "react";
        class Example extends React.Component {}
      `,
      errors: [{ messageId: 'invalid' }],
    }
  },
})
