import { Currency, CurrencyAmount, Fraction, Percent } from '@bitrielswap/sdk'
import React from 'react'
import { Text } from 'rebass'
import { ButtonPrimary } from '../../components/ButtonLegacy'
import CurrencyLogo from '../../components/CurrencyLogo'
import { RowBetween, RowFixed } from '../../components/Row'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { Field } from '../../state/mint/actions'
import { Type } from '../../theme'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

export function ConfirmAddModalBottom({
    noLiquidity,
    price,
    currencies,
    parsedAmounts,
    poolTokenPercentage,
    onAdd
}: {
    noLiquidity?: boolean
    price?: Fraction
    currencies: { [field in Field]?: Currency }
    parsedAmounts: { [field in Field]?: CurrencyAmount }
    poolTokenPercentage?: Percent
    onAdd: () => void
}) {
    const { i18n } = useLingui()
    const { chainId } = useActiveWeb3React()
    return (
        <>
            <RowBetween>
                <Type.Body>{i18n._(t`${currencies[Field.CURRENCY_A]?.getSymbol(chainId)} Deposited`)}</Type.Body>
                <RowFixed>
                    <CurrencyLogo currency={currencies[Field.CURRENCY_A]} style={{ marginRight: '8px' }} />
                    <Type.Body>{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</Type.Body>
                </RowFixed>
            </RowBetween>
            <RowBetween>
                <Type.Body>{i18n._(t`${currencies[Field.CURRENCY_B]?.getSymbol(chainId)} Deposited`)}</Type.Body>
                <RowFixed>
                    <CurrencyLogo currency={currencies[Field.CURRENCY_B]} style={{ marginRight: '8px' }} />
                    <Type.Body>{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</Type.Body>
                </RowFixed>
            </RowBetween>
            <RowBetween>
                <Type.Body>{i18n._(t`Rates`)}</Type.Body>
                <Type.Body>
                    {`1 ${currencies[Field.CURRENCY_A]?.getSymbol(chainId)} = ${price?.toSignificant(4)} ${currencies[
                        Field.CURRENCY_B
                    ]?.getSymbol(chainId)}`}
                </Type.Body>
            </RowBetween>
            <RowBetween style={{ justifyContent: 'flex-end' }}>
                <Type.Body>
                    {`1 ${currencies[Field.CURRENCY_B]?.getSymbol(chainId)} = ${price
                        ?.invert()
                        .toSignificant(4)} ${currencies[Field.CURRENCY_A]?.getSymbol(chainId)}`}
                </Type.Body>
            </RowBetween>
            <RowBetween>
                <Type.Body>{i18n._(t`Share of Pool:`)}</Type.Body>
                <Type.Body>{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</Type.Body>
            </RowBetween>
            <ButtonPrimary style={{ margin: '20px 0 0 0' }} onClick={onAdd}>
                <Text fontWeight={500} fontSize={20}>
                    {noLiquidity ? i18n._(t`Create Pool & Supply`) : i18n._(t`Confirm Supply`)}
                </Text>
            </ButtonPrimary>
        </>
    )
}
