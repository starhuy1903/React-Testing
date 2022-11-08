// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.append(div)
  // ReactDOM.render(<Counter/>, div);
  // 🐨 use createRoot to render the <Counter /> to the div
  const root = createRoot(div)
  act(() => root.render(<Counter />))
  // 🐨 get a reference to the increment and decrement buttons:
  const [decrement, increment] = div.querySelectorAll('button')
  // 🐨 get a reference to the message div:
  const message = div.firstChild.querySelector('div')
  //
  // 🐨 expect the message.textContent toBe 'Current count: 0'
  expect(message.textContent).toBe('Current count: 0')
  const incrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  // act(() => increment.click())
  // increment.dispatchEvent(incrementClickEvent)
  act(() => increment.dispatchEvent(incrementClickEvent))

  // 🐨 click the increment button (💰 act(() => increment.click()))
  expect(message.textContent).toBe('Current count: 1')
  // 🐨 assert the message.textContent
  const decrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  // act(() => decrement.click())
  act(() => decrement.dispatchEvent(decrementClickEvent))
  // 🐨 click the decrement button (💰 act(() => decrement.click()))
  // 🐨 assert the message.textContent
  expect(message.textContent).toBe('Current count: 0')
  // 🐨 cleanup by removing the div from the page (💰 div.remove())
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
})

/* eslint no-unused-vars:0 */
