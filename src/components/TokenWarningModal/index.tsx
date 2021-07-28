import { Token } from '@bitrielswap/sdk'
import { ImportToken } from 'components/SearchModal/ImportToken'
import React, { useCallback } from 'react'
import Modal from '../Modal'

export default function TokenWarningModal({
    isOpen,
    tokens,
    onConfirm
}: {
    isOpen: boolean
    tokens: Token[]
    onConfirm: () => void
}): JSX.Element {
    const handleDismiss = useCallback(() => null, [])

    return (
        <Modal isOpen={isOpen} onDismiss={handleDismiss} maxHeight={90}>
            <ImportToken tokens={tokens} handleCurrencySelect={onConfirm} />
        </Modal>
    )
}
