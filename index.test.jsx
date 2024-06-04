import React from 'react';
import { render } from '@testing-library/react'
import styled from 'styled-components'

const BaseInput = styled.input`
    border: none;

    &:checked {
        border: 1px solid cyan;
    }
`

function CheckboxInput(props) {
    return (
        <BaseInput
            id={props.id}
            type="checkbox"
            checked={props.checked}
            data-testid={'checkbox-input'}
            onChange={props.onChange}
            className={props.className}
        />
    )
}

const DefaultIcon = styled.span`
  font-size: 16px;
`

const CheckIcon = styled(DefaultIcon)`
    opacity: 0;
    color: gray;
`

const StyledCheckboxInput = styled(CheckboxInput)`
    border: 1px solid gray;
    
    &:checked {
        border: 1px solid blue;
    }
    
    &:checked ~ ${CheckIcon} {
        opacity: 1;
        color: blue;
    }
`

function CheckBox(props) {
    return (
        <div>
            <StyledCheckboxInput
                id={props.id}
                checked={props.checked}
                onChange={props.onChange}
            />
            <label htmlFor={props.id}>{props.label}</label>
            <CheckIcon data-testid={'checked-icon'}>‡</CheckIcon>
        </div>
    )
}

describe('Siblings cases', () => {
    it('should render icon with style un-checked', () => {
        const { container, getByTestId } = render(
                <CheckBox
                    checked={false}
                    id={'fooBox'}
                    label={'Foo Box'}
                    onChange={jest.fn()}
                />
        )

        const checkedInput = getByTestId('checkbox-input')
        const checkedIcon = getByTestId('checked-icon')

        expect(checkedInput).not.toHaveAttribute('checked')
        expect(checkedInput).toHaveStyleRule('border',`1px solid gray`)
        expect(checkedIcon).toHaveStyleRule('opacity',`0`)
        expect(checkedIcon).toHaveStyleRule('color',`gray`)
    })

    it('should render icon with style checked', () => {
        const { container, getByTestId } = render(
            <CheckBox
                checked={true}
                id={'fooBox'}
                label={'Foo Box'}
                onChange={jest.fn()}
            />
        )

        expect(container).toMatchSnapshot()

        const checkedInput = getByTestId('checkbox-input')
        const checkedIcon = getByTestId('checked-icon')

        expect(checkedInput).toHaveAttribute('checked')
        expect(checkedInput).toHaveStyleRule('border',`1px solid blue`, { modifier: ':checked' })

        // These tests fail. Modifier (checked) does not work
        expect(checkedIcon).toHaveStyleRule('opacity',`1`)
        expect(checkedIcon).toHaveStyleRule('color',`blue`)
    })
});