import { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

import guidelines from './guidelines.json'

const Container = styled.main`
  max-width: 35rem;
  margin-inline: auto;
  padding: 2rem;
`

const Surface = styled.section`
  background-color: var(--surface);
  color: var(--on-surface);
  border-radius: 1rem;
  padding: 2rem 1rem;
`

const Heading = styled.h1`
  text-align: center;
  margin-block-end: 2rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media screen and (min-width: 30em) {
    flex-direction: row;
    align-items: stretch;
    gap: 1rem;
  }
`

const Input = styled.input`
  background: none;
  border: none;
  outline: none;
  font-size: 1rem;
  border-block-end: solid 0.18rem var(--on-surface-dimmed-900);
  color: inherit;
  padding: 0.5rem 0.75rem;
  flex: 1;
  transition: border-block-end-color ease 150ms;

  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    border-block-end-color: var(--accent);
  }
`

const Button = styled.button`
  background-color: var(--primary);
  color: var(--on-primary);
  font-size: 1rem;
  margin-block: 0.2rem;
  padding: 0.5rem 2rem;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition-property: background-color, color;
  transition-timing-function: ease;
  transition-duration: 300ms;

  &:hover {
    background-color: var(--primary-variant);
    color: var(--on-primary-variant);
  }
`

const Results = styled.div`
  width: 60%;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-block-start: 2rem;
  margin-inline: auto;
`

const Result = styled.span`
  background-color: var(--accent);
  color: var(--on-accent);
  border-radius: 0.25rem;
  padding: 0.4rem 0.75rem;
  cursor: pointer;
  transition-property: transform, background-color, color;
  transition-timing-function: ease;
  transition-duration: 200ms;

  &:hover {
    transform: translateY(-0.2rem);
    background-color: var(--accent-variant);
    color: var(--on-accent-variant);
  }
`

const NoResult = styled.p`
  color: var(--on-surface-dimmed-400);
`

const Guidelines = styled.section`
  display: flex;
  flex-direction: column;
  margin-inline: 1rem;
  gap: 1rem;

  &::before {
    content: '';
    background-color: var(--on-surface-dimmed-900);
    height: 2px;
    margin-block-start: 1.5rem;
  }

  article {
    margin-inline: 1rem;
  }

  h3::after {
    content: ':';
  }

  h3 {
    display: inline;
  }

  p {
    display: inline;
    margin-inline-start: 0.5rem;
  }
`

// TODO: store already found results in localStorage
const findDivisors = (operand: number) => {
  const divisors = [1]
  for (let i = 2; i <= Math.floor(operand / 2); i++) {
    if (operand % i !== 0) continue
    divisors.push(i)
  }

  if (divisors.length > 1) {
    divisors.push(operand)
  }

  return divisors
}

const App = () => {
  const [operandStr, setOperandStr] = useState('')
  const [divisors, setDivisors] = useState([] as number[])

  const operand = useMemo(
    () => (operandStr === '' ? 0 : parseFloat(operandStr)),
    [operandStr]
  )

  const operandRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    operandRef.current?.focus()
  }, [])

  useEffect(() => {
    if (operandStr === '') {
      operandRef.current?.setCustomValidity('')
      return
    }
    if (operand > 0) {
      operandRef.current?.setCustomValidity('')
      return
    }

    operandRef.current?.setCustomValidity('Please provide a positive number.')
  }, [operandStr])

  return (
    <Container>
      <Surface>
        <Heading>Methematics</Heading>

        <Form
          onSubmit={(e) => {
            e.preventDefault()
            setDivisors(findDivisors(operand))
          }}
        >
          <Input
            type='number'
            required
            min={0}
            ref={operandRef}
            value={operandStr}
            onChange={(e) => setOperandStr(e.target.value)}
            placeholder='Give me a number'
          />

          <Button type='submit'>Go</Button>
        </Form>

        <Results>
          {divisors.length > 0 ? (
            divisors.map((divisor) => (
              <Result
                key={uuid()}
                onClick={() => {
                  setOperandStr(divisor.toString())
                  setDivisors(findDivisors(divisor))
                }}
              >
                {divisor}
              </Result>
            ))
          ) : (
            <NoResult>Nothing to show...</NoResult>
          )}
        </Results>

        <Guidelines>
          {divisors
            .filter((divisor) =>
              Object.keys(guidelines).includes(divisor.toString())
            )
            .map((divisor) => (
              <article key={uuid()}>
                <h3>{divisor}</h3>
                <p>
                  {guidelines[divisor.toString() as keyof typeof guidelines]}
                </p>
              </article>
            ))}
        </Guidelines>
      </Surface>
    </Container>
  )
}

export default App
