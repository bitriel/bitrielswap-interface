import { Currency, Percent, Price } from '@bitrielswap/sdk'
import React, { useContext } from 'react'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components'
import { AutoColumn } from '../../components/Column'
import { AutoRow } from '../../components/Row'
import { ONE_BIPS } from '../../constants'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { Field } from '../../state/mint/actions'
import { Type } from '../../theme'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

export function PoolPriceBar({
    currencies,
    noLiquidity,
    poolTokenPercentage,
    price
}: {
    currencies: { [field in Field]?: Currency }
    noLiquidity?: boolean
    poolTokenPercentage?: Percent
    price?: Price
}) {
    const { i18n } = useLingui()
    const { chainId } = useActiveWeb3React()
    const theme = useContext(ThemeContext)
    return (
        <AutoColumn gap="md">
            <AutoRow justify="space-around" gap="4px">
                <AutoColumn justify="center">
                    <Type.Black>{price?.toSignificant(6) ?? '-'}</Type.Black>
                    <Text fontWeight={500} fontSize={14} color={theme.text2} pt={1}>
                        {t`${currencies[Field.CURRENCY_B]?.getSymbol(chainId)} per ${currencies[
                            Field.CURRENCY_A
                        ]?.getSymbol(chainId)}`}
                    </Text>
                </AutoColumn>
                <AutoColumn justify="center">
                    <Type.Black>{price?.invert()?.toSignificant(6) ?? '-'}</Type.Black>
                    <Text fontWeight={500} fontSize={14} color={theme.text2} pt={1}>
                        {t`${currencies[Field.CURRENCY_A]?.getSymbol(chainId)} per ${currencies[
                            Field.CURRENCY_B
                        ]?.getSymbol(chainId)}`}
                    </Text>
                </AutoColumn>
                <AutoColumn justify="center">
                    <Type.Black>
                        {noLiquidity && price
                            ? '100'
                            : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ??
                              '0'}
                        %
                    </Type.Black>
                    <Text fontWeight={500} fontSize={14} color={theme.text2} pt={1}>
                        {i18n._(t`Share of Pool`)}
                    </Text>
                </AutoColumn>
            </AutoRow>
        </AutoColumn>
    )
}
