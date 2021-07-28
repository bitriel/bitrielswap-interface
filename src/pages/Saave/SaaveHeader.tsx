import React from 'react'
import styled from 'styled-components'
import { RowBetween } from '../../components/Row'
import { Type } from '../../theme'

const StyledSwapHeader = styled.div`
    padding: 12px 1rem 0px 1.5rem;
    margin-bottom: -4px;
    width: 100%;
    max-width: 420px;
    color: ${({ theme }) => theme.text2};
`

export default function SwapHeader() {
    return (
        <StyledSwapHeader>
            <RowBetween>
                <Type.Black fontWeight={500}>SUSHI → xSUSHI → aXSUSHI</Type.Black>
            </RowBetween>
        </StyledSwapHeader>
    )
}
